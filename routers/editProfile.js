import express from "express";
import myDB from "../db/myDB.js";
import fs from "fs";
import cloudinary from "./utils/cloudinary.js";
import upload from "./utils/multer.js";

const router = express.Router();

// Amanda Au-Yeung
/**
 * updates profile
 */
router.post("/profile/editProfile", async (req, res) => {
  try {
    let userIdInSession = req.session.passport.user;
    let profileInfo = req.body;
    if (userIdInSession) {
      await myDB.updatesProfile(userIdInSession, profileInfo);
      res
        .status(200)
        .json({ profile: profileInfo, message: "Profile Info Saved!" });
    }
  } catch (err) {
    res.status(400).send({ err: `There is an ${err}` });
  }
});

/**
 * profile pics posting to DB
 */
router.post("/upload", upload.single("img"), async (req, res) => {
  try {
    if (req.file){
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
router.post("/delPic", async (req, res) => {
  let id = req.query.id;
  let user;
  let public_id; // in cloudinary
  try {
    if (id) {
      user = await myDB.getUsersById(id);
      public_id = user.pic.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(public_id);
      res.status(200).json({ message: "Your profile pic is deleted!" });
    }
  } catch (err) {
    res.status(400).send({ err: `There is an ${err} removing your profile pic.` });
  }
});

/**
 * gets the profile info
 */
router.get("/profile/editProfile", async (req, res) => {
  try {
    let userIdInSession = req.session.passport.user;
    if (userIdInSession) {
      const profileInfo = await myDB.getUsersById(userIdInSession);
      res.status(200).json({
        profile: profileInfo.profile,
        preferredSchedule: profileInfo.preferredSchedule,
        pic: profileInfo.pic,
      });
    } else {
      res.status(200).json({ message: "Make sure you are logged in!" });
    }
  } catch (err) {
    res.status(400).send({ err: `There is an ${err}` });
  }
});

router.get("/profile/editProfile", (req, res) => {
  res.status(200).redirect("/profile/editProfile");
});

export default router;
