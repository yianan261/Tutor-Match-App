import express from "express";
const router = express.Router();
import myDB from "../db/myDB.js";

/**Yian Chen
 * function that adds comment to tutors DB
 */
router.post("/api/addReview", async (req, res) => {
  try {
    //newReview is an object containing tutor, lastname, and review
    const newReview = req.body;
    console.log("backend printing newReview req.body", newReview);
    await myDB.addReview(
      newReview.tutor,
      newReview.tutor_lastname,
      newReview.review
    );
    res.status(200).json({ msg: "Review Added!" });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ msg: "There was an error, please contact customer support" });
  }
});

export default router;
