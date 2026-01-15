import { Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  const { product, quantity } = item;

  const handleNavigate = (e) => {
    // Prevent navigation if clicking buttons
    if (e.target.closest("button")) return;
    navigate(`/product/${product._id}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="group relative cursor-pointer bg-white border border-gray-100 rounded-4xl p-4 sm:p-5 hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-500"
    >
      <div className="flex items-center gap-4 sm:gap-6">
        {/* --- PRODUCT IMAGE --- */}
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-3xl overflow-hidden bg-[#F8F8F8] shrink-0">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-contain p-2" //grayscale group-hover:grayscale-0 transition-all duration-700 (if needed)
          />
        </div>

        {/* --- INFO CONTAINER --- */}
        <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-600">
              {product.brand || "Originals"}
            </p>
            <h3 className="text-base sm:text-lg font-bold text-black leading-tight line-clamp-1">
              {product.name}
            </h3>
            <p className="text-sm font-bold text-gray-600">
              ₹{product.price?.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
            {/* --- QUANTITY CONTROLS --- */}
            <div className="flex items-center bg-gray-50 p-1 rounded-2xl border border-gray-100">
              <QtyButton
                disabled={quantity <= 1}
                onClick={() => updateQuantity(product._id, quantity - 1)}
              >
                <Minus size={14} />
              </QtyButton>

              <span className="w-8 text-center font-black text-sm">{quantity}</span>

              <QtyButton
                onClick={() => updateQuantity(product._id, quantity + 1)}
                isPrimary
              >
                <Plus size={14} />
              </QtyButton>
            </div>

            {/* --- PRICE & REMOVE --- */}
            <div className="text-right flex flex-col items-end">
              <p className="text-lg font-black tracking-tighter">
                ₹{(product.price * quantity).toLocaleString()}
              </p>
              <button
                onClick={() => removeItem(product._id)}
                className="mt-1 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors"
              >
                <Trash2 size={12} />
                <span className="hidden sm:inline">Remove</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- Refined Quantity Button using standard Tailwind --- */
const QtyButton = ({ children, isPrimary, ...props }) => (
  <button
    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all shadow-sm active:scale-90
      ${
        isPrimary
          ? "bg-black text-white shadow-black/10 hover:bg-zinc-800"
          : "bg-white text-black hover:bg-gray-100 border border-gray-100"
      }
      disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100
    `}
    {...props}
  >
    {children}
  </button>
);

export default CartItem;