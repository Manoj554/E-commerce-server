import cartModel from "../../models/cart.js";
import productModel from "../../models/product.js";
import userModel from "../../models/user.js";
import { createProductList } from "./product.js";

export const getCart = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ user: req.id });
        if (!cart) {
            return res.status(404).json({ msg: 'Cart Empty !!!😕' });
        }
        res.status(200).json({ cart, msg: 'cart found' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Something went Wrong' });
    }
}


export const wishListAction = async (req, res) => {
    const productId = req.params.id;
    try {
        const findUser = await cartModel.findOne({ user: req.id });
        if (findUser) {
            let items = findUser.wishListItems;
            items = items.filter(val => val.productId == productId);
            if (items.length == 0) {
                await cartModel.findByIdAndUpdate(findUser._id, {
                    $push: {
                        wishListItems: {
                            productId
                        }
                    }
                });
            } else {
                await cartModel.findByIdAndUpdate(findUser._id, {
                    $pull: {
                        wishListItems: {
                            productId
                        }
                    }
                });
            }
        } else {
            await cartModel.create({
                user: req.id,
                wishListItems: [{
                    productId
                }]
            });
        }
        let cart = await cartModel.findOne({ user: req.id });
        res.status(201).json({ cart, msg: 'added to wishlist' });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Something went Wrong' });
    }
}

export const cartAction = async (req, res) => {
    const productId = req.params.id;

    try {
        const findUser = await cartModel.findOne({ user: req.id });

        if (findUser) {
            let findItem = findUser.cartItems.filter(val => val.productId == productId);
            if (findItem.length == 0) {
                await cartModel.findByIdAndUpdate(findUser._id, {
                    $push: {
                        cartItems: {
                            productId,
                            quantity: 1,
                        }
                    }
                });
            } else {
                return res.status(400).json({ msg: 'product already in cart' });
            }
        } else {
            await cartModel.create({
                user: req.id,
                cartItems: [{
                    productId
                }]
            });
        }
        let cart = await cartModel.findOne({ user: req.id });
        res.status(201).json({ cart, msg: 'added to cart' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Something went Wrong' });
    }
}

export const getProductsFromWishList = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ user: req.id });
        let ids = [];
        if (cart) {
            ids = cart.wishListItems.map(val => val.productId);
        }
        let products = await productModel.find().where('_id').in(ids);
        products = createProductList(products);
        res.status(200).json({ products, msg: 'products found' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Something went Wrong' });
    }
}

export const getProductsFromCart = async (req, res) => {
    try {
        const cart = await cartModel.findOne({ user: req.id });
        let ids = [];
        if (cart) {
            ids = cart.cartItems.map(val => val.productId);
        }
        let products = await productModel.find().where('_id').in(ids);
        products = createProductList(products);
        res.status(200).json({ products, msg: 'products found' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Something went Wrong' });
    }
}

export const modifyCartQuantity = async (req, res) => {
    const { id, val } = req.body;

    try {
        const findCart = await cartModel.findOne({ user: req.id });
        if (!findCart) {
            return res.status(404).json({ msg: 'cart not found' });
        } else {
            let item = findCart.cartItems.filter(val => val.productId == id);
            let quantity = item[0].quantity;

            await cartModel.findOneAndUpdate({ _id: findCart._id, "cartItems.productId": id }, {
                "$set": {
                    "cartItems.$": {
                        quantity: quantity + val,
                        productId: id
                    }
                }
            });
        }
        const cart = await cartModel.findOne({ user: req.id });
        res.status(200).json({ cart, msg: 'cart is here' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Something went Wrong' });
    }
}

export const removeItemFromCart = async (req, res) => {
    const productId = req.params.id;

    try {
        await cartModel.findOneAndUpdate({ user: req.id }, {
            $pull: {
                cartItems: {
                    productId
                }
            }
        });
        let cart = await cartModel.findOne({ user: req.id });
        res.status(200).json({ cart, msg: 'item successfully removed' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Something went Wrong' });
    }
}