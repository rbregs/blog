import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import UserInformation from './Model/user.js';

dotenv.config();

const app = express();
const port = 3000;
const secret = 'qwerasdafdffddsads45f';

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

// Registration
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = new UserInformation({ username, password: hashedPassword });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await UserInformation.findOne({ username });

        if (existingUser && bcrypt.compareSync(password, existingUser.password)) {
            jwt.sign({ username, id: existingUser._id }, secret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json({
                    id:existingUser._id,
                    username,
                });
            });
        } else {
            res.status(400).json({ message: "Invalid credentials" });
        }

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
});

// Profile
app.get('/profile', (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(200).json({ message: 'Not logged in' });
    }

    jwt.verify(token, secret, (err, info) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        
        res.json(info);
    });
});

// Logout
app.post('/logout', (req, res) => {
    res.cookie('token', '', { maxAge: -1 }).json('ok');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB successfully');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB', error);
    });
