import express from "express";
const router = express.Router();
// import myDB from "../db/myDB";

// Amanda Au-Yeung

router.post("/register", (req, res) => {
  res.status(200);
});

router.get("/register", (req, res) => {
  res.render("register");
});

// router.post("/register", async (req, res, next) => {
//   let salt = crypto.randomBytes(16);
//   crypto.pbkdf2(
//     req.body.password,
//     salt,
//     310000,
//     32,
//     "sha256",
//     async function (err, hashedPassword) {
//       if (err) {
//         return next(err);
//       }
//       myDB.run(
//         "INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)",
//         [req.body.username, hashedPassword, salt],
//         function (err) {
//           if (err) {
//             return next(err);
//           }
//           var user = {
//             id: this.lastID,
//             username: req.body.username,
//           };
//           req.login(user, function (err) {
//             if (err) {
//               return next(err);
//             }
//             res.redirect("/");
//           });
//         }
//       );
//     }
//   );
// });

export default router;
