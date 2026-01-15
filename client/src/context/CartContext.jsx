import { createContext, useContext, useEffect, useState } from "react";
import {
  getCartApi,
  updateCartApi,
  removeCartItemApi,
  addToCartApi,
} from "../services/api";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState(null);

  // Fetch cart
  const fetchCart = async () => {
    if (!user) {
      setCart(null);
      return;
    }

    try {
      const { data } = await getCartApi();
      setCart(data);
    } catch {
      setCart(null);
    }
  };

  // Add to cart (server-first is OK here)
  const addToCart = async (productId, quantity = 1) => {
    try {
      await addToCartApi({ productId, quantity });
      await fetchCart();
      toast.success("Added to cart");
    } catch {
      toast.error("Login required");
    }
  };

  // ✅ Optimistic quantity update
  const updateQuantity = async (productId, qty) => {
    if (qty < 1) return;

    const previousCart = cart;

    setCart((prev) => ({
      ...prev,
      products: prev.products.map((item) =>
        item.product._id === productId
          ? { ...item, quantity: qty }
          : item
      ),
    }));

    try {
      await updateCartApi({ productId, quantity: qty });
    } catch {
      toast.error("Update failed");
      setCart(previousCart); // rollback
    }
  };

  // ✅ Optimistic remove
  const removeItem = async (productId) => {
    const previousCart = cart;

    setCart((prev) => ({
      ...prev,
      products: prev.products.filter(
        (item) => item.product._id !== productId
      ),
    }));

    try {
      await removeCartItemApi(productId);
      toast.success("Item removed");
    } catch {
      toast.error("Remove failed");
      setCart(previousCart); // rollback
    }
  };

  // ✅ Correct cart count
  const cartCount =
    cart?.products.reduce((sum, item) => sum + item.quantity, 0) || 0;

  useEffect(() => {
    fetchCart();
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        cart,
        fetchCart,
        addToCart,
        updateQuantity,
        removeItem,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
