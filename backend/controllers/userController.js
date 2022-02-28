const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * Get Users
 * @route GET /app/users
 * @access Private
 */
const getUsers = asyncHandler( async (request, response) => {
    const users = await User.find({ user: request.user.id });
    response.status(200).json(users);
});

/**
 * Get User
 * @route GET /app/users/me
 * @access Public
 */
const getUser = asyncHandler( async (request, response) => {
    const { _id, name, email } = await User.findById(request.user.id);
    response.status(200).json({ _id, name, email });
});

/**
 * Register User
 * @route POST /app/users
 * @access Private
 */
const registerUser = asyncHandler( async (request, response) => {
    const { name, email, password } = request.body;

    if ( !name ) {
        response.status(400);
        throw new Error("Please add your name!");
    }

    if ( !email ) {
        response.status(400);
        throw new Error("Please add your email!");
    }

    if ( !password ) {
        response.status(400);
        throw new Error("Please add your password!");
    }

    // check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        response.status(400);
        throw new Error("User already exists!");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    if (user) {
        response.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        response.status(400);
        throw new Error("Invalid user data");
    }
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

    if ( request.body.name == "" ) {
        response.status(400);
        throw new Error("Name can not be empty");
    }

    if ( request.body.email == "" ) {
        response.status(400);
        throw new Error("Email can not be empty");
    }

    if ( request.body.password != "" && request.body.password != user.password  ) {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(request.body.password, salt);
        request.body.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(user.id, request.body, { new: true }).select("-password");

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

/**
 * Authenticate User
 * @route POST /app/login
 * @access Public
 */
 const loginUser = asyncHandler( async (request, response) => {
    const { email, password } = request.body; 

    if ( !email ) {
        response.status(400);
        throw new Error("Please add your email");
    }

    if ( !password ) {
        response.status(400);
        throw new Error("Please add your password");
    }
    
    
    const user = await User.findOne({ email });

    // Check
    if (user && (await bcrypt.compare(password, user.password))) {
        response.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        response.status(400);
        throw new Error("Invalid Credentials");
    }
});

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
    getUsers,
    getUser,
    registerUser,
    updateUser,
    deleteUser,
    loginUser,
};