import express from "express";
import userAuthentication from "../../middleware/userAuthentication.js";
import { isValidate, validateSignin, validateSignup } from "../../middleware/validation.js";
import { addNewAddress, getAllAddress, getUserInfo, signin, signout, signup } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", validateSignup, isValidate, signup);
router.post("/signin", validateSignin, isValidate, signin);
router.get('/signout', signout);
router.get('/get-user-info', userAuthentication, getUserInfo);
router.get('/get-all-address', userAuthentication, getAllAddress);
router.post('/add-new-address', userAuthentication, addNewAddress);

export default router;