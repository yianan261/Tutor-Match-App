// import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
// import crypto from "crypto";
import myDB from "../db/myDB.js";
import session from "express-session";

// Amanda Au-Yeung
// configures local strategy, from passport.js documentation
// const router = express.Router();
function configurePassport(app) {
  const strategy = new LocalStrategy(async function verify(username, password, cb) {
    console.log("verify", username, password);
    const res = await myDB.getUsers(username);
    const user = {
      email: res.email,
      password: res.password
    }
    console.log("user", user);
    return cb(null, user);
  
  })
  
  passport.use(strategy);
  
  
  // passport.use(
  //   new LocalStrategy(async function verify(user, password, done) {
  //     await myDB.getUsers(user.email, (err, user) => {
  //       if (err) {
  //         return done(err);
  //       }
  //       if (!user) {
  //         return done(null, false, {
  //           message: "Incorrect username or password.",
  //         });
  //       }
  //       crypto.pbkdf2(
  //         password,
  //         user.salt,
  //         310000,
  //         32,
  //         "sha256",
  //         function (err, hashedPassword) {
  //           if (err) {
  //             return done(err);
  //           }
  //           if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
  //             return done(null, false, {
  //               message: "Incorrect username or password.",
  //             });
  //           }
  //           return done(null, user);
  //         }
  //       );
  //     });
  //   })
  // );
  passport.serializeUser(function (user, cb) {
    console.log("serialize", user);
    process.nextTick(function () {
      cb(null, { id: user.id, username: user.username });
    });
  });
  
  passport.deserializeUser(function (user, cb) {
    console.log("deserialize", user);
    process.nextTick(function () {
      return cb(null, user);
    });
  });
  
  // passport.serializeUser(function (user, done) {
  //   done(null, user.email);
  // });
  
  // passport.deserializeUser(async function (user, done) {
  //   try {
  //     const user = await myDB.getUsers(user.email);
  //     done(null, user);
  //   } catch (err) {
  //     done(err);
  //   }
  // });
  
  // };
  app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: false,
    })
  );
  
  // initialize passport and restore authentication state
  app.use(passport.initialize());
  app.use(passport.authenticate("session"));

}

export default configurePassport;

