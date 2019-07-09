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
            unique: true
          },
          ammount: {
            type: Number,
            default: 0
          },
          income: {
            type: Number,
            default: 0
          },
          cards: {
            type: []
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
    }
  },
  { collection: "card-year" }
);

var CardYear = mongoose.model("card-year", cardSchema);

module.exports = CardYear;
