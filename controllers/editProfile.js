import myDB from "../db/myDB.js";
import cloudinary from "./utils/cloudinary.js";
import fs from "fs";

/**
 * Amanda Au-Yeung
 * function to update Profile
 * @param {obj} req
 * @param {obj} res
 */
export const updateProfile = async (req, res) => {
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
};

// upload pic to DB
export const uploadPic = async (req, res) => {
  try {
    if (req.file) {
      const cloudRes = await cloudinary.uploader.upload(req.file.path);
      await myDB.updatesPic(req.session.passport.user, cloudRes.url);
      fs.unlinkSync(req.file.path);
      res.status(200).json({ status: "OK" });
    }
  } catch (err) {
    res.status(400).send({ err: `There is an ${err}` });
    fs.unlinkSync(req.file.path);
  }
};

// delPic
export const delPic = async (req, res) => {
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
    res
      .status(400)
      .send({ err: `There is an ${err} removing your profile pic.` });
  }
};

// retrieves profile info
export const retrieveProfileInfo = async (req, res) => {
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
};

/**
 * redirectEditProfile
 */
export const redirectEditProfile = async (req, res) => {
  res.status(200).redirect("/api/profile/editProfile");
};
