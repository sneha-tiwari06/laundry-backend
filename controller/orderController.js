const Order = require("../model/orderModel");
const { authMiddleware } = require("../middleware/auth");

exports.createOrder = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    const { selectedItems, selectedDate, selectedTimeSlot, address } = req.body;

    if (!selectedItems || !selectedDate || !selectedTimeSlot || !address) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const itemsStringified = typeof selectedItems === "object" ? JSON.stringify(selectedItems) : selectedItems;

    const newOrder = new Order({
      userId: req.user.userId,  // Associate order with user
      selectedItems: itemsStringified,
      selectedDate,
      selectedTimeSlot,
      address,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });

  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
