import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./lib/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    //origin: here the link of the front end
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

const start = async () => {
  try {
    await connectDb(process.env.MONGODB_URI);
    app.listen(port, () => console.log(`Server is litening to port ${port}`));
  } catch (error) {
    console.log(`Server can't start ${error.message}`);
  }
};

start();
