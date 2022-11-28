import express from "express";

const router = express.Router();

router.get("/api/profile", (req, res) => {
  res.status(200).redirect("/api/profile");
});

export default router;
