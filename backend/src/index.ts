import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db";
import authRoutes from "./routes/authRoutes";
import historyRoutes from "./routes/historyRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//  Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

//  Routes
app.use("/api/auth", authRoutes);
app.use("/api/history", historyRoutes);

//  Health check
app.get("/", (_, res) => {
  res.send("StoryCraft backend is running 🚀");
});

//  Connect DB and start server
connectDB();

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
