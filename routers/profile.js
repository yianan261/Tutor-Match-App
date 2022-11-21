import express from "express";

const router = express.Router();

router.get("/profile", (req, res) =>{
    res.status(200).redirect("/profile");
})

export default router;