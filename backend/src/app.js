import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDb } from "./lib/db.js";
const app = express();
dotenv.config();
const port = process.env.PORT || 5001;

app.use("/api/auth", authRoutes);
app.use(express.json());

const start = async () => {
  try {
    await connectDb(process.env.MONGODB_URI);
    app.listen(port, () => console.log(`Server is litening to port ${port}`));
  } catch (error) {
    console.log(`Server can't start ${error.message}`);
  }
};

start();
