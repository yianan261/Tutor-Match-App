import express from "express";
import passport from "passport";
import myDB from "../db/myDB.js";
// import myDB from "../db/myDB";
const router = express.Router();

// Amanda Au-Yeung
router.get("/register", (req, res) => {
  console.log("Register page");
  res.status(200);
});

router.post("/register", async (req, res) => {
  console.log("register", req.body);
  let checkExistUser;
  try {
    console.log("CREATING USER");
    checkExistUser = await myDB.getUsers(req.body.email);
    console.log(checkExistUser);
    if (checkExistUser === null) {
      await myDB.createUser(req.body.email, req.body.password);
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

// router.post("/register", async (req, res, next) => {
//   console.log(req.body);
//   let checkExistUser;
//   try {
//     console.log("CREATING USER");
//     checkExistUser = await myDB.getUsers(req.body.email, req.body.password);
//     console.log(checkExistUser);
//     if (checkExistUser === null) {
//       let salt = crypto.randomBytes(16);
//       console.log("salt", salt);
//       crypto.pbkdf2(
//         req.body.password,
//         salt,
//         310000,
//         32,
//         "sha256",
//         async (err, hashed_pw) => {
//           if (err) {
//             return next(err);
//           }
//           const createdUser = await myDB.createUser((req.body.email, hashed_pw, salt));
//           // function(err) {
//           //   if (err) {
//           //     return next(err);
//           //   }
//           let user = {
//             id: createdUser._id,
//             username: createdUser.email,
//           };
//           // if (err) {
//           //   res.redirect("/register");
//           // } else {
//           //   passport.authenticate("local")(req, res, () => {
//           //     res.redirect("/login")
//           //   })
//           // }
//             req.login(user, function (err) {
//               if (err) {
//                 return next(err);
//               }
//               res.redirect("/");
//             });
//           // }
//         });
//       }
//       else {
//       res.json({
//         message: "User email already exist, you may sign in!",
//         err: "Email",
//       });
//     }
//   } catch (err) {
//     // alert(`There is an error ${err}`);
//     res.status(400).send({ err: err });
//   }
// });

export default router;
