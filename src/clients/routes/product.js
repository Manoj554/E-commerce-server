import express from "express";
import { filterProductsByCategory, filterProductsBySubRootCategory, getAllProduct, getProductInfo, getProductsByCategory, getProductsByRootCategory, searchByName, searchSuggestion } from "../controllers/product.js";

const router = express.Router();

router.get('/get-product-by-category/:id', getProductsByCategory);
router.get('/get-product-by-root-category/:id', getProductsByRootCategory);
router.get('/get-all-product', getAllProduct);
router.get('/suggestion', searchSuggestion);
router.get('/search-by-name', searchByName);
router.post('/filter-product-by-category', filterProductsByCategory);
router.post('/filter-product-by-subroot-category', filterProductsBySubRootCategory);
router.get('/get-product-info/:id', getProductInfo);

export default router;