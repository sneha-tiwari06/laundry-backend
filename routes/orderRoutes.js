const express = require("express");
const { createOrder } = require("../controller/orderController");

const router = express.Router();

// POST request to place an order
router.post("/create", createOrder);

module.exports = router;
