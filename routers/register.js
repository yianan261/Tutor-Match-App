import express from "express";
import myDB from "../db/myDB.js";
// import myDB from "../db/myDB";
const router = express.Router();

// Amanda Au-Yeung

// router.post("/register", async (req, res) => {
//   res.status(200);
// });

router.get("/register", (req, res) => {
  console.log("Register page")
  res.status(200)
});

router.post("/register", async (req, res) => {
  console.log("register", req.body);
  let checkExistUser;
  try {
    console.log("CREATING USER");
    checkExistUser = await myDB.getUsers(req.body.email);
    console.log(checkExistUser);
    if (checkExistUser === null ) {
      await myDB.createUser(req.body);
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
    // alert(`${err} exist`);
    console.log(err);
    res.status(400).send({ err: err });
  }
});

// router.post("/register", async (req, res, next) => {
//   console.log(req.body);
//   try {
//     let salt = crypto.randomBytes(16);
//     crypto.pbkdf2(
//       req.body.password,
//       salt,
//       310000,
//       32,
//       "sha256",
//       async (err, hashed_pw) => {
//         if (err) {
//           return next(err);
//         }
//         await myDB.createUser((req.body.email, hashed_pw, salt), (err) => {
//           if (err) {
//             return next(err);
//           }
//           let user = {
//             id: this.lastID,
//             username: req.body.email,
//           };
//           req.login(user, function (err) {
//             if (err) {
//               return next(err);
//             }
//             res.redirect("/");
//           });
//         });
//       }
//     );
//   } catch (err) {
//     alert(`There is an error ${err}`);
//     res.status(400).send({ err: err });
//   }
// });

export default router;
