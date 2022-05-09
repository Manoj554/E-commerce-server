import orderModel from "../../models/order.js";
import productModel from "../../models/product.js";

const createdOrder = async (orders) => {
    let myOrders = [];

    for (let each of orders) {
        let productList = [];
        for (let pd of each.productDetails) {
            let product = await productModel.findById(pd.productId);
            let obj = {
                productName: product.name,
                qty: pd.quantity
            }
            productList.push(obj);
        }
        let order = {
            id: each._id,
            orderId: each.orderId,
            userId: each.userId,
            orderStatus: each.orderStatus,
            orderAmount: each.orderAmount,
            deliveryAddress: each.deliveryAddress[0],
            productDetails: productList,
            date: new Date(each.createdAt).toLocaleString(),
        };
        myOrders.unshift(order);
    }
    return myOrders;
}

export const getAllOrders = async (req, res) => {
    try {
        const allOrders = await orderModel.find({});
        const orders = await createdOrder(allOrders);
        res.status(200).json({ orders, msg: 'orderfound' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'internal server error' });
    }
}