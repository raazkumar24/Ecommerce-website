// import { Link } from "react-router-dom";
// import { useState } from "react";

// const ProductCard = ({ product, index }) => {
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [imageError, setImageError] = useState(false);

//   // Animation delay for staggered loading
//   const animationDelay = `${(index % 8) * 100}ms`;

//   return (
//     <Link
//       to={`/product/${product._id}`}
//       className="group block h-full"
//       style={{ animationDelay }}
//     >
//       <div className="bg-white border border-black/10 rounded-2xl p-4 sm:p-5 md:p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden hover:border-black/20 h-full flex flex-col relative">
//         {/* Discount Badge (if any) */}
//         {product.discount && (
//           <div className="absolute top-3 left-3 z-10">
//             <div className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
//               -{product.discount}% OFF
//             </div>
//           </div>
//         )}

//         {/* New Arrival Badge */}
//         {product.isNew && (
//           <div className="absolute top-3 right-3 z-10">
//             <div className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
//               NEW
//             </div>
//           </div>
//         )}

//         {/* Image Container */}
//         <div className="relative h-48 sm:h-52 md:h-56 lg:h-60 mb-4 sm:mb-5 md:mb-6 overflow-hidden rounded-xl bg-linear-to-br from-black/5 to-black/10 group-hover:from-black/10 group-hover:to-black/20 transition-all duration-500">
//           {/* Loading Skeleton */}
//           {!imageLoaded && !imageError && (
//             <div className="absolute inset-0 animate-pulse bg-black/10" />
//           )}

//           {/* Product Image */}
//           <img
//             src={
//               imageError || !product.images?.[0]
//                 ? "/placeholder-image.jpg"
//                 : product.images[0]
//             }
//             alt={product.name}
//             className={`w-full h-full object-contain transition-all duration-700 group-hover:scale-110 ${
//               imageLoaded ? "opacity-100" : "opacity-0"
//             }`}
//             loading="lazy"
//             onLoad={() => setImageLoaded(true)}
//             onError={() => {
//               setImageError(true);
//               setImageLoaded(true);
//             }}
//           />

//           {/* Quick View Overlay */}
//           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
//             <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
//               <div className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold shadow-xl flex items-center gap-2">
//                 <svg
//                   className="w-4 h-4"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                   />
//                 </svg>
//                 Quick View
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="flex-1 flex flex-col">
//           {/* Category Tag */}
//           {product.category?.name && (
//             <span className="text-xs text-black/50 font-medium mb-2">
//               {product.category.name}
//             </span>
//           )}

//           {/* Product Name */}
//           <h3
//             className="font-semibold text-base sm:text-lg text-black mb-2 line-clamp-2 group-hover:text-black/80 transition-colors min-h-12"
//             title={product.name}
//           >
//             {product.name}
//           </h3>

//           {/* Rating (abhi jaruri nahi)
//           {product.rating && (
//             <div className="flex items-center gap-1 mb-3">
//               <div className="flex">
//                 {[...Array(5)].map((_, i) => (
//                   <svg
//                     key={i}
//                     className={`w-4 h-4 ${
//                       i < Math.floor(product.rating)
//                         ? "text-yellow-400 fill-yellow-400"
//                         : "text-gray-300"
//                     }`}
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                   >
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                 ))}
//               </div>
//               <span className="text-sm text-black/60">
//                 {product.rating} ({product.reviewCount || 0})
//               </span>
//             </div>
//           )} */}

//           {/* Price Section */}
//           <div className="mt-auto pt-3 border-t border-black/5">
//             {product.originalPrice ? (
//               <div className="flex items-center gap-2">
//                 <p className="text-xl md:text-2xl font-bold text-black">
//                   ₹{product.price?.toLocaleString()}
//                 </p>
//                 <p className="text-sm text-black/50 line-through">
//                   ₹{product.originalPrice?.toLocaleString()}
//                 </p>
//               </div>
//             ) : (
//               <p className="text-xl md:text-2xl font-bold text-black">
//                 ₹{product.price?.toLocaleString()}
//               </p>
//             )}

//             {/* Stock Status */}
//             <div className="flex items-center justify-between mt-2">
//               <div className="flex items-center gap-2">
//                 <div
//                   className={`w-2 h-2 rounded-full ${
//                     product.stock > 10
//                       ? "bg-green-500"
//                       : product.stock > 0
//                       ? "bg-yellow-500"
//                       : "bg-red-500"
//                   }`}
//                 />
//                 <span className="text-xs text-black/60">
//                   {product.stock > 10
//                     ? "In Stock"
//                     : product.stock > 0
//                     ? `Only ${product.stock} left`
//                     : "Out of Stock"}
//                 </span>
//               </div>

//               {/* View Details Arrow */}
//               <div className="flex items-center gap-1 text-sm text-black/70 group-hover:text-black transition-colors">
//                 <span className="hidden sm:inline">Details</span>
//                 <svg
//                   className="w-4 h-4 group-hover:translate-x-1 transition-transform"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 5l7 7-7 7"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Hover Effect Border */}
//         <div className="absolute inset-0 border-2 border-transparent group-hover:border-black/20 rounded-2xl transition-all duration-500 pointer-events-none" />
//       </div>
//     </Link>
//   );
// };

// export default ProductCard;
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
      className="group block h-full animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out"
      style={{ animationDelay }}
    >
      <div className="relative h-full bg-white rounded-[2rem] p-3 pb-5 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1.5 transition-all duration-500 flex flex-col">
        
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
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.1em] truncate max-w-[60%]">
              {product.brand || "Collection"}
            </span>
            <span className="text-[9px] font-bold text-gray-400 capitalize">
              {product.category?.name || "General"}
            </span>
          </div>

          {/* Product Name - Balanced Size */}
          <h3 className="text-base font-semibold text-gray-900 leading-tight mb-3 h-[2.5rem] line-clamp-2 overflow-hidden">
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