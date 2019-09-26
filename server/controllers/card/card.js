const _card = require("./models/card_db_requests");

module.exports.addDayRecord = function (req, res, next) {
  try {
    let { cards, date, year, month } =
      Object.keys(req.body).length > 0 ? req.body : req.params;
    year = parseInt(year);
    month = parseInt(month);

    return new Promise((resolve, reject) => {
      _card
        .isDayCardExist({ user_id: String(req.user._id), date })
        .then(card => {
          if (card) {
            // if card already exists
            _card
              .addDailyCardExpense({
                user_id: String(req.user._id),
                date,
                cards,
                year,
                month
              })
              .then(res => resolve(res))
              .catch(err => reject(err));
          } else {
            // if no card
            _card
              .createDayCard({
                user_id: String(req.user._id),
                date,
                cards,
                year,
                month
              })
              .then(res => resolve(res))
              .catch(err => reject(err));
          }
        })
        .catch(err => reject(err));
    })
      .then(() => {
        return new Promise((resolve, reject) => {
          _card
            .getDailyCardTotalAmmount({ user_id: String(req.user._id), date })
            .then(totalAmmount =>
              _card
                .updateDailyCardTotalAmmount({
                  user_id: String(req.user._id),
                  date,
                  totalAmmount
                })
                .then(done => resolve(done))
                .catch(err => reject(err))
            )
            .catch(err => reject(err));
        });
      })
      .then(() => {
        module.exports.getFullExpenses(req, res, next);
      })
      .catch(err => reject(err));
  } catch (err) { return next(err); }
};

module.exports.deleteDayRecord = async function (req, res, next) {
  try {
    let { cardId: id, date, monthId } =
      Object.keys(req.body).length > 0 ? req.body : req.query;

    await _card.deleteDayRecord({ id, user_id: String(req.user._id), date });
    // get total amount after removing record
    let updatedTotal = await _card.getDailyCardTotalAmmount({ user_id: String(req.user._id), date });
    // update total
    updatedTotal === 0 ? await _card.deleteMonthRecord({ monthId }) : void 0;

    await _card.updateDailyCardTotalAmmount({
      user_id: String(req.user._id),
      date,
      updatedTotal
    });

    res.status(200).json(true);
  } catch (err) { return next(err); }
};


module.exports.deleteMonthRecord = function (req, res, next) {
  try {
    return new Promise((resolve, reject) => {
    })
      .then(result => {
        res.json(result);
      })
      .catch(err => reject(err));
  } catch (err) { return next(err); }
};

module.exports.getYearlyExpenses = function (req, res, next) {
  try {
    let { year } = Object.keys(req.body).length > 0 ? req.body : req.query;
    year = parseInt(year);

    _card
      .getFullYearCard({ user_id: String(req.user._id), year })
      .then(result => res.json(result))
      .catch(err => {
        throw err;
      });
  } catch (err) { return next(err); }
};

module.exports.getMonthlyExpenses = function (req, res, next) {
  try {
    let { month, year } =
      Object.keys(req.body).length > 0 ? req.body : req.params;
    month = parseInt(month) || 0; // todo ? parseInt("") => NaN
    year = parseInt(year) || 0;

    _card
      .getFullMonthCard({ user_id: String(req.user._id), month, year })
      .then(result => res.json(result))
      .catch(err => {
        throw err;
      });
  } catch (err) { return next(err); }
};

module.exports.getFullExpenses = async function (req, res, next) {
  try {
    let { year, month } =
      Object.keys(req.body).length > 0 ? req.body : req.query;
    year = parseInt(year);
    month = parseInt(month);

    let totalAmmount = await _card.getMonthlyTotalAmmountExpenses({
      user_id: String(req.user._id),
      year,
      month
    });

    let totalIncome = await _card.getMonthlyTotalIncomeExpenses({
      user_id: String(req.user._id),
      year,
      month
    });

    let result = await _card.updateYearlyCardExpenses({
      user_id: String(req.user._id),
      year,
      month,
      ammount: totalAmmount,
      income: totalIncome
    });

    res.status(200).json({
      result
    });
  } catch (err) { return next(err); }
};
