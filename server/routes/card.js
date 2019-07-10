const express = require("express");
const router = express.Router();

const card = require("../controllers/card/card");

router.get("/addDailyExpenses", card.addDayExpense);
router.post("/addDailyExpenses", card.addDayExpense);

router.get("/getFullExpenses", card.getFullExpenses);
router.post("/getFullExpenses", card.getFullExpenses);


module.exports = router;