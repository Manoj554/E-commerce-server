import express from "express";
import { filterProductsByCategory, filterProductsBySubRootCategory, getAllProduct, getProductsByCategory, getProductsByRootCategory, searchProductsByCategory } from "../controllers/product.js";

const router = express.Router();

router.get('/get-product-by-category/:id', getProductsByCategory);
router.get('/get-product-by-root-category/:id', getProductsByRootCategory);
router.get('/get-all-product', getAllProduct);
router.get('/search-by-category', searchProductsByCategory);
router.post('/filter-product-by-category', filterProductsByCategory);
router.post('/filter-product-by-subroot-category', filterProductsBySubRootCategory);

export default router;