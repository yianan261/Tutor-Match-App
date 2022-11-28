import express from "express";
import {
  updateProfile,
  delPic,
  retrieveProfileInfo,
  redirectEditProfile,
} from "../controllers/editProfile.js";
import myDB from "../db/myDB.js";
import fs from "fs";
import cloudinary from "../controllers/utils/cloudinary.js";
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
router.post("/api/upload", upload.single("img"), async (req, res) => {
  try {
    if (req.file) {
      const cloudRes = await cloudinary.uploader.upload(req.file.path);
      await myDB.updatesPic(req.session.passport.user, cloudRes.url);
      fs.unlinkSync(req.file.path);
      res.redirect("/profile/EditProfile");
    }
  } catch (err) {
    res.status(400).send({ err: `There is an ${err}` });
    fs.unlinkSync(req.file.path);
  }
});

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
