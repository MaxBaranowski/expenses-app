const mongoose = require("mongoose");

var cardSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    user_id: {
      type: String,
      required: true
    },
    months: {
      type: [
        {
          month: {
            type: Number,
            // unique: true
          },
          ammount: {
            type: Number
          },
          income: {
            type: Number
          }
        }
      ]
    },
    balance: {
      type: Number,
      default: 0
    },
    totalAmmount: {
      type: Number,
      default: 0
    },
    totalIncome: {
      type: Number,
      default: 0
    },
    year: {
      type: Number
    }
  },
  { collection: "card-year" }
);

var CardYear = mongoose.model("card-year", cardSchema);

module.exports = CardYear;
