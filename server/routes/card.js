const express = require("express");
const router = express.Router();

const card = require("../controllers/card/card");
const isUserLogIn = require("../middleware/isUserLogIn");

router.get("/", (req, res, next) => {
  res.send("test, hello")
});


router.get("/addDailyExpenses", isUserLogIn, card.addDayExpense);
router.post("/addDailyExpenses", isUserLogIn, card.addDayExpense);

router.get("/getFullExpenses", isUserLogIn, card.getFullExpenses);
router.post("/getFullExpenses", isUserLogIn, card.getFullExpenses);

router.get("/getYearlyExpenses", isUserLogIn, card.getYearlyExpenses);
router.post("/getYearlyExpenses", isUserLogIn, card.getYearlyExpenses);

router.get("/getMonthlyExpenses", isUserLogIn, card.getMonthlyExpenses);
router.post("/getMonthlyExpenses", isUserLogIn, card.getMonthlyExpenses);

router.get("/deleteCardRecord", isUserLogIn, card.deleteCardRecord);
router.post("/deleteCardRecord", isUserLogIn, card.deleteCardRecord);

module.exports = router;