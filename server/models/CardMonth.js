const mongoose = require("mongoose");

var cardSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    user_id: {
      type: String,
      required: true
    },
    cards: {
      type: Array
    },
    date: {
      type: Number, // year-month
      required: true
    },
    totalAmmount: {
      type: String
    },
    totalIncome: {
      type: String
    }
  },
  { collection: "card-month" }
);

var CardMonth = mongoose.model("card-month", cardSchema);

module.exports = CardMonth;
