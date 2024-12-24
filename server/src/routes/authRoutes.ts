import express from "express";
import { register, login, verifyLogin } from "../controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify", verifyLogin);
export { router as authRoutes };
