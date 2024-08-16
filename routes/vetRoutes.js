import express from "express";
import { register, profile, confirm, auth, forgotPassword, verifyToken, newPassword } from "../controllers/vetController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

// public routes
router.post('/', register);
router.get('/confirm/:token', confirm); //dynamic
router.post('/login', auth);

// public routes - password
router.post('/forgot-password', forgotPassword)
// router.get('/forgot-password/:token', verifyToken)
// router.post('/forgot-password/:token', newPassword)
router.route('/forgot-password/:token').get(verifyToken).post(newPassword);

// private routes
router.get('/profile', checkAuth, profile);

export default router;