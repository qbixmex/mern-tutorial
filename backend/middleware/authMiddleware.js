const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

const protect = asyncHandler(async (request, response, next) => {
    let token;

    if (request.headers.authorization && request.headers.authorization.startsWith("Bearer")) {
        try {
            // Get Token from header
            token = request.headers.authorization.split(" ")[1];

            // Verify
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            request.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            console.log( error );
            response.status(401);
            throw new Error("Not Authorized");
        }
    }

    if (!token) {
        response.status(401);
        throw new Error("Not authorized to see this resource!");
    }
});

module.exports = { protect };