const express = require("express");

const {
    createMessage,
    getMessages,
    deleteMessage
} = require("../controllers/contactController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// Public route
// Visitors can send messages.
router.post("/", createMessage);


// Protected routes
// Only authenticated admin can access these.
router.get("/", protect, getMessages);

router.delete("/:id", protect, deleteMessage);


module.exports = router;