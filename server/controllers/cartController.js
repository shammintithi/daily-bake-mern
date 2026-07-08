import Cart from "../models/Cart.js";
import Product from "../models/Products.js";

// Add To Cart
export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    // Check Product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Find User Cart
    let cart = await Cart.findOne({
      user: req.user._id,
    });

    // Create Cart if not exists
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
      });
    }

    // Check Product Already Exists
    const itemIndex = cart.items.findIndex(
      (item) =>
        item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({
        product: productId,
        quantity: 1,
      });
    }

    await cart.save();

    res.status(200).json({
      message: "Product added to cart",
      cart,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get User Cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate(
      "items.product",
      "name price image category"
    );

    if (!cart) {
      return res.status(200).json({
        items: [],
      });
    }

    res.status(200).json(cart);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Cart Quantity
export const updateCartQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    item.quantity = quantity;

    await cart.save();

    res.status(200).json({
      message: "Cart updated successfully",
      cart,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};