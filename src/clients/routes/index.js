import express from "express";
import auth from './auth.js';
import category from './category.js';
import product from "./product.js";

const router = express.Router();

router.use('/auth', auth);
router.use('/category', category);
router.use('/product', product);


export default router;