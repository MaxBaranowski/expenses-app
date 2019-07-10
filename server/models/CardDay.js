const mongoose = require("mongoose");

var cardSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    user_id: {
      type: String,
      required: true
    },
    cards: {
      type: [
        {
          created: {
            type: Date,
            default: +new Date(),
            unique: true
          },
          description: {
            type: String
          },
          ammount: {
            type: Number,
            default: 0
          }
        }
      ]
    },
    totalAmmount: {
      type: Number,
      default: 0
    },
    date: {
      type: Number, // year-month-day
      required: true
    },
    month: {
      type: Number,
      required: true
    },
    year: {
      type: Number,
      required: true
    }
  },
  { collection: "card-day" }
);

var CardDay = mongoose.model("card-day", cardSchema);

module.exports = CardDay;
