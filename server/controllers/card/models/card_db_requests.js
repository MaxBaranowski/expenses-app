const mongoose = require("mongoose");
var dayliCard = require("../../../models/CardDay");

module.exports.isDayliCardExist = function({ user_id, date }) {
  return new Promise(function(resolve, reject) {
    dayliCard.findOne(
      {
        user_id: user_id,
        date: date
      },
      function(err, card) {
        if (err) {
          reject(err);
        }
        if (card) {
          resolve({ user_id: card.user_id, date: card.date }); // card exists
        } else {
          resolve(null); // card exists
        }
      }
    );
  });
};

module.exports.createNewCard = function({ user_id, date, cards }) {
  return new Promise(function(resolve, reject) {
    let card = new dayliCard({
      _id: new mongoose.Types.ObjectId(),
      user_id: user_id,
      cards: cards,
      date: date
    });

    card.save(function(error) {
      if (error) {
        reject(error);
      }
      resolve("New card saved!");
    });
  });
};

module.exports.getCardTotalAmmount = function({ user_id, date }) {
  return new Promise(function(resolve, reject) {
    dayliCard
      .aggregate([
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
      ])
      .then(res => {
        resolve(res[0].totalAmmount);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.updateCardTotalAmmount = function({
  user_id,
  date,
  totalAmmount
}) {
  return new Promise(function(resolve, reject) {
    dayliCard
      .findOneAndUpdate(
        {
          user_id: user_id,
          date: date
        },
        {
          $set: { totalAmmount: totalAmmount }
        }
      )
      .then(res => {
        resolve(res);
      })
      .catch(err => reject(err));
  });
};

module.exports.updateCardExpenses = function({ user_id, date, cards }) {
  return new Promise(function(resolve, reject) {
    console.log(user_id, date, cards);
    dayliCard
      .findOneAndUpdate(
        {
          user_id: user_id,
          date: date
        },
        {
          $push: { cards: cards }
        }
      )
      .then(res => {
        resolve(res);
      })
      .catch(err => reject(err));
  });
};

module.exports.addDayExpense = function() {};
