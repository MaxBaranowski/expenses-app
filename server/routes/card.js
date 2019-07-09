const express = require("express");
const router = express.Router();

const card = require("../controllers/card/card");

router.get("/addDailyExpenses", card.addDayExpense);
router.post("/addDailyExpenses", card.addDayExpense);

router.get("/getMonthlyExpenses", card.getMonthExpenses);
router.post("/getMonthlyExpenses", card.getMonthExpenses);

module.exports = router;