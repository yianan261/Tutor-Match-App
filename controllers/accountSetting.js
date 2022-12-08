import myDB from "../db/myDB.js";
import cloudinary from "./utils/cloudinary.js";

/**
 * Amanda Au-Yeung
 * function to delete account from DB
 * and delete profile pic from cloudinary
 * @param {obj} req
 * @param {obj} res
 */
export const delProfile = async (req, res) => {
  let id = req.params.id;
  let user;
  let public_id; // in cloudinary
  try {
    if (id) {
      user = await myDB.getUsersById(id);
      if (user.pic) {
        public_id = user.pic.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(public_id);
      }
      await myDB.deleteUser(id);
      res.status(200).json({ message: "Sorry to see you leave:(" });
    }
  } catch (err) {
    res
      .status(400)
      .send({ err: `There is an ${err} when you delete your account.` });
  }
};
