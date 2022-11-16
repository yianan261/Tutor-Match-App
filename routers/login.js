import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import myDB from "../db/myDB.js";
const router = express.Router();

// Amanda Au-Yeung
// encryption source: https://github.com/Oliwier965/Photo-App/blob/main/authentication/passwordUtils.js
const validatePassword = (password, hash, salt) => {
  console.log("validate password test", password)
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return hashVerify === hash;
};

const strategy = new LocalStrategy(async function verify(email, password, cb) {
  console.log("verify", email, password);
  try {
    const res = await myDB.getUsers(email);
    console.log("strategy res".res.email);
    if (!res) {
      return cb(null, false);
    }
    if (!res || !validatePassword(password, res.hash, res.salt)) {
      return cb(null, false);
    } else {
      return cb(null, res);
    }
  } catch (err) {
    cb(err);
  }
});

passport.use(strategy);

passport.serializeUser((user, cb) => {
  console.log("user in serialize", user);
  process.nextTick(function () {
    cb(null, user._id);
  });
});

passport.deserializeUser(async (user_id, cb) => {
  console.log("deserialize user", user_id);
  const res = await myDB.getUsersByID(user_id);
  console.log("deserialize", res);
  process.nextTick(function () {
    return cb(null, res);
  });
});

router.get("/login", (req, res) => {
  res.render("login");
});

// used part of the source of https://stackoverflow.com/questions/72128646/passport-authenticate-isnt-redirecting
router.post("/login/password", async (req, res, next) => {
  console.log("login body router", req.body);
  // if user in DB
  const checkExistUser = await myDB.getUsers(req.body.email);
  console.log("user routing", checkExistUser);
  if (checkExistUser) {
    console.log("user exists, you can login");
    passport.authenticate("local", function (err, user) {
      console.log("passport authenticate user", user);
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(320).json({
          status: "error",
          message: "Invalid credentials",
        });
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res
          .status(320)
          .json({ redirectUrl: "/profile", status: "ok", message: "Logged in" });
      });
    })(req, res, next);
  } else {
    res.status(403).json({ message: "You are not registered" });
  }
});

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

export default router;
