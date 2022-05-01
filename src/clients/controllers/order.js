import cartModel from "../../models/cart.js";
import orderModel from "../../models/order.js";
import userModel from "../../models/user.js";


export const placeOrder = async (req, res) => {
    const { amount, addressId } = req.body;

    try {
        if (!addressId) {
            return res.status(400).json({ msg: 'address is required' });
        }
        const { addresses } = await userModel.findById(req.id);
        const address = addresses.filter(val => val._id == addressId);
        const { cartItems } = await cartModel.findOne({ user: req.id });
        const orderId = Math.floor(Math.random() * Date.now());

        await orderModel.create({
            orderId, userId: req.id, orderAmount: amount, deliveryAddress: address, productDetails: cartItems
        });

        await cartModel.findOneAndUpdate({ user: req.id }, {
            $pullAll: {
                cartItems
            }
        });
        const order = await orderModel.findOne({ userId: req.id });
        res.status(201).json({ orderDetails: order, msg: 'order placed successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'internal server error' });
    }
}