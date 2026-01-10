import Cart from "../models/Cart.js";

// ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        products: [{ product: productId, quantity }],
      });
    } else {
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER CART
export const getUserCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate(
      "products.product"
    );

    if (!cart) {
      return res.json({ products: [] });
    }

    // 🔑 REMOVE NULL PRODUCTS
    cart.products = cart.products.filter(
      (item) => item.product !== null
    );

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE CART ITEM (INCREASE / DECREASE)
export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.products.find(
      (p) => p.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;

    if (item.quantity <= 0) {
      cart.products = cart.products.filter(
        (p) => p.product.toString() !== productId
      );
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// REMOVE ITEM
export const removeCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    cart.products = cart.products.filter(
      (p) => p.product.toString() !== req.params.productId
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CLEAR CART
export const clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
