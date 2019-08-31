const mongoose = require("mongoose");
var User = require("../models/User");
var passport = require("passport");

module.exports.signup = function (req, res, next) {
  let params = req.body || req.query;
  var user = new User({
    _id: new mongoose.Types.ObjectId(),
    firstName: params.firstName,
    lastName: params.lastName,
    email: params.login,
    password: params.password
  });

  new Promise(function (resolve, reject) {
    user.save(function (err) {
      if ( err ) reject(err);
      resolve("User successfully saved.");
    });
  }).then(
    function (result) {
      res.status(200).json({ message: result });
    },
    function (err) {
      return next(err);
    }
  );
};

module.exports.login = function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if ( err ) {
      return next(err);
    }
    if ( !user ) {
      return res.status(403).json({ error: info.message });
    }

    // using a custom callback, it becomes the application's responsibility to establish a session (by calling req.login()) and send a response.
    // req.login() assigns the user object to the request object req as req.user once the login operation completes.
    req.logIn(user, function (err) {
      if ( err ) {
        return next(err);
      }
      // console.log("login", user);
      // res.setHeader("Access-Control-Allow-Credentials", "true");
      // req.session.user = user;
      res.send({ user: user._id, redirect: "/" });
    });
  })(req, res, next);
};

module.exports.logout = async function (req, res, next) {
  console.log(req.user);
  req.logout();
  req.session.destroy();
  res
    .status(200)
    .clearCookie("connect.sid", {
      path: "/"
    })
    .send(true);
};

module.exports.isUserAuthorized = async function (req, res, next) {
  // console.log(req.user);
  if ( req.user ) {
    res.status(200).send(true);
  } else {
    res.status(403).send(false);
  }
};
