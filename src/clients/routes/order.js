import express from "express";
import userAuthentication from "../../middleware/userAuthentication.js";
import { placeOrder } from "../controllers/order.js";

const router = express.Router();

router.post('/place-order', userAuthentication, placeOrder);

export default router;