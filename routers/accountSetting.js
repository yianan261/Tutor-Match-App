import express from "express";
import myDB from "../db/myDB.js";
import cloudinary from "./utils/cloudinary.js";

const router = express.Router();

// Amanda

// delete account from db
// delete profile pic from cloudinary
router.post("/api/profile/deleteAccount", async (req, res) => {
  let id = req.query.id;
  let user;
  let public_id; // in cloudinary
  try {
    if (id) {
      user = await myDB.getUsersById(id);
      public_id = user.pic.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(public_id);
      await myDB.deleteUser(id);
      res.status(200).json({ message: "Sorry to see you leave:(" });
    }
  } catch (err) {
    res.status(400).send({ err: `There is an ${err} when you delete your account.` });
  }
});

export default router;
