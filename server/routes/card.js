const express = require("express");
const router = express.Router();

const card = require("../controllers/card/card");

router.get("/", (req, res, next) => {
  res.send("test, hello")
});

router.get("/addDailyExpenses", card.addDayExpense);
router.post("/addDailyExpenses", card.addDayExpense);

router.get("/getFullExpenses", card.getFullExpenses);
router.post("/getFullExpenses", card.getFullExpenses);

router.get("/getYearlyExpenses", card.getYearlyExpenses);
router.post("/getYearlyExpenses", card.getYearlyExpenses);

router.get("/getMonthlyExpenses", card.getMonthlyExpenses);
router.post("/getMonthlyExpenses", card.getMonthlyExpenses);

router.get("/deleteCardRecord", card.deleteCardRecord);
router.post("/deleteCardRecord", card.deleteCardRecord);

module.exports = router;