import express from "express";
import auth from './auth.js';
import category from './category.js';
import product from "./product.js";
import order from "./order.js";

const router = express.Router();

router.use('/auth', auth);
router.use('/category', category);
router.use('/product', product);
router.use('/order', order);


export default router;