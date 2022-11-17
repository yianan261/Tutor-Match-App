import express from "express";
import myDB from "../db/myDB.js";
const router = express.Router();
import crypto from "crypto";

// Amanda Au-Yeung
// hashing source from https://stackoverflow.com/questions/72128646/passport-authenticate-isnt-redirecting
const genPassword = (password) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
};


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
