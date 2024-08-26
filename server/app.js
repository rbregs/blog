import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import UserInformation from './Model/user.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';  
import Post from './Model/post.js'

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config();

const app = express();
const port = 3000;
const secret = 'qwerasdafdffddsads45f';
const uploadMiddleware = multer({ dest: 'upload/' });

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use('/upload', express.static(join(__dirname, 'upload')));


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
                    id: existingUser._id,
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


// Post
app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const { title, summary, content } = req.body;
    const { file } = req;

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname, path: oldPath, filename } = req.file;
    const parts = originalname.split('.');
    const extension = parts[parts.length - 1];
    const newPath = path.join(file.destination, `${filename}.${extension}`);

    // Log file information
    console.log('Original Path:', oldPath);
    console.log('New Path:', newPath);

    fs.rename(oldPath, newPath, async (err) => {
        if (err) {
            console.error('Failed to rename file:', err);
            return res.status(500).json({ error: 'Failed to rename file' });
        }

        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        jwt.verify(token, secret, async (err, info) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid or expired token' });
            }

            try {
                const postDoc = await Post.create({
                    title,
                    summary,
                    content,
                    cover: newPath,
                    author: info.id,
                });

                res.json(postDoc);
            } catch (error) {
                res.status(500).json({ message: 'Error creating post', error: error.message });
            }
        });
    });
});


app.get('/post', async (req, res) => {
    try {
      const posts = await Post.find()
      .populate('author', ['username'])
      .sort({createdAt:-1})
      .limit(20)
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
  });
  
app.get('/post/:id', async (req,res) =>{
    const{id} = req.params
    const postDocument = await Post.findById(id).populate('author',['username'])
    res.json(postDocument)
})

app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
    const { id, title, summary, content } = req.body;
    let newPath = null;

    if (req.file) {
        const { originalname, path: oldPath, filename, destination } = req.file;
        const extension = path.extname(originalname);
        newPath = path.join(destination, `${filename}${extension}`);

        console.log('Old Path:', oldPath);
        console.log('New Path:', newPath);

        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                console.error('Failed to rename file:', err);
                return res.status(500).json({ error: 'Failed to rename file' });
            }
        });
    }

    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, secret, async (err, info) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        try {
            const postDoc = await Post.findById(id);

            if (!postDoc) {
                console.error("Post not found");
                return res.status(404).json({ message: 'Post not found' });
            }

            const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);

            console.log("Author check:", { isAuthor, postDoc, info });

            if (!isAuthor) {
                return res.status(400).json({ message: 'You are not the author' });
            }

         
            const updateData = {
                title,
                summary,
                content,
                cover: newPath ? newPath : postDoc.cover
            };

           
            const updatedPost = await Post.findByIdAndUpdate(id, updateData, { new: true });

            if (!updatedPost) {
                return res.status(404).json({ message: 'Failed to update post' });
            }

            res.json(updatedPost);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    });
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
