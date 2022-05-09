import express from "express";
import { getAllOrders } from "../controllers/order.js";

const router = express.Router();

router.get('/all-orders', getAllOrders);

export default router;