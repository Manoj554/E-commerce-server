import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    priceOffered: {
        type: Number,
        required: true
    },
    percentageOff: Number,
    description: {
        type: String,
        trim: true,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    offer: { type: Array },
    productImage: String,
    reviews: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            review: String,
            rating: Number
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'category',
        required: true
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'seller-user',
        required: true
    }
}, { timestamps: true });

const productModel = mongoose.model('product', productSchema);

export default productModel;