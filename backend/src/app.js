import express from "express";
import authRoutes from "./routes/auth.route.js";

const app = express();
const port = process.env.PORT || 5001;

app.use("/api/auth", authRoutes);

app.listen(port, () => console.log(`Server is litening to port ${port}`));
