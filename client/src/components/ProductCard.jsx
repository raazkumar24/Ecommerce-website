import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowUpRight, ShoppingCart } from "lucide-react";

const ProductCard = ({ product, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const animationDelay = `${(index % 8) * 100}ms`;

  return (
    <Link
      to={`/product/${product._id}`}
      className="group block h-full animate-in fade-in slide-in-from-bottom duration-700 ease-out"
      style={{ animationDelay }}
    >
      <div className="relative h-full bg-white rounded-4xl p-3 pb-5 border-2 border-gray-100 shadow-sm hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1.5 transition-all duration-500 flex flex-col">
        
        {/* --- STATUS BADGES --- */}
        <div className="absolute top-5 left-5 z-20 flex flex-col gap-1.5">
          {product.discount && (
            <span className="bg-black text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest shadow-sm">
              -{product.discount}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-white border border-gray-100 text-black text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest shadow-sm">
              New
            </span>
          )}
        </div>

        {/* --- IMAGE AREA (Compact Portrait) --- */}
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#f9f9f9] mb-4">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 animate-pulse bg-gray-200" />
          )}

          <img
            src={imageError || !product.images?.[0] ? "/placeholder.jpg" : product.images[0]}
            alt={product.name}
            className={`w-full h-full object-contain p-4 transition-all duration-1000 group-hover:scale-105 grayscale-[0.3] group-hover:grayscale-0 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => { setImageError(true); setImageLoaded(true); }}
          />

          {/* Centered Glass Button on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/5 backdrop-blur-[1px]">
             <div className="bg-white/90 p-3 rounded-full shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-500">
                <ShoppingCart className="w-4 h-4 text-black" />
             </div>
          </div>
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="px-1 flex flex-col flex-1">
          {/* Metadata */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest truncate max-w-[60%]">
              {product.brand || "Collection"}
            </span>
            <span className="text-[9px] font-bold text-gray-400 capitalize">
              {product.category?.name || "General"}
            </span>
          </div>

          {/* Product Name - Balanced Size */}
          <h3 className="text-base font-semibold text-gray-900 leading-tight mb-3 h-10 line-clamp-2 overflow-hidden">
            {product.name}
          </h3>

          {/* Footer - Price & CTA */}
          <div className="mt-auto pt-3 border-t border-gray-50 flex items-end justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 mb-1">
                <div className={`w-1 h-1 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-[10px] font-medium text-gray-500 uppercase tracking-tighter">
                  {product.stock > 0 ? 'In Stock' : 'Sold Out'}
                </span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-black text-black tracking-tight">
                  ₹{product.price?.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-[10px] text-gray-300 line-through font-medium">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Compact Action Button */}
            <div className="w-9 h-9 bg-black text-white rounded-xl flex items-center justify-center transition-all duration-500 group-hover:rounded-full group-hover:bg-gray-800 shadow-lg shadow-black/5">
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;