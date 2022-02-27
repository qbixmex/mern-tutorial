/**
 * Get Goals
 * @route GET /app/goals
 * @access Private
 */
const getGoals = (request, response) => {
    response.status(200).json({ message: "All Goals" });
};

/**
 * Get Goal
 * @route GET /app/goals/:id
 * @access Private
 */
const getGoal = (request, response) => {
    response.status(200).json({ message: `Get Goal with id: (${request.params.id})` });
};

/**
 * Create Goal
 * @route POST /app/goals
 * @access Private
 */
const createGoal = (request, response) => {
    if ( !request.body.text ) {
        response.status(400);
        throw new Error("Please add a text field!");
    }
    response.status(200).json({ message: "Create a Goal" });
};

/**
 * Update Goal
 * @route PATCH /app/goals/:id
 * @access Private
 */
const updateGoal = (request, response) => {
    response.status(200).json({ message: `Update Goal with id: (${request.params.id})` });
};

/**
 * Delete Goal
 * @route DELETE /app/goals/:id
 * @access Private
 */
const deleteGoal = (request, response) => {
    response.status(200).json({ message: `Delete Goal with id: (${request.params.id})` });
};

module.exports = {
    getGoals,
    getGoal,
    createGoal,
    updateGoal,
    deleteGoal,
};