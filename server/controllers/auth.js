const mongoose = require("mongoose");
var User = require("../database/models/User");

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
  let params = req.body || req.query;

  new Promise(function(resolve, reject) {
    User.findOne({
      email: params.email,
      password: params.password
    }).exec(function(err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  }).then(
    function(result) {
      if (!result) return res.status(400).send("Email or Password is invalid");
      // user authenticate
      res.status(200).send(result);
      //console.log(result);
    },
    function(err) {
      return next(err);
    }
  );
};

module.exports.logout = function() {
  console.log("logout");
};
