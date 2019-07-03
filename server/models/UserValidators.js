module.exports.password = {
  validate: function(password) {
    return password.length > 6;
  },
  message: "Password must be more then 6 signs legth"
};
