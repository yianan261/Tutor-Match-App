import express from "express";
import { delProfile } from "../controllers/accountSetting.js";

const router = express.Router();

// Amanda
// delete account from db and delete profile pic from cloudinary

// Consider router.delete("/api/profile/:id", delProfile);
router.post("/api/profile/deleteAccount/:id", delProfile);

export default router;
