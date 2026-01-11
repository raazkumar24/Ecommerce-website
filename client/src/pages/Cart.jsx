import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Plus, Minus, X, ArrowLeft, Home, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

// API base URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

const Cart = () => {
  const { cart, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!cart || cart.products.length === 0) {
    return (
      <div className="min-h-screen bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8 bg-black/5 rounded-2xl flex items-center justify-center">
            <ShoppingCart className="w-10 h-10 sm:w-12 sm:h-12 text-black/30" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-3 sm:mb-4">Your cart is empty</h2>
          <p className="text-base sm:text-lg text-black/60 mb-6 sm:mb-8 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet.
          </p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-black text-white rounded-xl font-semibold hover:bg-black/90 transition-all duration-200 shadow-lg hover:shadow-black/30 w-full sm:w-auto"
          >
            <Home className="w-5 h-5" />
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // Calculate total price of the cart
  const totalPrice = cart.products.reduce(
    (sum, item) => sum + (item.product.price || 0) * (item.quantity || 0),
    0
  );

  // Handle product click
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

  // Mobile remove handler
  const handleMobileRemove = (e, productId) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to remove this item?")) {
      removeItem(productId);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-8 sm:pb-12">
      {/* Mobile Header */}
      {isMobile && (
        <div className="sticky top-0 z-10 bg-white border-b border-black/10 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-black hover:text-black/70 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h1 className="text-lg font-bold text-black">Cart ({cart.products.length})</h1>
          <div className="w-10"></div> {/* Spacer for balance */}
        </div>
      )}

      {/* Desktop Header */}
      {!isMobile && (
        <div className="pt-8 px-6 lg:px-8 mb-6 lg:mb-12">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 text-black hover:text-black/70 transition-colors mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Shopping
            </button>
            <h1 className="text-3xl lg:text-4xl font-bold text-black mb-2">
              Shopping Cart ({cart.products.length})
            </h1>
            <p className="text-xl text-black/60">
              Review your items and proceed to checkout.
            </p>
          </div>
        </div>
      )}

      <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8 xl:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6 mb-8 lg:mb-0">
              {cart.products.map((item) => (
                <div
                  key={item.product._id}
                  onClick={(e) => handleProductClick(item.product._id, e)}
                  className="group bg-white border border-black/10 rounded-xl sm:rounded-2xl hover:shadow-lg sm:hover:shadow-xl hover:border-black/20 transition-all duration-300 hover:sm:-translate-y-0.5 cursor-pointer overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-4 sm:p-6">
                    {/* Image - Mobile top, Desktop left */}
                    <div className="relative w-full sm:w-32 sm:shrink-0 aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-black/5 group-hover:bg-black/10 transition-colors">
                      <img
                        src={`${API_URL}${item.product.images?.[0]}`}
                        alt={item.product.name}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 p-2"
                        onError={(e) => {
                          e.target.src = "/placeholder-image.jpg"; 
                        }}
                      />
                      
                      {/* Mobile Remove Button */}
                      {isMobile && (
                        <button
                          onClick={(e) => handleMobileRemove(e, item.product._id)}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 p-2 rounded-full shadow-lg z-10"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-4 h-4 text-white" />
                        </button>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-4 mb-2">
                        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-black line-clamp-2 group-hover:text-black/90 transition-colors flex-1">
                          {item.product.name}
                        </h3>
                        {/* Desktop Remove Button */}
                        {!isMobile && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeItem(item.product._id);
                            }}
                            className="text-black/50 hover:text-black hover:bg-black/5 p-2 rounded-lg transition-colors shrink-0"
                            aria-label={`Remove ${item.product.name} from cart`}
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                      
                      <p className="text-lg sm:text-xl font-bold text-black mb-3 sm:mb-4">
                        ₹{item.product.price?.toLocaleString() || 0}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between sm:justify-start gap-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (item.quantity > 1) {
                                updateQuantity(item.product._id, item.quantity - 1);
                              }
                            }}
                            disabled={item.quantity <= 1}
                            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl bg-black/5 hover:bg-black/10 border border-black/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                          </button>

                          <span className="w-8 sm:w-12 text-center text-lg sm:text-xl font-bold text-black">
                            {item.quantity}
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateQuantity(item.product._id, item.quantity + 1);
                            }}
                            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl bg-black hover:bg-black/90 text-white border border-black shadow-sm hover:shadow-black/30 transition-all duration-200 active:scale-95"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>

                        {/* Mobile Total Price */}
                        {isMobile && (
                          <div className="text-right">
                            <p className="text-xl font-bold text-black">
                              ₹{((item.product.price || 0) * (item.quantity || 0)).toLocaleString()}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Desktop Total Price */}
                    {!isMobile && (
                      <div className="flex flex-col items-end gap-4 min-w-24">
                        <p className="text-2xl font-bold text-black">
                          ₹{((item.product.price || 0) * (item.quantity || 0)).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-24">
              <div className="bg-black/5 border border-black/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-4 sm:mb-6 lg:mb-8 text-center">
                  Order Summary
                </h3>
                
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="flex justify-between text-base sm:text-lg">
                    <span className="text-black/70 font-medium">Subtotal</span>
                    <span className="font-bold text-black">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-base sm:text-lg">
                    <span className="text-black/70 font-medium">Shipping</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="h-px bg-black/10 my-3 sm:my-4"></div>
                  <div className="flex justify-between text-xl sm:text-2xl lg:text-3xl font-bold text-black">
                    <span>Total</span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-black hover:bg-black/90 text-white py-3 sm:py-4 px-6 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg shadow-xl hover:shadow-black/40 transition-all duration-300 active:scale-[0.98]"
                >
                  Proceed to Checkout
                </button>

                {/* Continue Shopping on Mobile */}
                {isMobile && (
                  <button
                    onClick={() => navigate("/")}
                    className="w-full mt-4 border-2 border-black text-black py-3 rounded-lg font-semibold hover:bg-black hover:text-white transition-all duration-300 active:scale-[0.98]"
                  >
                    Continue Shopping
                  </button>
                )}

                <p className="text-center text-xs text-black/50 mt-4 sm:mt-6">
                  Secure checkout • Money back guarantee
                </p>
              </div>

              {/* Mobile Cart Actions */}
              {isMobile && (
                <div className="mt-6 bg-black/5 border border-black/10 rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="text-center">
                      <p className="font-semibold text-black mb-1">Items</p>
                      <p className="text-xl font-bold text-black">{cart.products.length}</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-black mb-1">Total</p>
                      <p className="text-xl font-bold text-black">₹{totalPrice.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobile && cart.products.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-black/10 shadow-2xl p-4 z-20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-black/70">Total</p>
              <p className="text-xl font-bold text-black">₹{totalPrice.toLocaleString()}</p>
            </div>
            <button 
              onClick={() => navigate("/checkout")}
              className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-black/90 transition-colors flex-1 max-w-48"
            >
              Checkout Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;