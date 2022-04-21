import express from "express";
// import userAuthentication from "../../middleware/userAuthentication.js";
import { isValidate, validateSignin, validateSignup } from "../../middleware/validation.js";
import { getUserInfo, signin, signout, signup } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", validateSignup, isValidate, signup);
router.post("/signin", validateSignin, isValidate, signin);
router.get('/signout', signout);
// router.get('/get-user-info', authenticateUser, getUserInfo);

export default router;