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
      .isDayCardExist({ user_id, date })
      .then(card => {
        if (card) {
          // if card already exists
          _card
            .addDailyCardExpense({ user_id, date, cards, year, month })
            .then(res => resolve(res))
            .catch(err => reject(err));
        } else {
          // if no card
          _card
            .createDayCard({ user_id, date, cards, year, month })
            .then(res => resolve(res))
            .catch(err => reject(err));
        }
      })
      .catch(err => reject(err));
  })
    .then(() => {
      return new Promise((resolve, reject) => {
        _card
          .getDailyCardTotalAmmount({ user_id, date })
          .then(totalAmmount =>
            _card
              .updateDailyCardTotalAmmount({ user_id, date, totalAmmount })
              .then(done => resolve(done))
              .catch(err => reject(err))
          )
          .catch(err => reject(err));
      });
    })
    .then(() => {
      module.exports.getFullExpenses(req, res, next);
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

module.exports.getYearlyExpenses = function(req, res, next) {
  // if (!req.user) {
  //   res.status(400).json({ error: "User must be loged in!" });
  // }

  const { year } = Object.keys(req.body).length > 0 ? req.body : req.params;

  return new Promise((resolve, reject) => {
    _card.getFullYearCard({ user_id, year }).then(result => res.json(result));
    // return array with months
  }).catch(function(err) {
    return next(err);
  });
};

module.exports.getMonthlyExpenses = function(req, res, next) {
  // if (!req.user) {
  //   res.status(400).json({ error: "User must be loged in!" });
  // }

  const { month, year } =
    Object.keys(req.body).length > 0 ? req.body : req.params;
  return new Promise((resolve, reject) => {
    _card
      .getFullMonthCard({ user_id, month, year })
      .then(result => res.json(result));
    // return array with months
  }).catch(function(err) {
    return next(err);
  });
};

module.exports.getFullExpenses = async function(req, res, next) {
  try {
    // if (!req.user) {
    //   res.status(400).json({ error: "User must be loged in!" });
    // }
    let { year, month } =
      Object.keys(req.body).length > 0 ? req.body : req.query;

    year = parseInt(year);
    month = parseInt(month);

    let totalAmmount = await _card.getMonthlyTotalAmmountExpenses({
      user_id,
      year,
      month
    });

    let totalIncome = await _card.getMonthlyTotalIncomeExpenses({
      user_id,
      year,
      month
    });

    let result = await _card.updateYearlyCardExpenses({
      user_id,
      year,
      month,
      ammount: totalAmmount,
      income: totalIncome
    });

    res.status(200).json({
      result
    });
  } catch (err) {
    return next(err);
  }
};

module.exports.deleteCardRecord = async function(req, res, next) {
  try {
    let { cardId: id, date, year, month } =
      Object.keys(req.body).length > 0 ? req.body : req.query;

    await _card.deleteCardRecord({ id, user_id, date });

    // await _card.getDailyCardTotalAmmount({ user_id, date }).then(totalAmmount =>
    //   _card
    //     .updateDailyCardTotalAmmount({ user_id, date, totalAmmount })
    // );

    res.status(200).json({ status: true });
  } catch (err) {
    return next(err);
  }
};
