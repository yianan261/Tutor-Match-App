import express from "express";
import passport from "passport";
// import LocalStrategy from "passport-local";
// import myDB from "../db/myDB";
const router = express.Router();

// Amanda Au-Yeung

// router.get("/login", (req, res) => {
//   res.render("login");
// });

router.post(
  "/login/password",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.get("/getUser", (req, res) => {
  console.log("get user in routes", req.body);
  res.send({username: req.user ? req.user.email: null})
})

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});


export default router;
