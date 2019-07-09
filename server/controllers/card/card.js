const mongoose = require("mongoose");
var dayliCard = require("../../models/CardDay");
var monthlyCard = require("../../models/CardMonth");

module.exports.addDayExpense = function(req, res, next) {
  // if (!req.user) {
  //   res.status(400).json({ error: "User must be loged in!" });
  // }
  const user_id = "5d1de1e82fc35f0b2acc3b4f"; //req.user._id;
  const { cards, date } =
    Object.keys(req.body).length > 0 ? req.body : req.params;

  let card = new dayliCard({
    _id: new mongoose.Types.ObjectId(),
    user_id: user_id,
    cards: cards,
    date: date
  });

  new Promise(function(resolve, reject) {
    // check if card exist
    dayliCard.findOne(
      {
        user_id: user_id,
        date: date
      },
      function(err, exist) {
        if (err) {
          console.log(1, err)
        }
        console.log(2, exist.user_id, exist.date)
      }
    );
    return;
    // create new card
    card.save(function(error) {
      if (error) {
        reject(error);
      }
      resolve("Card created");
    });
  })
    .then(
      function() {
        dayliCard.aggregate(
          [
            { $unwind: "$cards" },
            {
              $match: { user_id: user_id, date: date }
            },
            {
              $group: {
                _id: { user_id: "$user_id", date: "$date" },
                totalAmmount: { $sum: "$cards.ammount" }
              }
            },
            { $project: { totalAmmount: true, _id: false } }
          ],
          (err, suc) => {
            if (err) {
              return next(err);
            }
            let totalAmmount = suc[0].totalAmmount;

            dayliCard.findOneAndUpdate(
              {
                user_id: user_id,
                date: date
              },
              {
                $set: { totalAmmount: totalAmmount }
              },
              (err, doc) => {
                if (err) {
                  return next(err);
                }
                res.status(200).json(doc);
              }
            );
          }
        );
      },
      function(err) {
        return next(err);
      }
    )
    .catch(function(err) {
      return next(err);
    });
};

module.exports.removeDayExpense = function(req, res, next) {};

module.exports.getMonthExpenses = function(req, res, next) {};

module.exports.getYearExpenses = function(req, res, next) {};
