import express from "express";
const router = express.Router();
import { redirectReg, register } from "../controllers/register.js";

// Amanda Au-Yeung
router.get("/api/register", redirectReg);

//register
router.post("/api/register", register);

export default router;
