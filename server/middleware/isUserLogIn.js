module.exports = (req, res, next) => {
  if (!req.user) {
    res.status(400).json({ error: "User must be loged in!" });
  } else {
    next();
  }
};
