import express from "express";
import { authenticateUser } from "../../middleware/authenticate.js";
import { isValidate, validateAddCategory } from "../../middleware/validation.js";
import { addNewCategory, categoryInfo, deleteCategory, editCategory, getAllCategory } from "../controllers/category.js";


const router = express.Router();

router.post('/add-new-category', authenticateUser, validateAddCategory, isValidate, addNewCategory);
router.get('/get-all-category', authenticateUser, getAllCategory);
router.get('/get-category-info/:id', categoryInfo);
router.patch('/edit-category', authenticateUser, editCategory);
router.delete('/delete-category/:id', authenticateUser, deleteCategory);


export default router;