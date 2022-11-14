import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import myDB from "../db/myDB";
const router = express.Router();

// Amanda Au-Yeung

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login/password",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// local authenication using passport
passport.use(new LocalStrategy(
  async function(user, password, done) {
    await myDB.getUsers(user.email), (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    }
  }
));

export default router;
