const asyncHandler = require("express-async-handler");
const Goal = require("../models/GoalModel");

/**
 * Get Goals
 * @route GET /app/goals
 * @access Private
 */
const getGoals = asyncHandler( async (request, response) => {
    const goals = await Goal.find();
    response.status(200).json(goals);
});

/**
 * Get Goal
 * @route GET /app/goals/:id
 * @access Private
 */
const getGoal = asyncHandler( async (request, response) => {
    const goal = await Goal.findById(request.params.id);

    if (!goal) {
        response.status(400);
        throw new Error("Goal not found!");
    }

    response.status(200).json(goal);
});

/**
 * Create Goal
 * @route POST /app/goals
 * @access Private
 */
const createGoal = asyncHandler( async (request, response) => {
    if ( !request.body.text ) {
        response.status(400);
        throw new Error("Please add a text field!");
    }

    const goal = await Goal.create({ text: request.body.text });

    response.status(200).json(goal);
});

/**
 * Update Goal
 * @route PATCH /app/goals/:id
 * @access Private
 */
const updateGoal = asyncHandler( async (request, response) => {
    const goal = await Goal.findById(request.params.id);

    if (!goal) {
        response.status(400);
        throw new Error("Goal not found!");
    }

    if ( !request.body.text ) {
        response.status(400);
        throw new Error("Please add a text field!");
    }

    const updatedGoal = await Goal.findByIdAndUpdate(goal.id, request.body, { new: true });

    response.status(200).json(updatedGoal);
});

/**
 * Delete Goal
 * @route DELETE /app/goals/:id
 * @access Private
 */
const deleteGoal = asyncHandler( async (request, response) => {
    const goal = await Goal.findById(request.params.id);

    if (!goal) {
        response.status(400);
        throw new Error("Goal not found!");
    }

    await goal.remove();

    response.status(200).json({ id: goal.id });
});

module.exports = {
    getGoals,
    getGoal,
    createGoal,
    updateGoal,
    deleteGoal,
};