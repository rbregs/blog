import mongoose from "mongoose";


const userRegistrationSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const UserInformation = mongoose.model('UserInfo', userRegistrationSchema);

export default UserInformation;
