const mongoose = require("mongoose");
const dayliCard = require("../../../models/CardDay");
const yearCard = require("../../../models/CardYear");

// check if daily card existed
module.exports.isDayCardExist = function ({ user_id, date }) {
  return new Promise((resolve, reject) => {
    dayliCard.findOne(
      {
        user_id: user_id,
        date: date
      },
      function (err, card) {
        if (err) {
          reject(err);
        }
        if (card) {
          resolve({ user_id: card.user_id, date: card.date }); // card exists
        } else {
          resolve(null); // card doesn`t exists
        }
      }
    );
  });
};
// check if monthly card existed
module.exports.isMonthCardExist = function ({ user_id, year, month }) {
  return new Promise((resolve, reject) => {
    yearCard.findOne(
      {
        user_id: user_id,
        year: year,
        "months.month": month
      },
      function (err, card) {
        if (err) {
          reject(err);
        }
        if (card) {
          resolve({ user_id: card.user_id, year: year }); // card exists
        } else {
          resolve(null); // card doesn`t exists
        }
      }
    );
  });
};
// check if yearly card existed
module.exports.isYearCardExist = function ({ user_id, year }) {
  return new Promise((resolve, reject) => {
    yearCard.findOne(
      {
        user_id: user_id,
        year: year
      },
      function (err, card) {
        if (err) {
          reject(err);
        }
        if (card) {
          resolve({ user_id: card.user_id, year: year }); // card exists
        } else {
          resolve(null); // card doesn`t exists
        }
      }
    );
  });
};

