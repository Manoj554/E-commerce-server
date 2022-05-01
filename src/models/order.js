import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'delivered'],
        default: 'pending'
    },
    orderAmount: {
        type: Number,
        required: true,
    },
    deliveryAddress: {
        type: Object,
        required: true,
    },
    productDetails: {
        type: Array,
        required: true
    },
}, { timestamps: true });

const orderModel = mongoose.model('order', orderSchema);

export default orderModel;