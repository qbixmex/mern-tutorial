const express = require("express");
const router = express.Router();

// List
router.get("/", (request, response) => {
    response.status(200).json({ message: "All Goals" });
});

// Show
router.get("/:id", (request, response) => {
    response.status(200).json({ message: `Get Goal with id: (${request.params.id})` });
});

// Create
router.post("/", (request, response) => {
    response.status(200).json({ message: "Create a Goal" });
});

// Update
router.patch("/:id", (request, response) => {
    response.status(200).json({ message: `Update Goal with id: (${request.params.id})` });
});

// Delete
router.delete("/:id", (request, response) => {
    response.status(200).json({ message: `Delete Goal with id: (${request.params.id})` });
});

module.exports = router;
