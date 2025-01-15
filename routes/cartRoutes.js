const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const authMiddleware = require("../middleware/authMiddleware");

// POST /cart
router.post("/", authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    const productIndex = cart.items.findIndex((item) => item.productId == productId);
    if (productIndex >= 0) {
      cart.items[productIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE /cart/:id
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.productId != req.params.id);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
