import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom"; // Add this import
import { Search, ShoppingCart, Plus, Minus, X } from "lucide-react";

// API base URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

const Cart = () => {
  const { cart, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate(); // Initialize navigate

  if (!cart || cart.products.length === 0) {
    return (
      <div className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-8 bg-black/5 rounded-2xl flex items-center justify-center">
            <span className="text-3xl">
              <ShoppingCart className="w-12 h-12 text-black/30" />
            </span>
          </div>
          <h2 className="text-3xl font-bold text-black mb-4">Your cart is empty</h2>
          <p className="text-lg text-black/60 mb-8 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-black/90 transition-all duration-200 shadow-lg hover:shadow-black/30"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  {/* Calculate total price of the cart */}
  const totalPrice = cart.products.reduce(
    (sum, item) => sum + (item.product.price || 0) * (item.quantity || 0),
    0
  );

  // Handle product click
  const handleProductClick = (productId, e) => {
    // Don't navigate if the click was on a button (quantity controls or remove button)
    if (
      e.target.closest('button') || 
      e.target.tagName === 'BUTTON' ||
      e.target.closest('button[aria-label*="quantity"]') ||
      e.target.closest('button[aria-label*="Remove"]')
    ) {
      return;
    }
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-black mb-2">
            Shopping Cart
          </h1>
          <p className="text-xl text-black/60">
            Review your items and proceed to checkout.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6 mb-12 lg:mb-0">
            {cart.products.map((item) => (
              <div
                key={item.product._id}
                onClick={(e) => handleProductClick(item.product._id, e)}
                className="group flex flex-col lg:flex-row lg:items-center gap-6 p-6 border border-black/10 rounded-2xl hover:shadow-xl hover:border-black/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                {/* Image */}
                <div className="relative w-full lg:w-32 lg:shrink-0 aspect-square rounded-xl overflow-hidden bg-black/5 group-hover:bg-black/10 transition-colors">
                  <img
                    src={`${API_URL}${item.product.images?.[0]}`}
                    alt={item.product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "/placeholder-image.jpg"; 
                    }}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-black mb-2 line-clamp-2 group-hover:text-black/90 transition-colors">
                    {item.product.name}
                  </h3>
                  <p className="text-lg font-bold text-black mb-4">
                    ₹{item.product.price?.toLocaleString() || 0}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-center lg:justify-end gap-3 mb-4 lg:mb-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering product click
                      if (item.quantity > 1) {
                        updateQuantity(item.product._id, item.quantity - 1);
                      }
                    }}
                    disabled={item.quantity <= 1}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-black/5 hover:bg-black/10 border border-black/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-5 h-5 text-black" />
                  </button>

                  <span className="w-12 text-center text-xl font-bold text-black">
                    {item.quantity}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering product click
                      updateQuantity(item.product._id, item.quantity + 1);
                    }}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-black hover:bg-black/90 text-white border border-black shadow-sm hover:shadow-black/30 transition-all duration-200 hover:scale-105"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {/* Price & Remove */}
                <div className="flex flex-col items-end gap-2 lg:gap-4">
                  <p className="text-2xl font-bold text-black">
                    ₹{((item.product.price || 0) * (item.quantity || 0)).toLocaleString()}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering product click
                      removeItem(item.product._id);
                    }}
                    className="text-black/70 hover:text-black group/remove hover:bg-black/5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 group/remove:hover:scale-105"
                    aria-label={`Remove ${item.product.name} from cart`}
                  >
                    <span className="group-hover/remove:hidden">Remove</span>
                    <span className="hidden group-hover/remove:inline-flex items-center gap-1">
                      <X className="w-4 h-4" /> Remove
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-black/5 border border-black/10 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-black mb-8 text-center">Order Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-lg">
                  <span className="text-black/70 font-medium">Subtotal</span>
                  <span className="font-bold text-black">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-black/70 font-medium">Shipping</span>
                  <span className="font-semibold text-black">FREE</span>
                </div>
                <div className="h-px bg-black/10 my-4"></div>
                <div className="flex justify-between text-2xl lg:text-3xl font-bold text-black">
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button className="w-full bg-black hover:bg-black/90 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-xl hover:shadow-black/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                Proceed to Checkout
              </button>

              <p className="text-center text-xs text-black/50 mt-4">
                Secure checkout • Money back guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;