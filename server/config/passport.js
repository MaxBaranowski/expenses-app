const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const User = require("../database/models/User");

module.exports = function(passport) {
  //local strategy
  passport.use(
    new LocalStrategy(function(email, password, done) {
      // match email
      let query = { email: email };
      User.findOne({ query }, function(err, user) {
        if (err) throw err;
        if (!user) {
          return done(null, false, { message: "No user found!" });
        }
        // match password
        bcrypt.compare(password, user.password, function(err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Wrong password!" });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
