import express from "express";
import { register, profile, confirm, auth } from "../controllers/vetController.js";

const router = express.Router();

router.post('/', register);
router.get('/profile', profile);
router.get('/confirm/:token', confirm); //dynamic
router.post('/login', auth);
export default router;