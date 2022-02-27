const express = require("express");
const router = express.Router();
const {
    getGoals,
    getGoal,
    createGoal,
    updateGoal,
    deleteGoal
} = require("../controllers/goalController");

router.route("/")
    .get(getGoals)
    .post(createGoal);

router.route("/:id")
    .get(getGoal)
    .patch(updateGoal)
    .delete(deleteGoal);

module.exports = router;
