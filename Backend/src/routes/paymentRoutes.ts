import express, { Request, Response } from "express";
import { createPaymentSession } from "../controllers/paymentController";

const router = express.Router();

// ✅ Directly pass function reference (avoids type mismatch)
router.post("/pay", createPaymentSession);

export default router;
