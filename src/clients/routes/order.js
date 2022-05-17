import express from "express";
import userAuthentication from "../../middleware/userAuthentication.js";
import { getMyOrders, placeOrder, testDate } from "../controllers/order.js";

const router = express.Router();

router.post('/place-order', userAuthentication, placeOrder);
router.get('/get-my-orders', userAuthentication, getMyOrders);
router.get('/test-date', testDate);

export default router;