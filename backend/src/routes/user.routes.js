import { Router } from "express";
import { registerUser ,loginUser,logOut, verifyOTP, regenerateOTP } from "../controllers/user.controller.js";


const router = Router();

router
    .route('/login') 
    .post(loginUser);
router
    .route('/verify-otp')
    .post(verifyOTP);
router
    .route('/regenerate-otp')
    .post(regenerateOTP);
router
    .route('/register')
    .post(registerUser);
router
     .route('/logout')
     .post(logOut);

export default router;

