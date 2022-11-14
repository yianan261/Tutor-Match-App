import passport from "passport";
import LocalStrategy from "passport-local";
import crypto from "crypto";
import myDB from "../db/myDB";

// Amanda Au-Yeung
// configures local strategy, from passport.js documentation
passport.use(
  new LocalStrategy(async function verify(user, password, done) {
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

passport.serializeUser(function (user, done) {
  process.nextTick(function () {
    done(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function (user, done) {
  process.nextTick(function () {
    return done(null, user);
  });
});
