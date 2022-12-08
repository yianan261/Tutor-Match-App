import myDB from "../db/myDB.js";

/**Yian Chen
 * function that deletes class in database
 * @param {obj} req
 * @param {obj} res
 */
export const deleteClass = async (req, res) => {
  try {
    const scheduleObj = req.body;
    await myDB.deleteBooking(scheduleObj);
    res.status(200).json({ msg: "Class removed" });
  } catch (err) {
    console.error(err);
    res.status(404).json({ msg: "There was an error" });
  }
};
