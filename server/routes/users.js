const express = require("express");
const router = express.Router();

const auth = require("../controllers/auth");
require("../oauth/LocalStrategy");

router.get("/", function (req, res, next) {
  // req user - user from sessiom
  console.log("user:", req.user)
  res.json(req.user);
});

/* SIGN UP USER. */
router.get("/signup", auth.signup);
router.post("/signup", auth.signup);

/* LOG IN USER. */
router.get("/login", auth.login);
router.post("/login", auth.login);

/* LOG OUT USER. */
router.get("/logout", auth.logout);
router.post("/logout", auth.logout);

/* CHECK IF USER LOGED IN. */
router.get("/isUserAuthorized", auth.isUserAuthorized);
router.post("/isUserAuthorized", auth.isUserAuthorized);

module.exports = router;
