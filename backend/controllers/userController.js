const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

/**
 * Get Users
 * @route GET /app/users
 * @access Private
 */
const getUsers = asyncHandler( async (request, response) => {
    const users = await User.find();
    response.status(200).json(users);
});

/**
 * Get User
 * @route GET /app/users/:id
 * @access Private
 */
const getUser = asyncHandler( async (request, response) => {
    const user = await User.findById(request.params.id);

    if (!user) {
        response.status(400);
        throw new Error("User not found!");
    }

    response.status(200).json(user);
});

/**
 * Create User
 * @route POST /app/users
 * @access Private
 */
const createUser = asyncHandler( async (request, response) => {
    if ( !request.body.firstName ) {
        response.status(400);
        throw new Error("Please add your first name");
    }

    if ( !request.body.lastName ) {
        response.status(400);
        throw new Error("Please add your last name");
    }

    if ( !request.body.email ) {
        response.status(400);
        throw new Error("Please add your email");
    }

    const user = await User.create({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
    });

    response.status(200).json(user);
});

/**
 * Update User
 * @route PATCH /app/user/:id
 * @access Private
 */
const updateUser = asyncHandler( async (request, response) => {
    const user = await User.findById(request.params.id);

    if (!user) {
        response.status(400);
        throw new Error("User not found!");
    }

    if ( !request.body.firstName ) {
        response.status(400);
        throw new Error("Please add your first name");
    }

    if ( !request.body.lastName ) {
        response.status(400);
        throw new Error("Please add your last name");
    }

    if ( !request.body.email ) {
        response.status(400);
        throw new Error("Please add your email");
    }

    const updatedUser = await User.findByIdAndUpdate(user.id, request.body, { new: true });

    response.status(200).json(updatedUser);
});

/**
 * Delete User
 * @route DELETE /app/users/:id
 * @access Private
 */
const deleteUser = asyncHandler( async (request, response) => {
    const user = await User.findById(request.params.id);

    if (!user) {
        response.status(400);
        throw new Error("User not found!");
    }

    await user.remove();

    response.status(200).json({ id: user.id });
});

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};