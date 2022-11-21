import express from "express";
import myDB from "../db/myDB.js";

const router = express.Router();

// Amanda Au-Yeung
/**
 * updates profile
 */
router.post("/profile/editProfile", async (req, res) => {
  console.log("profile edit profile body", req.body);
  let userIdInSession = req.session.passport.user;
  console.log("userIdInSession", req.session.passport);
  let profileInfo = req.body;
  try {
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
 * gets the profile info
 */
router.get("/profile/editProfile", async (req, res) => {
  console.log("router get user details", req.body);
  let userIdInSession = req.session.passport.user;
  console.log("userIdInSession in router.get", userIdInSession);
  try {
    if (userIdInSession) {
      const profileInfo = await myDB.getUsersById(userIdInSession);
      res.status(200).json({profile: profileInfo.profile, schedule: profileInfo.profile.schedule, pic: profileInfo.profile.pic});
    }
  } catch (err) {
    res.status(400).send({ err: `There is an ${err}` });
  }
})
router.get("/profile/editProfile", (req, res) => {
  console.log("edit profile page", req.body);
  res.status(200).redirect("/profile/editProfile");
});

export default router;
