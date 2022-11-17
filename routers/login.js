import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import myDB from "../db/myDB.js";
const router = express.Router();
import crypto from "crypto";

// Amanda Au-Yeung
// encryption source: https://github.com/Oliwier965/Photo-App/blob/main/authentication/passwordUtils.js
const validatePassword = (password, hash, salt) => {
  console.log("validate password test", password, "\nhash", hash, "\nsalt", salt);
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  console.log("hashVerify", hashVerify);
  console.log("true or false validate Password", hashVerify === hash);
  return hashVerify === hash;
};

// verify with local strategy in passport
const strategy = new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, cb) => {
  console.log("verify", email, password);
  try {
    const res = await myDB.getUsers(email);
    console.log("strategy res", res);
    console.log("password after strategy", password);
    if (!res) {
      return cb(null, false, {message: "Don't forget to register!"});
    }
    if (!validatePassword(password, res.hash, res.salt)) {
      return cb(null, false, {message: "Invalid credentials"});
    } else {
      return cb(null, res);
    }
  } catch (err) {
    return cb(err);
  }
});

passport.use(strategy);

passport.serializeUser((user, cb) => {
  console.log("user in serialize", user._id.toString());
  process.nextTick(function () {
    cb(null, user._id.toString());
  });
});

passport.deserializeUser(async (user_id, cb) => {
  console.log("deserialize called");
  const res = await myDB.getUsersById(user_id);
  console.log("deserialize", res);
  process.nextTick(function () {
    return cb(null, res);
  });
});

// router.get("/login", (req, res) => {
//   res.render("login");
// });

// used part of the source of https://stackoverflow.com/questions/72128646/passport-authenticate-isnt-redirecting
router.post("/login/password", (req, res, next) => {
  console.log("login body router", req.body);
    passport.authenticate("local", function (err, user) {
      console.log("passport authenticate user", user);
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
          .json({ redirectUrl: "/profile", status: "ok" });
      });
    })(req, res, next);
});


// passport.authenticate("local", { failureRedirect: "/login?msg=error" }),

//   async (req, res, next) => {
//     console.log("login password", req.body);

//     const user = req.body;

//     req.login(user, (err) => {
//       if (err) {
//         return next(err);
//       }
//       return res.json({ ok: true, message: "works!" });
//     });
//   }
// );


router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

export default router;
