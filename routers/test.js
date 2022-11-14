import express from "express";
const router = express.Router();

router.get("/book", (req, res) => {
  res.json({ userList: ["user 1", "user 2"] });
});

export default router;
