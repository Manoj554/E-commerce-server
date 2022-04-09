import express from "express";
import { authenticateUser } from "../../middleware/authenticate.js";
import { isValidate, validateAddProduct } from "../../middleware/validation.js";
import { addNewProduct, deleteProduct, editProduct, getAllProducts, getProductInfo, searchProduct, searchProductByCategory } from "../controllers/product.js";


const router = express.Router();

router.post('/add-new-product', authenticateUser, validateAddProduct, isValidate, addNewProduct);
router.get('/get-all-product', getAllProducts);
router.get('/get-product-info/:id', getProductInfo);
router.patch('/edit-product', authenticateUser, editProduct);
router.delete('/delete-product/:id', authenticateUser, deleteProduct);
router.get('/query-search', authenticateUser, searchProduct);
router.get('/get-product-bycategory/:id', authenticateUser, searchProductByCategory);


export default router;