import myDB from "../db/myDB.js";

/** Yian
 * function that queries all related tutors in database
 */
export const searchAllTutors = async (req, res) => {
    try {
      console.log("req.query", req.query);
      const page = req.query.page || 0;
      const keyword = req.query.query;
      const getTutors = await myDB.findTutors(keyword, page);
      res.status(200).json({ data: getTutors });
    } catch (err) {
      console.error(err);
      res.status(404).json({ msg: "There was an error" });
    }
  }

  /** Yian
 * function that gets specific tutor from Tutors Collection in database
 */
  export const getTutor = async (req, res) => {
    try {
      const tutorId = req.params.tutorId;
      const getTutor = await myDB.getTutor(tutorId);
      res.status(200).json({ data: getTutor });
      console.log("GOT TUTOR DATA");
    } catch (err) {
      console.error(err);
      res.status(404).json({ msg: "There was an error" });
    }
  }

  /**Yian
 * function that updates user class schedule in database
 */
  export const updateClass =  async (req, res) => {
    try {
      const user = req.session.passport.user;
      console.log("backend user", user);
      const booking = req.body;
      console.log("booking", req.body);
      await myDB.makeBooking(user, booking);
      res.status(200).json({ msg: "successfully created booking" });
    } catch (err) {
      console.error(err);
      res.status(404).json({ msg: "There was an error" });
    }
  }

/**Yian Chen
 * function that gets user schedule in database
 */
  export const getSchedule = async (req, res) => {
    try {
      const user = req.session.passport.user;
      console.log("LOG USER,", user);
      const getSchedule = await myDB.getUserSchedule(user);
      console.log("getSchedule", getSchedule);
      if (getSchedule) {
        res.status(200).json({ data: getSchedule });
      }
    } catch (err) {
      console.error(err);
      res.status(404).json({ msg: `User not logged in ${err}` });
    }
  }