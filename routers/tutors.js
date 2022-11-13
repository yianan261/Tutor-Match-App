import express from "express";
const router = express.Router();
import myDB from "../db/myDB.js";

/** Yian
 * function that lets users search tutors
 */
router.get("/book/tutors", async (req, res) => {
  try {
    const page = req.query.page || 0;
    const keyword = req.body.query;
    const getTutors = await myDB.findTutors(keyword, page);
    res.status(200).json({ data: getTutors });
  } catch (err) {
    console.err(err);
    res.status(404).json({ msg: "There was an error" });
  }
});

export default router;
