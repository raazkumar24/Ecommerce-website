import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import {
  ShoppingCart,
  ArrowLeft,
  CreditCard,
  ShieldCheck,
  Truck,
  Package,
} from "lucide-react";
import CartItem from "../components/cart/CartItem";

const Cart = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  if (!cart || cart.products.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-center px-6">
        <div className="max-w-md">
          <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8">
            <ShoppingCart className="w-10 h-10 text-gray-200" />
          </div>
          <h2 className="text-4xl font-black tracking-tighter uppercase mb-4">
            Your bag is empty
          </h2>
          <p className="text-gray-600 font-medium mb-10 leading-relaxed">
            Looks like you haven't added anything to your collection yet.
            Discover our premium products and start shopping.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="w-full bg-black text-white px-8 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-black/20 hover:bg-zinc-800 transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <ArrowLeft size={16} /> Explore Catalog
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = cart.products.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-20">
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 lg:mb-16">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Package className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                Shopping Bag
              </span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter uppercase leading-none">
              Checkout
            </h1>
          </div>
          <p className="text-gray-600 font-bold uppercase text-[10px] tracking-widest border-2 border-black pb-1">
            {cart.products.length} Items Selected
          </p>
        </header>

        <div className="lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* --- LEFT: CART ITEMS (7 COLS) --- */}
          <div className="lg:col-span-7 space-y-4 pb-32 lg:pb-0">
            {cart.products.map((item) => (
              <CartItem key={item.product._id} item={item} />
            ))}
            {/* Benefits Banner */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: <Truck size={16} />, text: "Free Shipping" },
                { icon: <ShieldCheck size={16} />, text: "Secure Payment" },
                { icon: <CreditCard size={16} />, text: "Easy EMI" },
              ].map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-50 shadow-sm"
                >
                  <div className="text-gray-600">{benefit.icon}</div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT: ORDER SUMMARY (5 COLS) --- */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 border border-gray-50 shadow-xl shadow-gray-200/40">
              <h3 className="text-xl font-black tracking-tighter uppercase mb-8 pb-4 border-b border-gray-50">
                Order Summary
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm font-medium text-gray-600">
                  <span className="uppercase tracking-widest text-[10px] font-black">
                    Subtotal
                  </span>
                  <span className="font-bold text-black">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-medium text-gray-600">
                  <span className="uppercase tracking-widest text-[10px] font-black">
                    Estimated Tax
                  </span>
                  <span className="font-bold text-black">₹0</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-gray-600">
                  <span className="uppercase tracking-widest text-[10px] font-black">
                    Shipping
                  </span>
                  <span className="font-bold text-emerald-600 uppercase text-[10px]">
                    Free
                  </span>
                </div>
              </div>

              <div className="border-t border-black pt-6 flex justify-between items-end mb-10">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">
                    Total Amount
                  </p>
                  <p className="text-4xl font-black tracking-tighter mt-1">
                    ₹{totalPrice.toLocaleString()}
                  </p>
                </div>
              </div>

              <button className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-black/20 hover:bg-zinc-800 transition-all active:scale-95 mb-4">
                Proceed to Checkout
              </button>

              <Link
                to="/products"
                className="block text-center text-[10px] font-black uppercase tracking-widest text-gray-600 hover:text-black transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* --- MOBILE FLOATING ACTION BAR --- */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-2xl border-t border-gray-100 p-6 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-gray-600 tracking-tighter">
              Subtotal
            </span>
            <span className="text-2xl font-black leading-none mt-1">
              ₹{totalPrice.toLocaleString()}
            </span>
          </div>
          <button className="flex-1 bg-black text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl active:scale-95 transition-transform">
            Checkout Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
