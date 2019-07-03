const mongoose = require("mongoose");

var userSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {
      type: String,
      default: "User"
    },
    lastName: {
      type: String,
      default: "Nr: " + mongoose.Schema.Types.ObjectId
    },
    email: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    created: {
      type: Date,
      default: new Date()
    }
  },
  { collection: "users" }
);

var User = mongoose.model("User", userSchema);

module.exports = User;
