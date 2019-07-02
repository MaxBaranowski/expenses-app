const express = require("express");
const router = express.Router();

const auth = require("../controllers/auth");
var passport = require("passport");
const User = require("../database/models/User");

// Using LocalStrategy with passport
var LocalStrategy = require("passport-local").Strategy;
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    function(email, password, done) {
      console.log(1, email, password);
      User.findOne({ email: email, password: password }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        return done(null, user);
      });
    }
  )
);

passport.serializeUser(function(user, done) {
  console.log(2);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    console.log(3);
    done(err, user);
  });
});

router.get("/", function(req, res, next) {
  res.send("Hello");
});

/* SIGN UP USER. */
router.get("/signup", auth.signup);
router.post("/signup", auth.signup);

/* LOG IN USER. */
router.get("/login", auth.login);
router.post("/login", (req, res, next) =>
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  })(req, res, next)
);

/* LOG OUT USER. */
router.get("/logout", auth.logout);
router.post("/logout", auth.logout);

module.exports = router;
