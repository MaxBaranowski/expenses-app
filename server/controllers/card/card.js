const _card = require("./models/card_db_requests");

module.exports.addDayExpense = function(req, res, next) {
  // if (!req.user) {
  //   res.status(400).json({ error: "User must be loged in!" });
  // }
  const user_id = "5d1de1e82fc35f0b2acc3b4f"; //req.user._id;
  const { cards, date } =
    Object.keys(req.body).length > 0 ? req.body : req.params;

  return new Promise((resolve, reject) => {
    _card
      .isDayliCardExist({ user_id, date })
      .then(card => {
        if (card) {
          // if no card
          _card
            .updateCardExpenses({ user_id, date, cards })
            .then(res => resolve(res))
            .catch(err => reject(err));
        } else {
          // if card already exists
          _card
            .createNewCard({ user_id, date, cards })
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
            .then(done => res.status(200).json(done))
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

module.exports.getYearlyExpenses = function(req, res, next) {
  // if (!req.user) {
  //   res.status(400).json({ error: "User must be loged in!" });
  // }
  const user_id = "5d1de1e82fc35f0b2acc3b4f"; //req.user._id;
  const { year } = Object.keys(req.body).length > 0 ? req.body : req.params;

  _card
    .getMonths({ user_id, year })
    .then(result => {
      res.json(result);
    })
    .catch(function(err) {
      return next(err);
    });
};

module.exports.getYearlyExpenses = function(req, res, next) {};
