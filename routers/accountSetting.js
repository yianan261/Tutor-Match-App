import express from "express";
import { delProfile } from "../controllers/accountSetting.js";

const router = express.Router();

// Amanda
// delete account from db and delete profile pic from cloudinary
router.post("/api/profile/deleteAccount", delProfile);

export default router;
