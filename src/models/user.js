import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        unique: true,
    },
    hash_passwword: {
        type: String
    },
    profilePicture: String
}, { timestamps: true });

const userModel = mongoose.model('user', userSchema);
export default userModel;