import express from "express";
import {
  login,
  logout,
  register,
  updateImg,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protect.middleware.js";

const router = express.Router();

router
  .post("/register", register)
  .post("/login", login)
  .post("/logout", logout);

router.put("/update-image", protectRoute, updateImg);

export default router;
