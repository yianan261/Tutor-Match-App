import express from "express";
import {
  updateProfile,
  uploadPic,
  delPic,
  retrieveProfileInfo,
  redirectEditProfile,
} from "../controllers/editProfile.js";
import upload from "../controllers/utils/multer.js";

const router = express.Router();

// Amanda Au-Yeung
/**
 * updates profile
 */
router.post("/api/profile/editProfile", updateProfile);

/**
 * profile pics posting to DB
 */
router.post("/api/upload", upload.single("img"), uploadPic);

/**
 * del profile pic in cloudinary
 */
router.post("/api/delPic", delPic);

/**
 * gets the profile info
 */
router.get("/api/profile/editProfile", retrieveProfileInfo);

/**
 * redirect to editprofile
 */
router.get("/api/profile/editProfile", redirectEditProfile);

export default router;
