const mongoose = require("mongoose");
var dayliCard = require("../../../models/CardDay");
var yearCard = require("../../../models/CardYear");

module.exports.isDayliCardExist = function({ user_id, date }) {
  return new Promise((resolve, reject) => {
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
          resolve(null); // card doesn`t exists
        }
      }
    );
  });
};

module.exports.createNewCard = function({ user_id, date, cards, year, month }) {
  return new Promise((resolve, reject) => {
    let card = new dayliCard({
      _id: new mongoose.Types.ObjectId(),
      user_id: user_id,
      cards: cards,
      date: date,
      year: year,
      month: month
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

module.exports.updateCardExpenses = function({ user_id, date, cards }) {
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

module.exports.getMonthTotalAmmountExpenses = function({
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

module.exports.getYearTotalExpenses = function({ user_id, year }) {
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

module.exports.getMonthTotalIncomeExpenses = function({
  user_id,
  year,
  month
}) {
  return new Promise((resolve, reject) => {
    resolve(152);
  });
};

module.exports.isYearCardExist = function({ user_id, year }) {
  return new Promise((resolve, reject) => {
    yearCard.findOne(
      {
        user_id: user_id,
        year: year
      },
      function(err, card) {
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

module.exports.isMonthCardExist = function({ user_id, year, month }) {
  return new Promise((resolve, reject) => {
    yearCard.findOne(
      {
        user_id: user_id,
        year: year,
        "months.month": month
      },
      function(err, card) {
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

module.exports.createYearNewCard = function({ user_id, year }) {
  return new Promise((resolve, reject) => {
    let card = new yearCard({
      _id: new mongoose.Types.ObjectId(),
      user_id: user_id,
      year: year
    });

    card.save(function(error) {
      if (error) {
        reject(error);
      }
      resolve("New year card saved!");
    });
  });
};

module.exports.createMonthNewCard = function({
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

module.exports.updateMonthCard = function({
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

module.exports.updateYearTotalExpenses = async function({
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

module.exports.getYearlyCardExpenses = async function({
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
        await this.createYearNewCard({ user_id, year });
      }
      // check if monthly card exists in year collection
      let isMonthCardExist = await this.isMonthCardExist({
        user_id,
        year,
        month
      });
      if (!isMonthCardExist) {
        // if monthly card doesn`t exist, create new one in year collection
        await this.createMonthNewCard({
          user_id,
          year,
          month,
          income,
          ammount
        });
      } else {
        // update month card in year collection
        await this.updateMonthCard({ user_id, year, month, income, ammount });
      }
      // get sum of all incomes and ammounts in current year
      let yearTotal = await this.getYearTotalExpenses({ user_id, year });
      // update total ammount and income for current year
      await this.updateYearTotalExpenses({ user_id, year, yearTotal });

      resolve(true);
    } catch (err) {
      reject(err);
    }
  });
};
