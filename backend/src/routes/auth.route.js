import express from "express";
import {
  checkUser,
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

router.get("/check-user", protectRoute, checkUser);

export default router;
