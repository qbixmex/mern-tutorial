const express = require("express");
const router = express.Router();
const {
    getUsers,
    getUser,
    registerUser,
    updateUser,
    deleteUser,
    loginUser
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getUsers).post(protect, registerUser);
router.route("/:id").patch(protect, updateUser).delete(protect, deleteUser);
router.get("/me", protect, getUser);
router.post("/login", loginUser);

module.exports = router;
