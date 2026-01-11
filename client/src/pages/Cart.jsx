import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Plus, Minus, X, ArrowLeft } from "lucide-react";

// API base URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

const Cart = () => {
  const { cart, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  if (!cart || cart.products.length === 0) {
    return (
      <div className="min-h-screen bg-white py-8 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8 bg-black/5 rounded-2xl flex items-center justify-center">
            <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 text-black/30" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-3 sm:mb-4">Your cart is empty</h2>
          <p className="text-base sm:text-lg text-black/60 mb-6 sm:mb-8 max-w-md mx-auto px-4">
            Looks like you haven't added anything to your cart yet.
          </p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-black text-white rounded-xl font-semibold hover:bg-black/90 transition-all duration-200 shadow-lg hover:shadow-black/30 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = cart.products.reduce(
    (sum, item) => sum + (item.product.price || 0) * (item.quantity || 0),
    0
  );

  const handleProductClick = (productId, e) => {
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
    <div className="min-h-screen bg-white py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Header */}
        <div className="lg:hidden mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-black/70 hover:text-black"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </button>
            <div className="flex items-center gap-2 bg-black/5 px-4 py-2 rounded-full">
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm font-semibold">{cart.products.length} items</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-black">Shopping Cart</h1>
          <p className="text-black/60 text-sm mt-1">Review your items</p>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-black mb-2">
            Shopping Cart
          </h1>
          <p className="text-xl text-black/60">
            Review your items and proceed to checkout.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8 xl:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 mb-8 lg:mb-0">
            {cart.products.map((item) => (
              <div
                key={item.product._id}
                onClick={(e) => handleProductClick(item.product._id, e)}
                className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 border border-black/10 rounded-2xl hover:shadow-xl hover:border-black/20 transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-white"
              >
                {/* Image - Mobile Layout */}
                <div className="flex items-start gap-4 sm:hidden">
                  <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-black/5 group-hover:bg-black/10 transition-colors">
                    <img
                      src={`${API_URL}${item.product.images?.[0]}`}
                      alt={item.product.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "/placeholder-image.jpg";
                      }}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-black mb-1 line-clamp-2 group-hover:text-black/90">
                      {item.product.name}
                    </h3>
                    <p className="text-lg font-bold text-black mb-3">
                      ₹{item.product.price?.toLocaleString() || 0}
                    </p>
                    
                    {/* Quantity Controls - Mobile */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (item.quantity > 1) {
                              updateQuantity(item.product._id, item.quantity - 1);
                            }
                          }}
                          disabled={item.quantity <= 1}
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-black/5 hover:bg-black/10 border border-black/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4 text-black" />
                        </button>

                        <span className="w-8 text-center text-lg font-bold text-black">
                          {item.quantity}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateQuantity(item.product._id, item.quantity + 1);
                          }}
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-black hover:bg-black/90 text-white border border-black shadow-sm hover:shadow-black/30 transition-all duration-200"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(item.product._id);
                        }}
                        className="text-black/70 hover:text-black hover:bg-black/5 p-2 rounded-lg transition-colors"
                        aria-label={`Remove ${item.product.name} from cart`}
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Image - Desktop Layout */}
                <div className="hidden sm:block relative w-24 lg:w-32 shrink-0 aspect-square rounded-xl overflow-hidden bg-black/5 group-hover:bg-black/10 transition-colors">
                  <img
                    src={`${API_URL}${item.product.images?.[0]}`}
                    alt={item.product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "/placeholder-image.jpg";
                    }}
                  />
                </div>

                {/* Details - Desktop */}
                <div className="hidden sm:block flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-black mb-2 line-clamp-2 group-hover:text-black/90 transition-colors">
                    {item.product.name}
                  </h3>
                  <p className="text-lg font-bold text-black">
                    ₹{item.product.price?.toLocaleString() || 0}
                  </p>
                </div>

                {/* Quantity Controls - Desktop */}
                <div className="hidden sm:flex items-center justify-center gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
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
                      e.stopPropagation();
                      updateQuantity(item.product._id, item.quantity + 1);
                    }}
                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-black hover:bg-black/90 text-white border border-black shadow-sm hover:shadow-black/30 transition-all duration-200 hover:scale-105"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {/* Price & Remove - Desktop */}
                <div className="hidden sm:flex flex-col items-end gap-2 lg:gap-4">
                  <p className="text-2xl font-bold text-black">
                    ₹{((item.product.price || 0) * (item.quantity || 0)).toLocaleString()}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
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

                {/* Total Price - Mobile (Bottom Row) */}
                <div className="sm:hidden flex items-center justify-between pt-4 border-t border-black/10">
                  <span className="text-sm text-black/60">Total:</span>
                  <span className="text-xl font-bold text-black">
                    ₹{((item.product.price || 0) * (item.quantity || 0)).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-6">
            <div className="bg-gradient-to-br from-white to-black/5 border border-black/10 rounded-2xl p-6 sm:p-8 shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-black mb-6 sm:mb-8 text-center">
                Order Summary
              </h3>
              
              <div className="space-y-4 mb-6 sm:mb-8">
                <div className="flex justify-between">
                  <span className="text-black/70 font-medium text-sm sm:text-base">Items</span>
                  <span className="font-bold text-black text-sm sm:text-base">
                    {cart.products.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/70 font-medium text-sm sm:text-base">Subtotal</span>
                  <span className="font-bold text-black text-sm sm:text-base">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/70 font-medium text-sm sm:text-base">Shipping</span>
                  <span className="font-semibold text-green-600 text-sm sm:text-base">FREE</span>
                </div>
                <div className="h-px bg-black/10 my-3 sm:my-4"></div>
                <div className="flex justify-between text-lg sm:text-xl lg:text-2xl font-bold text-black">
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="text-xs sm:text-sm text-black/50 text-center">
                  (Inclusive of all taxes)
                </div>
              </div>

              {/* Mobile Checkout Button - Sticky at bottom */}
              <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-black/10 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                  <div>
                    <div className="text-sm text-black/60">Total Amount</div>
                    <div className="text-xl font-bold text-black">₹{totalPrice.toLocaleString()}</div>
                  </div>
                  <button className="bg-black hover:bg-black/90 text-white py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg hover:shadow-black/30">
                    Checkout
                  </button>
                </div>
              </div>

              {/* Desktop Checkout Button */}
              <div className="hidden lg:block space-y-4">
                <button className="w-full bg-gradient-to-r from-black to-black/90 hover:from-black/90 hover:to-black text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-xl hover:shadow-black/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
                  Proceed to Checkout
                </button>

                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 text-sm font-bold">✓</span>
                    </div>
                    <span className="text-xs text-black/60">Secure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-bold">↺</span>
                    </div>
                    <span className="text-xs text-black/60">30-Day Returns</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Shopping - Desktop */}
            <button
              onClick={() => navigate("/")}
              className="hidden lg:flex items-center justify-center gap-2 w-full mt-6 text-black/70 hover:text-black hover:bg-black/5 py-3 rounded-xl font-medium transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </button>
          </div>
        </div>

        {/* Mobile Continue Shopping */}
        <div className="lg:hidden mt-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 w-full border border-black/20 hover:border-black/40 text-black hover:text-black/90 py-3 rounded-xl font-medium transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;