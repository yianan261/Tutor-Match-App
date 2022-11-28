import passport from "passport";
import LocalStrategy from "passport-local";
import myDB from "../db/myDB.js";
import { validatePassword } from "./utils/passwordUtilites.js";

// Amanda Au-Yeung
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
  process.nextTick(function () {
    cb(null, user._id.toString());
  });
});

passport.deserializeUser(async (user_id, cb) => {
  const res = await myDB.getUsersById(user_id);
  process.nextTick(function () {
    return cb(null, res);
  });
});

/**
 * login
 */
export const login = (req, res, next) => {
  passport.authenticate("local", function (err, user) {
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
      if (err) {
        return next(err);
      }
      return res
        .status(320)
        .json({ status: "ok", user: req.session.passport.user });
    });
  })(req, res, next);
};

/**
 * getUsers from login
 */
export const getUser = async (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.session.passport.user });
  } else {
    res.json({ user: null });
  }
};

/**
 * export logout
 */
export const logOut = async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
