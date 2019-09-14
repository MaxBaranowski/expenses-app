const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

var passport = require("passport");
var session = require("express-session");

require("dotenv").config();
require("./database/db");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");
const cardRouter = require("./routes/card");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
// read JSON content-type (body parser built into express)

// enable cors
app.use(
  cors({
    origin: [
      "https://wizardly-snyder-47f16b.netlify.com",
      "https://expenses-app.devbaranowski.com",
      "http://localhost:8080"
    ],
    methods: [ "GET", "POST", "OPTIONS" ],
    credentials: true // enable set cookie
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: "application/json" }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Express Session
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
    cookie: {
      httpOnly: false,
      maxAge: 30 * 60 * 1000
    } //in miliseconds 1s = 1000ms
  })
);

app.use(
  express.json({
    limit: "1024kb",
    strict: true,
    type: "application/json"
  })
);

// Passport init
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/card", cardRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render("error");
  return res.json({ error: err.message });
});

module.exports = app;
