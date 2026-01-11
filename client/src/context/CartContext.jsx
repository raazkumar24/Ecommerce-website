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
  const [loading, setLoading] = useState(false);

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


  const addToCart = async (productId, quantity = 1) => {
  try {
    await addToCartApi({ productId, quantity });

    // THIS IS THE KEY
    await fetchCart();

    toast.success("Added to cart");
  } catch {
    toast.error("Login required");
  }
};


  // Update quantity
  const updateQuantity = async (productId, qty) => {
    if (qty < 1 || loading) return;

    try {
      setLoading(true);
      await updateCartApi({ productId, quantity: qty });
      await fetchCart();
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // Remove item
  const removeItem = async (productId) => {
    try {
      await removeCartItemApi(productId);
      await fetchCart();
      toast.success("Item removed");
    } catch {
      toast.error("Remove failed");
    }
  };

  // Total quantity (for navbar)
  const cartCount =
    cart?.products.length || 0;
    
  // Fetch cart on user change 
  useEffect(() => {
    fetchCart();
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        cart,
        fetchCart,
        updateQuantity,
        removeItem,
        cartCount,
        addToCart,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
