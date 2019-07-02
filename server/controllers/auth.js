const mongoose = require("mongoose");
var User = require("../database/models/User");
var passport = require("passport");

module.exports.signup = function(req, res, next) {
  let params = req.body || req.query;
  var user = new User({
    _id: new mongoose.Types.ObjectId(),
    firstName: params.firstName,
    lastName: params.lastName,
    email: params.email,
    password: params.password
  });

  new Promise(function(resolve, reject) {
    user.save(function(err) {
      if (err) reject(err);
      resolve("User successfully saved.");
    });
  }).then(
    function(result) {
      // user authenticate
      res.status(200).send(result);
      //console.log(result);
    },
    function(err) {
      return next(err);
    }
  );
};

module.exports.login = function(req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
  })(req, res, next);
};

module.exports.logout = async function(req, res, next) {
  await req.logout();
  res.send("logout");
  console.log("logout");
};
