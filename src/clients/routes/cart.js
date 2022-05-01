import express from "express";
import userAuthentication from "../../middleware/userAuthentication.js";
import { cartAction, getCart, getProductsFromCart, getProductsFromWishList, modifyCartQuantity, removeItemFromCart, wishListAction } from '../controllers/cart.js';
const router = express.Router();

router.get('/get-cart', userAuthentication, getCart);
router.post('/wishlist-action/:id', userAuthentication, wishListAction);
router.post('/cart-action/:id', userAuthentication, cartAction);
router.post('/get-products-from-wishlist', userAuthentication, getProductsFromWishList);
router.get('/get-products-from-cart', userAuthentication, getProductsFromCart);
router.patch('/modify-quantity-in-cart', userAuthentication, modifyCartQuantity);
router.delete('/remove-item-from-cart/:id', userAuthentication, removeItemFromCart);

export default router;