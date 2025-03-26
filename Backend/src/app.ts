import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import mediaRoutes from "./routes/mediaRoutes";
import projectRoutes from "./routes/projectRoutes";
import teamRoutes from "./routes/teamRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import newsletterRoutes from "./routes/newsletterRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/media", mediaRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/team", teamRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/newsletter", newsletterRoutes);

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Connection Error:", err));

export default app;
