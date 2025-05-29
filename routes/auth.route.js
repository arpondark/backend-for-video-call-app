import express from "express";
import {
  register,
  login,
  logout,
  onboarding,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.put("/onboarding", protectRoute, onboarding);

export default router;
