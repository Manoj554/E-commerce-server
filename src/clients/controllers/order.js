import cartModel from "../../models/cart.js";
import orderModel from "../../models/order.js";
import productModel from "../../models/product.js";
import userModel from "../../models/user.js";

const makeOrderDetails = async (orders) => {
    let myOrders = [];

    for (let order of orders) {
        let products = order.productDetails;
        let productList = [];
        for (let product of products) {
            let productDetails = await productModel.findById(product.productId);
            let productObj = {
                productName: productDetails.name,
                productImage: productDetails.productImage,
                price: productDetails.priceOffered,
                quantity: product.quantity
            };
            productList.push(productObj);
        }

        let date = order.createdAt.toLocaleString().split(', ')[0];
        let orderObj = {
            orderId: order.orderId,
            orderStatus: order.orderStatus,
            orderDate: date,
            deliverdBy: (2 + Number(date.substr(0, 2))) + date.substr(2),
            products: productList,
            orderAmount: order.orderAmount
        };

        myOrders.unshift(orderObj);
    }

    return myOrders;
}


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

export const getMyOrders = async (req, res) => {
    try {
        const myOrders = await orderModel.find({ userId: req.id });

        if (myOrders.length == 0) {
            return res.status(404).json({ msg: 'no orders found' });
        }
        let orders = await makeOrderDetails(myOrders);
        res.status(200).json({ orders, msg: 'order found' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'internal server error' });
    }
}

export const testDate = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        let fa = orders[0];
        let day = fa.createdAt.getDate() + 2;
        let month = fa.createdAt.getMonth();
        let year = fa.createdAt.getFullYear();
        let date = fa.createdAt.toLocaleString();
        date = (2 + Number(date.substr(0, 2))) + date.substr(2);
        res.json({ dated: `${day}/${month}/${year}`, date })

    } catch (error) {
        console.log(error);
    }
}