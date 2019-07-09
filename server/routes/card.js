const express = require("express");
const router = express.Router();

const card = require("../controllers/card/card");

router.get("/addDailyExpenses", card.addDayExpense);
router.post("/addDailyExpenses", card.addDayExpense);

router.get("/getYearlyExpenses", card.getYearlyExpenses);
router.post("/getYearlyExpenses", card.getYearlyExpenses);

module.exports = router;