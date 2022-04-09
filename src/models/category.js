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
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'seller-user',
        required: true
    },
}, { timestamps: true });

const categoryModel = mongoose.model('category', categorySchema);

export default categoryModel;