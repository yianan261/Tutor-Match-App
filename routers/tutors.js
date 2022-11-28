import express from "express";
const router = express.Router();
import {
  searchAllTutors,
  getTutor,
  updateClass,
  getSchedule,
} from "../controllers/tutors.js";

/** Yian
 * function that lets users search all related tutors
 */
router.post("/book/tutors", searchAllTutors);

/** Yian
 * function that gets specific tutor
 */
router.get("/book/tutors/:tutorId", getTutor);

/**Yian
 * function that updates user class schedule
 */
router.post("/api/addClass", updateClass);

/**Yian Chen
 * function that gets user schedule for user to make booking
 */
router.get("/api/getSchedule", getSchedule);

export default router;