// create daily card
module.exports.createDayCard = function ({ user_id, date, cards, year, month }) {
  return new Promise((resolve, reject) => {
    let card = new dayliCard({
      _id: new mongoose.Types.ObjectId(),
      user_id: user_id,
      cards: cards,
      date: date,
      year: year,
      month: month
    });

    card.save(function (error) {
      if (error) {
        reject(error);
      }
      resolve("New card saved!");
    });
  });
};
// add expense record to daily card
module.exports.addDailyCardExpense = function ({ user_id, date, cards }) {
  return new Promise((resolve, reject) => {
    // console.log(user_id, date, cards);
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
// create montly record in year collection for user
module.exports.createMonthCard = function ({
                                             user_id,
                                             year,
                                             month,
                                             ammount,
                                             income
                                           }) {
  return new Promise((resolve, reject) => {
    yearCard
      .findOneAndUpdate(
        {
          user_id: user_id,
          year: year
        },
        {
          $push: {
            months: {
              month: month,
              ammount: ammount,
              income: income
            }
          }
        }
      )
      .then(res => {
        resolve(res);
      })
      .catch(err => reject(err));
  });
};
// create yearly card
module.exports.createYearCard = function ({ user_id, year }) {
  return new Promise((resolve, reject) => {
    let card = new yearCard({
      _id: new mongoose.Types.ObjectId(),
      user_id: user_id,
      year: year
    });

    card.save(function (error) {
      if (error) {
        reject(error);
      }
      resolve("New year card saved!");
    });
  });
};

module.exports.updateDailyCardTotalAmmount = function ({
                                                         user_id,
                                                         date,
                                                         totalAmmount
                                                       }) {
  return new Promise((resolve, reject) => {
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

module.exports.updateYearMonthlyExpenses = function ({
                                                       user_id,
                                                       year,
                                                       month,
                                                       income,
                                                       ammount
                                                     }) {
  return new Promise((resolve, reject) => {
    yearCard
      .findOneAndUpdate(
        {
          user_id: user_id,
          year: year,
          "months.month": month
        },
        {
          $set: {
            "months.$.ammount": ammount,
            "months.$.income": income
          }
        }
      )
      .then(res => {
        resolve(res);
      })
      .catch(err => reject(err));
  });
};

module.exports.updateYearTotalExpenses = async function ({
                                                           user_id,
                                                           year,
                                                           yearTotal
                                                         }) {
  return new Promise((resolve, reject) => {
    yearCard
      .findOneAndUpdate(
        {
          user_id: user_id,
          year: year
        },
        {
          $set: {
            totalAmmount: yearTotal.totalAmmount,
            totalIncome: yearTotal.totalIncome
          }
        }
      )
      .then(res => {
        resolve(res);
      })
      .catch(err => reject(err));
  });
};

module.exports.updateYearlyCardExpenses = async function ({
                                                            user_id,
                                                            year,
                                                            month,
                                                            ammount,
                                                            income
                                                          }) {
  return new Promise(async (resolve, reject) => {
    try {
      // check if year card exists in year collection
      let isYearCardExist = await this.isYearCardExist({ user_id, year });
      if (!isYearCardExist) {
        await this.createYearCard({ user_id, year });
      }
      // check if monthly card exists in year collection
      let isMonthCardExist = await this.isMonthCardExist({
        user_id,
        year,
        month
      });
      if (!isMonthCardExist) {
        // if monthly card doesn`t exist, create new one in year collection
        await this.createMonthCard({
          user_id,
          year,
          month,
          income,
          ammount
        });
      } else {
        // update month card in year collection
        await this.updateYearMonthlyExpenses({
          user_id,
          year,
          month,
          income,
          ammount
        });
      }
      // get sum of all incomes and ammounts in current year
      let yearTotal = await this.getYearlyTotalExpenses({ user_id, year });
      // update total ammount and income for current year
      await this.updateYearTotalExpenses({ user_id, year, yearTotal });

      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports.getDailyCardTotalAmmount = function ({ user_id, date }) {
  return new Promise((resolve, reject) => {
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
        if (res) {
          resolve(res[0].totalAmmount);
        } else {
          resolve(0);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.getMonthlyTotalAmmountExpenses = function ({
                                                            user_id,
                                                            year,
                                                            month
                                                          }) {
  return new Promise((resolve, reject) => {
    dayliCard
      .aggregate([
        {
          $match: { user_id: user_id, year: year, month: month }
        },
        {
          $group: {
            _id: { user_id: "$user_id", year: "$year", month: "$month" },
            totalAmmount: { $sum: "$totalAmmount" }
          }
        },
        { $project: { totalAmmount: true, _id: false } }
      ])
      .then(res => {
        resolve(res[0].totalAmmount);
      })
      .catch(err => reject(err));
  });
};

module.exports.getYearlyTotalExpenses = function ({ user_id, year }) {
  return new Promise((resolve, reject) => {
    yearCard
      .aggregate([
        { $unwind: "$months" },
        {
          $match: { user_id: user_id, year: year }
        },
        {
          $group: {
            _id: { user_id: "$user_id", year: "$year" },
            totalAmmount: { $sum: "$months.ammount" },
            totalIncome: { $sum: "$months.income" }
          }
        },
        { $project: { totalAmmount: true, totalIncome: true, _id: false } }
      ])
      .then(res => {
        resolve(res[0]);
      })
      .catch(err => reject(err));
  });
};

module.exports.getMonthlyTotalIncomeExpenses = function ({
                                                           user_id,
                                                           year,
                                                           month
                                                         }) {
  return new Promise((resolve, reject) => {
    resolve(152);
  });
};

module.exports.getFullYearCard = function ({ user_id, year }) {
  return new Promise((resolve, reject) => {
    yearCard
      .findOne({
        user_id: user_id,
        year: year
      })
      .select(
        "balance totalAmmount totalIncome year months.month months.ammount months.income"
      )
      .then(res => {
        let { balance, totalAmmount, totalIncome, year, _id } = res;
        let months = {};

        for (let key of res.months) {
          months[key.month] = key;
        }

        resolve({
          balance: balance,
          totalAmmount: totalAmmount,
          totalIncome: totalIncome,
          year: year,
          _id: _id,
          months: months
        });
      })
      .catch(err => reject(err));
  });
};

module.exports.getFullMonthCard = function ({ user_id, month, year }) {
  return new Promise((resolve, reject) => {
    dayliCard
      .find({
        user_id: user_id,
        month: month,
        year: year
      })
      .select(
        "totalAmmount year month date cards.ammount cards.created cards.description cards._id"
      )
      .then(res => {
        resolve(res);
      })
      .catch(err => reject(err));
  });
};

module.exports.deleteCardRecord = function ({ user_id, id, date }) {
  return new Promise((resolve, reject) => {
    dayliCard
      .updateOne(
        //removes ONLY ONE FIRST ELEMENT in array, xactly what i need :)
        { "cards._id": id, date: date, user_id: user_id }, // nested _id key, in cards array
        {
          $pull: { cards: { _id: id } } // update = removes key from array by id
        }
      )
      .then(res => {
        resolve({ status: "removed" });
      })
      .catch(err => reject(err));
  });
};
