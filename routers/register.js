import express from "express";
import myDB from "../db/myDB.js";
const router = express.Router();
import {genPassword} from "./passwordUtilites.js";

// Amanda Au-Yeung
router.get("/register", (req, res) => {
  console.log("Register page");
  res.status(200).redirect("/register");
});

router.post("/register", async (req, res) => {
  console.log("register", req.body);
  let checkExistUser;
  try {
    checkExistUser = await myDB.getUsers(req.body.email);
    console.log(checkExistUser);
    if (checkExistUser === null) {
      console.log("CREATING USER");
      const {salt, hash} = genPassword(req.body.password);
      await myDB.createUser(req.body.email, salt, hash);
      res
        .status(201)
        .json({ message: "Successfuly register! Head over to sign in!" });
    } else {
      res.json({
        message: "User email already exist, you may sign in!",
        err: "Email",
      });
    }
    
  } catch (err) {
    res.status(400).send({ err: err });
  }
});

export default router;
