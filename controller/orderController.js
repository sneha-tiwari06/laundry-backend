const Order = require("../model/orderModel");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { selectedItems, selectedDate, selectedTimeSlot, address } = req.body;

    // Validate mandatory fields
    if (!selectedItems || !selectedDate || !selectedTimeSlot || !address) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Convert selectedItems to string if it's an object
    const itemsStringified = typeof selectedItems === "object" ? JSON.stringify(selectedItems) : selectedItems;

    // Save order to DB
    const newOrder = new Order({
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
