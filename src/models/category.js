import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    parentId: String,
    categoryImage: String,
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
        required: true
    },
    level: {
        type: Number,
        required: true,
        default: 1
    },
    createdBy: {
        type: String,
        required: true
    },
}, { timestamps: true });

const categoryModel = mongoose.model('category', categorySchema);

export default categoryModel;