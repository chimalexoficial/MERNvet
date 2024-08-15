import express from "express";
import { register, profile, confirm, auth, forgotPassword } from "../controllers/vetController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

// public routes
router.post('/', register);
router.get('/confirm/:token', confirm); //dynamic
router.post('/login', auth);
router.post('/forgot-password', forgotPassword)

// private routes
router.get('/profile', checkAuth, profile);

export default router;