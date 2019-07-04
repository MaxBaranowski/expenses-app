var passport = require("passport");
const User = require("../models/User");

// Using LocalStrategy with passport
var LocalStrategy = require("passport-local").Strategy;
passport.use(
  new LocalStrategy(
    {
      usernameField: "login",
      passwordField: "password"
    },
    function(login, password, done) {
      User.findOne({ email: login, password: password }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Login or Password is invalid" });
        }
        return done(null, user);
      });
    }
  )
);

passport.serializeUser(function(user, done) {
  // console.log("serializeUser", user);
  // user id  is saved in the session
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // get the whole object from sseesion by id
  // console.log("serializeUser", id);
  User.findById(id, function(err, user) {
    // object is attached to the request object as req.user
    done(err, user);
  });
});
