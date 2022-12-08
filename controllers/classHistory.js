import myDB from "../db/myDB.js";

/**Yian Chen
 * function that adds review to database for tutors
 * @param {obj} req
 * @param {obj} res
 */
export const addReview = async (req, res) => {
  try {
    //newReview is an object containing tutor, lastname, and review
    const newReview = req.body;
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
};
