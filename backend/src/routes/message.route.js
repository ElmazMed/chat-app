import express from "express";
import { protectRoute } from "../middleware/protect.middleware.js";
import {
  getMessages,
  sendMessages,
  showUsers,
} from "../controllers/message.controller.js";

const router = express.Router();

router
  .get("/users", protectRoute, showUsers)
  .get("/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessages);

export default router;
