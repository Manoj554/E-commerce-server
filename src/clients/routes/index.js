import express from "express";
import auth from './auth.js';
import category from './category.js';
import product from "./product.js";
import cart from './cart.js';
import order from './order.js';

const router = express.Router();

router.use('/auth', auth);
router.use('/category', category);
router.use('/product', product);
router.use('/cart', cart);
router.use('/order', order);


export default router;