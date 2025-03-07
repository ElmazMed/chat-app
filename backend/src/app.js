import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDb } from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);

const start = async () => {
  try {
    await connectDb(process.env.MONGODB_URI);
    app.listen(port, () => console.log(`Server is litening to port ${port}`));
  } catch (error) {
    console.log(`Server can't start ${error.message}`);
  }
};

start();
