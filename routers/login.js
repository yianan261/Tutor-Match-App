import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import myDB from "../db/myDB.js";
const router = express.Router();

// Amanda Au-Yeung
// const strategy = new LocalStrategy(async function verify(username, password, cb) {
//   console.log("verify", username, password);
//   const res = await myDB.getUsers(username);
//   const user = {
//     id: res._id,
//     email: res.email,
//     password: res.password
//   }
//   console.log("user", user);
//   return cb(null, user);
// })

 passport.use(
    new LocalStrategy(async function verify(user, password, done) {
      console.log("verify", user);
      await myDB.getUsers(user.email, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: "Incorrect username or password.",
          });
        }
        crypto.pbkdf2(
          password,
          user.salt,
          310000,
          32,
          "sha256",
          function (err, hashedPassword) {
            if (err) {
              return done(err);
            }
            if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
              return done(null, false, {
                message: "Incorrect username or password.",
              });
            }
            return done(null, user);
          }
        );
      });
    })
  );

// passport.use(strategy);

passport.serializeUser(async function (user, cb) {
  const res = await myDB.getUsers(user);
  console.log("serialize", res);
  process.nextTick(function () {
    cb(null, { id: res._id, username: res.email });
  });
});

passport.deserializeUser(async function (user, cb) {
  const res = await myDB.getUsers(user);
  console.log("deserialize", res);
  process.nextTick(function () {
    return cb(null, res);
  });
});

router.get("/login", (req, res) => {
  res.render("login");
})

router.post("/login", async (req, res) => {
  console.log("login router req.body", req.body);
  // if user in DB
  const user = await myDB.getUsers(req.body.email, req.body.pw);
  console.log("user routing", user);
  if (user){
    req.login(user, function(err) {
      if (err) {
        console.log(err);
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/profile");
        });
      }
    })
  } else {
    console.log("user not registered");
    return res.redirect("/register");
  }
 
})

router.post(
  "/login/password",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

// router.get("/getUser", (req, res) => {
//   console.log("get user", req.body);
//   res.send({ email: req.body.email });
// })

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});


export default router;
