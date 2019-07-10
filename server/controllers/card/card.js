const _card = require("./models/card_db_requests");
const user_id = "5d1de1e82fc35f0b2acc3b4f"; //req.user._id;

module.exports.addDayExpense = function(req, res, next) {
  // if (!req.user) {
  //   res.status(400).json({ error: "User must be loged in!" });
  // }

  const { cards, date, year, month } =
    Object.keys(req.body).length > 0 ? req.body : req.params;

  return new Promise((resolve, reject) => {
    _card
      .isDayliCardExist({ user_id, date })
      .then(card => {
        if (card) {
          // if card already exists
          _card
            .updateCardExpenses({ user_id, date, cards, year, month })
            .then(res => resolve(res))
            .catch(err => reject(err));
        } else {
          // if no card
          _card
            .createNewCard({ user_id, date, cards, year, month })
            .then(res => resolve(res))
            .catch(err => reject(err));
        }
      })
      .catch(err => reject(err));
  })
    .then(() => {
      _card
        .getCardTotalAmmount({ user_id, date })
        .then(totalAmmount =>
          _card
            .updateCardTotalAmmount({ user_id, date, totalAmmount })
            .then(done => res.status(200).json("done"))
        )
        .catch(err => next(err));
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports.removeDayExpense = function(req, res, next) {
  return new Promise((resolve, reject) => {})
    .then(result => {
      res.json(result);
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports.getFullExpenses = async function(req, res, next) {
  try {
    // if (!req.user) {
    //   res.status(400).json({ error: "User must be loged in!" });
    // }
    const { year, month } =
      Object.keys(req.body).length > 0 ? req.body : req.params;

    let totalAmmount = await _card.getMonthTotalAmmountExpenses({
      user_id,
      year,
      month
    });

    let totalIncome = await _card.getMonthTotalIncomeExpenses({
      user_id,
      year,
      month
    });

    await _card.getYearlyCardExpenses({
      user_id,
      year,
      month,
      ammount: totalAmmount,
      income: totalIncome
    });

    res.json({
      ammount: totalAmmount,
      income: totalIncome,
      year: year,
      month: month
    });
  } catch (err) {
    return next(err);
  }
};

// module.exports.addYearExpencesCard = function(req, res, next) {
//   // if (!req.user) {
//   //   res.status(400).json({ error: "User must be loged in!" });
//   // }

//   const { year } = Object.keys(req.body).length > 0 ? req.body : req.params;

//   return new Promise((resolve, reject) => {
//     _card.createYearNewCard({ user_id, year }).then(result => {
//       res.json(result);
//     });
//   }).catch(function(err) {
//     return next(err);
//   });
// };
