import express from "express";

const router = express.Router();

router.get("/profile", (req, res) =>{
    console.log("check profile");
    res.status(200).redirect("/profile");
})

export default router;