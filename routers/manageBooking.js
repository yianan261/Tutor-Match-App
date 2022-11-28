import express from "express";
const router = express.Router();
import { deleteClass } from "../controllers/manageBooking.js";

router.post("/deleteClass", deleteClass);

export default router;
