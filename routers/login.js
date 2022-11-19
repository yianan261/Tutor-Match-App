import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import myDB from "../db/myDB.js";
const router = express.Router();
import crypto from "crypto";

// Amanda Au-Yeung
// encryption source: https://github.com/Oliwier965/Photo-App/blob/main/authentication/passwordUtils.js
const validatePassword = (password, hash, salt) => {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hashVerify === hash;
};

// verify with local strategy in passport
const strategy = new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  async (email, password, cb) => {
    try {
      const res = await myDB.getUsers(email);
      if (!res) {
        return cb(null, false);
      }
      if (!validatePassword(password, res.hash, res.salt)) {
        return cb(null, false);
      } else {
        return cb(null, res);
      }
    } catch (err) {
      return cb(err);
    }
  }
);

passport.use(strategy);

passport.serializeUser((user, cb) => {
  console.log("user in serialize", user._id.toString());
  process.nextTick(function () {
    console.log("serialized");
    cb(null, user._id.toString());
  });
});

passport.deserializeUser(async (user_id, cb) => {
  const res = await myDB.getUsersById(user_id);
  console.log("deserialize", res._id.toString());
  process.nextTick(function () {
    return cb(null, res);
  });
});

// used part of the source of https://stackoverflow.com/questions/72128646/passport-authenticate-isnt-redirecting
router.post("/login/password", (req, res, next) => {
  console.log("login body router", req.body);
  passport.authenticate("local", function (err, user) {
    console.log("passport authenticate user", user._id);
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(320).json({
        status: "error",
        message: "Invalid credentials. Have you signed up?",
      });
    }
    req.logIn(user, function (err) {
      console.log("req.session.passport.user", req.session.passport.user);
      if (err) {
        console.log("unsuccess");
        return next(err);
      }
      console.log("success pw correct and user existed");
      return res
        .status(320)
        .json({ status: "ok", user: req.session.passport.user });
    });
  })(req, res, next);
});


router.get("/getUser", async (req, res) => {
  console.log("getUSer123", req.session.passport);
  if (req.isAuthenticated()) {
    console.log("authenticated 123");
    res.status(200).json({ user: req.session.passport.user });
  } else {
    console.log("not authenticated?????");
    res.json({ user: null });
  }
});

router.post("/logout", async (req, res, next) => {
  console.log("logout", req.session.passport);
  req.logout(function (err) {
    console.log("logout", req.session.passport);
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

export default router;
