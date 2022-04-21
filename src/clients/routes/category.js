import express from "express";
import { getAllCategory } from "../controllers/category.js";

const router = express.Router();

router.get('/all-category', getAllCategory);

export default router;