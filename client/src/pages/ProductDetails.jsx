// import { useEffect, useState, useCallback, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getSingleProduct } from "../services/api";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
// import { 
//   ChevronLeft, 
//   ShoppingCart, 
//   Check, 
//   ChevronRight, 
//   ChevronUp,
//   Maximize2,
//   Star,
//   Truck,
//   Shield,
//   RefreshCw,
//   Heart,
//   Share2
// } from "lucide-react";
// import toast from "react-hot-toast";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const { cart, addToCart, loading } = useCart();
//   const [product, setProduct] = useState(null);
//   const [isInCart, setIsInCart] = useState(false);
//   const [activeImg, setActiveImg] = useState(0);
//   const [loadingProduct, setLoadingProduct] = useState(true);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [expandDescription, setExpandDescription] = useState(false);
//   const [showFullscreen, setShowFullscreen] = useState(false);
//   const [touchStart, setTouchStart] = useState(0);
//   const [touchEnd, setTouchEnd] = useState(0);
//   const [isSwiping, setIsSwiping] = useState(false);
//   const imageTrackRef = useRef(null);
//   const imageContainerRef = useRef(null);

//   // Handle responsive breakpoints
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Fetch product
//   const fetchProduct = useCallback(async () => {
//     setLoadingProduct(true);
//     try {
//       const { data } = await getSingleProduct(id);
//       setProduct(data);
//     } catch (error) {
//       toast.error("Product not found");
//       navigate("/");
//     } finally {
//       setLoadingProduct(false);
//     }
//   }, [id, navigate]);

//   // Check if product already in cart
//   const checkIsInCart = useCallback(() => {
//     if (!cart || !product) {
//       setIsInCart(false);
//       return;
//     }
//     const exists = cart.products.some( 
//       (item) => item.product._id === product._id
//     );
//     setIsInCart(exists);
//   }, [cart, product]);

//   // Image navigation
//   const nextImage = () => {
//     if (product?.images) {
//       setActiveImg((prev) => (prev + 1) % product.images.length);
//     }
//   };

//   const prevImage = () => {
//     if (product?.images) {
//       setActiveImg((prev) => (prev - 1 + product.images.length) % product.images.length);
//     }
//   };

//   // Touch swipe handlers
//   const handleTouchStart = (e) => {
//     setTouchStart(e.touches[0].clientX);
//     setIsSwiping(true);
//     if (imageContainerRef.current) {
//       imageContainerRef.current.style.transition = 'none';
//     }
//   };

//   const handleTouchMove = (e) => {
//     if (!isSwiping) return;
//     const currentX = e.touches[0].clientX;
//     setTouchEnd(currentX);
    
//     // Move image track during swipe
//     const diff = touchStart - currentX;
//     if (imageTrackRef.current) {
//       imageTrackRef.current.style.transform = `translateX(calc(-${activeImg * 100}% - ${diff}px))`;
//     }
//   };

//   const handleTouchEnd = () => {
//     if (!isSwiping) return;
    
//     const swipeDistance = touchStart - touchEnd;
//     const swipeThreshold = 50;
    
//     if (Math.abs(swipeDistance) > swipeThreshold) {
//       if (swipeDistance > 0) {
//         // Swipe left - go to next
//         nextImage();
//       } else {
//         // Swipe right - go to previous
//         prevImage();
//       }
//     }
    
//     // Reset
//     setIsSwiping(false);
//     setTouchStart(0);
//     setTouchEnd(0);
    
//     // Reset track position
//     if (imageTrackRef.current) {
//       imageTrackRef.current.style.transition = 'transform 0.3s ease-out';
//       imageTrackRef.current.style.transform = `translateX(-${activeImg * 100}%)`;
//     }
//   };

//   // Mouse swipe for desktop
//   const handleMouseDown = (e) => {
//     if (isMobile) return;
//     setTouchStart(e.clientX);
//     setIsSwiping(true);
//     if (imageContainerRef.current) {
//       imageContainerRef.current.style.transition = 'none';
//     }
//   };

//   const handleMouseMove = (e) => {
//     if (!isSwiping || isMobile) return;
//     setTouchEnd(e.clientX);
    
//     const diff = touchStart - e.clientX;
//     if (imageTrackRef.current) {
//       imageTrackRef.current.style.transform = `translateX(calc(-${activeImg * 100}% - ${diff}px))`;
//     }
//   };

//   const handleMouseUp = () => {
//     if (!isSwiping) return;
//     handleTouchEnd();
//   };

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'ArrowLeft') prevImage();
//       if (e.key === 'ArrowRight') nextImage();
//       if (e.key === 'Escape') setShowFullscreen(false);
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [product?.images]);

//   // Fetch product on component mount
//   useEffect(() => {
//     fetchProduct();
//   }, [fetchProduct]);

//   // Check if product is in cart
//   useEffect(() => {
//     checkIsInCart();
//   }, [checkIsInCart]);

//   // Loading state
//   if (loadingProduct) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-8">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
//           <p className="text-black/60">Loading product...</p>
//         </div>
//       </div>
//     );
//   }

//   // Product not found
//   if (!product) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-8">
//         <div className="text-center max-w-md mx-auto">
//           <h2 className="text-2xl font-semibold text-black mb-4">Product not found</h2>
//           <button
//             onClick={() => navigate("/")}
//             className="px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-black/90 transition-colors"
//           >
//             Back to Home
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Handle Add to Cart / Go to Cart button click
//   const handleButtonClick = () => {
//     if (!user) {
//       toast.error("Please login first");
//       navigate("/login");
//       return;
//     }

//     if (isInCart) {
//       navigate("/cart");
//     } else {
//       addToCart(product._id, 1);
//       toast.success("Added to cart!");
//     }
//   };

//   const safeCategory = product.category?.name || product.category || "Uncategorized";
//   const stockStatus = product.stock > 0 ? "In Stock" : "Out of Stock";
//   const brand = product.brand || "N/A";

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Mobile back button - sticky */}
//       {isMobile && (
//         <div className="sticky top-0 z-20 bg-white border-b border-black/10 px-4 py-3 flex items-center justify-between shadow-sm">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 text-black hover:text-black/70 transition-colors p-2"
//           >
//             <ChevronLeft className="w-5 h-5" />
//             <span className="font-medium text-sm">Back</span>
//           </button>
          
//           <div className="flex items-center gap-2">
//             <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
//               <Share2 className="w-4 h-4" />
//             </button>
//             <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
//               <Heart className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Breadcrumb - Desktop only */}
//       {!isMobile && (
//         <div className="px-6 lg:px-8 py-4 border-b border-black/10">
//           <div className="max-w-7xl mx-auto">
//             <nav className="flex items-center space-x-2 text-sm text-black/70">
//               <button
//                 onClick={() => navigate("/")}
//                 className="flex items-center gap-1 hover:text-black transition-colors hover:underline"
//               >
//                 Home
//               </button>
//               <span>/</span>
//               <button
//                 onClick={() => navigate("/products")}
//                 className="hover:text-black transition-colors hover:underline"
//               >
//                 Products
//               </button>
//               <span>/</span>
//               <span className="text-black font-medium truncate max-w-xs">{product.name}</span>
//             </nav>
//           </div>
//         </div>
//       )}

//       {/* Fullscreen Image Modal */}
//       {showFullscreen && (
//         <div 
//           className="fixed inset-0 bg-black z-50 flex items-center justify-center"
//           onClick={() => setShowFullscreen(false)}
//         >
//           <div className="relative w-full h-full flex items-center justify-center">
//             <button
//               onClick={() => setShowFullscreen(false)}
//               className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-10"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
            
//             <button
//               onClick={(e) => { e.stopPropagation(); prevImage(); }}
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-full transition-colors z-10"
//             >
//               <ChevronLeft className="w-6 h-6" />
//             </button>
            
//             <button
//               onClick={(e) => { e.stopPropagation(); nextImage(); }}
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-full transition-colors z-10"
//             >
//               <ChevronRight className="w-6 h-6" />
//             </button>
            
//             <img
//               src={product.images?.[activeImg]}
//               alt={product.name}
//               className="max-w-full max-h-full object-contain"
//             />
            
//             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//               {product.images.map((_, i) => (
//                 <div
//                   key={i}
//                   className={`w-2 h-2 rounded-full transition-colors ${
//                     activeImg === i ? 'bg-white' : 'bg-white/40'
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
//           {/* Image Gallery */}
//           <div className="space-y-4">
//             {/* Main Image Container with Swipe Support */}
//             <div 
//               ref={imageContainerRef}
//               className="relative aspect-square sm:aspect-6/5 rounded-xl sm:rounded-2xl overflow-hidden bg-black/5 shadow-lg sm:shadow-xl group cursor-grab active:cursor-grabbing"
//               onTouchStart={handleTouchStart}
//               onTouchMove={handleTouchMove}
//               onTouchEnd={handleTouchEnd}
//               onMouseDown={handleMouseDown}
//               onMouseMove={handleMouseMove}
//               onMouseUp={handleMouseUp}
//               onMouseLeave={() => {
//                 if (isSwiping) {
//                   handleTouchEnd();
//                 }
//               }}
//             >
//               {/* Image Track */}
//               <div 
//                 ref={imageTrackRef}
//                 className="flex w-full h-full transition-transform duration-300 ease-out"
//                 style={{ transform: `translateX(-${activeImg * 100}%)` }}
//               >
//                 {product.images?.map((img, index) => (
//                   <div key={index} className="w-full h-full shrink-0 flex items-center justify-center p-4 sm:p-8">
//                     <img
//                       src={img}
//                       alt={`${product.name} - ${index + 1}`}
//                       className="w-full h-full object-contain"
//                       draggable="false"
//                     />
//                   </div>
//                 ))}
//               </div>

//               {/* Fullscreen Button - Desktop */}
//               {!isMobile && product.images && (
//                 <button
//                   onClick={() => setShowFullscreen(true)}
//                   className="absolute top-4 right-4 bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90"
//                 >
//                   <Maximize2 className="w-4 h-4" />
//                 </button>
//               )}

//               {/* Image Counter */}
//               {product.images && product.images.length > 1 && (
//                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
//                   {activeImg + 1} / {product.images.length}
//                 </div>
//               )}

//               {/* Navigation Arrows - Desktop */}
//               {!isMobile && product.images && product.images.length > 1 && (
//                 <>
//                   <button
//                     onClick={(e) => { e.stopPropagation(); prevImage(); }}
//                     className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
//                   >
//                     <ChevronLeft className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={(e) => { e.stopPropagation(); nextImage(); }}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
//                   >
//                     <ChevronRight className="w-5 h-5" />
//                   </button>
//                 </>
//               )}

//               {/* Navigation Arrows - Mobile */}
//               {isMobile && product.images && product.images.length > 1 && (
//                 <>
//                   <button
//                     onClick={prevImage}
//                     className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-lg"
//                   >
//                     <ChevronLeft className="w-5 h-5" />
//                   </button>
//                   <button
//                     onClick={nextImage}
//                     className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-lg"
//                   >
//                     <ChevronRight className="w-5 h-5" />
//                   </button>
//                 </>
//               )}
//             </div>

//             {/* Thumbnails - Desktop */}
//             {!isMobile && product.images && product.images.length > 1 && (
//               <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
//                 {product.images.map((img, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setActiveImg(i)}
//                     className={`relative shrink-0 w-20 aspect-square rounded-xl border-b-2 transition-all duration-200 overflow-hidden group ${
//                       activeImg === i
//                         ? "border-black shadow-md"
//                         : "border-black/20 hover:border-black/40"
//                     }`}
//                   >
//                     <img
//                       src={img}
//                       alt={`Thumbnail ${i + 1}`}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
//                     />
//                     {activeImg === i && (
//                       <div className="absolute inset-0 border-b-2 border-black/20"></div>
//                     )}
//                   </button>
//                 ))}
//               </div>
//             )}

//             {/* Thumbnail Dots - Mobile */}
//             {isMobile && product.images && product.images.length > 1 && (
//               <div className="flex justify-center gap-2">
//                 {product.images.map((_, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setActiveImg(i)}
//                     className={`w-2 h-2 rounded-full transition-all duration-200 ${
//                       activeImg === i 
//                         ? 'bg-black w-6' 
//                         : 'bg-black/20'
//                     }`}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Product Details */}
//           <div className="space-y-6 lg:sticky lg:top-6">
//             {/* Header with Actions */}
//             <div className="space-y-3">
//               {!isMobile && (
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2 text-sm text-black/60">
//                     <span>{safeCategory}</span>
//                     <span>•</span>
//                     <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
//                       {stockStatus}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
//                       <Share2 className="w-4 h-4" />
//                     </button>
//                     <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
//                       <Heart className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               )}

//               <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-tight">
//                 {product.name}
//               </h1>

//               <div className="flex items-center gap-4">
//                 <p className="text-3xl lg:text-4xl font-bold text-black">
//                   ₹{product.price?.toLocaleString()}
//                 </p>
//                 {product.originalPrice && (
//                   <p className="text-xl text-black/50 line-through">
//                     ₹{product.originalPrice?.toLocaleString()}
//                   </p>
//                 )}
//               </div>
//             </div>

//             {/* Rating */}
//             {product.rating && (
//               <div className="flex items-center gap-2">
//                 <div className="flex">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className={`w-4 h-4 ${
//                         i < Math.floor(product.rating) 
//                           ? 'fill-yellow-400 text-yellow-400' 
//                           : 'text-gray-300'
//                       }`}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-sm text-black/60">
//                   {product.rating} • {product.reviewCount || 0} reviews
//                 </span>
//               </div>
//             )}

//             {/* Description */}
//             <div className="space-y-3">
//               <h3 className="font-semibold text-black">Description</h3>
//               <div className={`text-black/70 leading-relaxed ${!expandDescription && 'line-clamp-4'}`}>
//                 {product.description}
//               </div>
//               {product.description && product.description.length > 200 && (
//                 <button
//                   onClick={() => setExpandDescription(!expandDescription)}
//                   className="text-sm font-medium text-black hover:text-black/70 transition-colors flex items-center gap-1"
//                 >
//                   {expandDescription ? 'Show less' : 'Read more'}
//                   <ChevronUp className={`w-4 h-4 transition-transform ${expandDescription ? 'rotate-180' : ''}`} />
//                 </button>
//               )}
//             </div>

//             {/* Features */}
//             <div className="grid grid-cols-2 gap-4">
//               <div className="flex items-center gap-3 p-3 bg-black/5 rounded-xl">
//                 <Truck className="w-5 h-5 text-black/60" />
//                 <div>
//                   <p className="font-medium text-sm">Free Shipping</p>
//                   <p className="text-xs text-black/60">On orders over ₹999</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 p-3 bg-black/5 rounded-xl">
//                 <Shield className="w-5 h-5 text-black/60" />
//                 <div>
//                   <p className="font-medium text-sm">2 Year Warranty</p>
//                   <p className="text-xs text-black/60">Manufacturer warranty</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 p-3 bg-black/5 rounded-xl">
//                 <RefreshCw className="w-5 h-5 text-black/60" />
//                 <div>
//                   <p className="font-medium text-sm">30-Day Returns</p>
//                   <p className="text-xs text-black/60">Easy return policy</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 p-3 bg-black/5 rounded-xl">
//                 <svg className="w-5 h-5 text-black/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//                 <div>
//                   <p className="font-medium text-sm">Fast Delivery</p>
//                   <p className="text-xs text-black/60">2-3 business days</p>
//                 </div>
//               </div>
//             </div>

//             {/* Stock Status - Mobile */}
//             {isMobile && (
//               <div className="flex items-center justify-between p-4 bg-black/5 rounded-xl">
//                 <span className="font-medium">Availability</span>
//                 <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
//                   {stockStatus}
//                 </span>
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="space-y-3">
//               <button
//                 onClick={handleButtonClick}
//                 disabled={loading || product.stock <= 0}
//                 className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
//                   isInCart
//                     ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
//                     : product.stock <= 0
//                     ? "bg-gray-400 text-white cursor-not-allowed"
//                     : "bg-black hover:bg-black/90 text-white shadow-lg shadow-black/20 hover:shadow-black/40"
//                 } ${loading ? "opacity-75" : ""}`}
//               >
//                 {loading ? (
//                   <>
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                     Adding...
//                   </>
//                 ) : isInCart ? (
//                   <>
//                     <Check className="w-5 h-5" />
//                     Go to Cart
//                   </>
//                 ) : product.stock <= 0 ? (
//                   "Out of Stock"
//                 ) : (
//                   <>
//                     <ShoppingCart className="w-5 h-5" />
//                     Add to Cart
//                   </>
//                 )}
//               </button>

//               <button
//                 onClick={() => navigate("/products")}
//                 className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-black text-black font-medium rounded-xl hover:bg-black hover:text-white transition-all duration-200"
//               >
//                 Continue Shopping
//               </button>
//             </div>

//             {/* Additional Info */}
//             <div className="pt-6 border-t border-black/10">
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <p className="text-black/60 mb-1">Category</p>
//                   <p className="font-medium">{safeCategory}</p>
//                 </div>
//                 <div>
//                   <p className="text-black/60 mb-1">SKU</p>
//                   <p className="font-medium">{product.sku || "N/A"}</p>
//                 </div>
//                 <div>
//                   <p className="text-black/60 mb-1">Brand</p>
//                   <p className="font-medium">{brand}</p>
//                 </div>
//                 <div>
//                   <p className="text-black/60 mb-1">Weight</p>
//                   <p className="font-medium">{product.weight || "N/A"}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Back to Top Button - Mobile */}
//       {isMobile && (
//         <button
//           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//           className="fixed bottom-6 right-4 bg-black text-white p-3 rounded-full shadow-xl z-10 hover:bg-black/90 transition-colors"
//         >
//           <ChevronUp className="w-5 h-5" />
//         </button>
//       )}
//     </div>
//   );
// };

// export default ProductDetails;

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getSingleProduct } from "../services/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { 
  ChevronLeft, ShoppingCart, Check, ChevronRight, ChevronUp,
  Maximize2, Star, Truck, Shield, RefreshCw,
  Heart, Share2, ArrowLeft, Package, ZoomIn
} from "lucide-react";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, addToCart, loading } = useCart();
  
  const [product, setProduct] = useState(null);
  const [isInCart, setIsInCart] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [expandDescription, setExpandDescription] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  
  // Swipe State
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  
  // Zoom State (Desktop)
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  const imageTrackRef = useRef(null);
  const imageContainerRef = useRef(null);
  const thumbnailContainerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchProduct = useCallback(async () => {
    setLoadingProduct(true);
    try {
      const { data } = await getSingleProduct(id);
      setProduct(data);
    } catch (error) {
      toast.error("Product not found");
      navigate("/");
    } finally {
      setLoadingProduct(false);
    }
  }, [id, navigate]);

  const checkIsInCart = useCallback(() => {
    if (!cart || !product) {
      setIsInCart(false);
      return;
    }
    const exists = cart.products.some((item) => item.product._id === product._id);
    setIsInCart(exists);
  }, [cart, product]);

  useEffect(() => { fetchProduct(); }, [fetchProduct]);
  useEffect(() => { checkIsInCart(); }, [checkIsInCart]);

  // --- Image Navigation ---
  const nextImage = () => {
    if (product?.images) {
      const nextIndex = (activeImg + 1) % product.images.length;
      setActiveImg(nextIndex);
      scrollThumbnailIntoView(nextIndex);
    }
  };

  const prevImage = () => {
    if (product?.images) {
      const prevIndex = (activeImg - 1 + product.images.length) % product.images.length;
      setActiveImg(prevIndex);
      scrollThumbnailIntoView(prevIndex);
    }
  };

  const scrollThumbnailIntoView = (index) => {
    if (thumbnailContainerRef.current) {
      const thumbnailElement = thumbnailContainerRef.current.children[index];
      if (thumbnailElement) {
        thumbnailElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };

  // --- Touch & Mouse Swipe Engine ---
  const handleDragStart = (clientX) => {
    setTouchStart(clientX);
    setIsSwiping(true);
    if (imageTrackRef.current) imageTrackRef.current.style.transition = 'none';
  };

  const handleDragMove = (clientX) => {
    if (!isSwiping) return;
    setTouchEnd(clientX);
    const diff = touchStart - clientX;
    if (imageTrackRef.current) {
      imageTrackRef.current.style.transform = `translateX(calc(-${activeImg * 100}% - ${diff}px))`;
    }
  };

  const handleDragEnd = () => {
    if (!isSwiping) return;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextImage();
      else prevImage();
    }
    setIsSwiping(false);
    if (imageTrackRef.current) {
      imageTrackRef.current.style.transition = 'transform 0.5s cubic-bezier(0.2, 1, 0.3, 1)';
      imageTrackRef.current.style.transform = `translateX(-${activeImg * 100}%)`;
    }
  };

  // --- Zoom Logic (Desktop) ---
  const handleMouseMove = (e) => {
    if (isMobile) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleButtonClick = () => {
    if (!user) { toast.error("Please login first"); navigate("/login"); return; }
    if (isInCart) { navigate("/cart"); } 
    else { addToCart(product._id, 1); toast.success("Added to cart!"); }
  };

  if (loadingProduct) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-10 h-10 border-b-2 border-black border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-black pb-24 lg:pb-12">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 flex items-center px-6">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="group flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
          </button>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Share2 size={18} /></button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><Heart size={18} /></button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Image Modal */}
      {showFullscreen && (
        <div className="fixed inset-0 bg-black z-100 flex items-center justify-center p-4">
          <div className="absolute top-6 right-6 flex gap-3">
            <button onClick={prevImage} className="text-white p-3 bg-white/10 rounded-full backdrop-blur-md"><ChevronLeft size={20}/></button>
            <button onClick={nextImage} className="text-white p-3 bg-white/10 rounded-full backdrop-blur-md"><ChevronRight size={20}/></button>
            <button onClick={() => setShowFullscreen(false)} className="text-white p-3 bg-white/10 rounded-full backdrop-blur-md"><Maximize2 /></button>
          </div>
          <img src={product.images?.[activeImg]} className="max-w-full max-h-full object-contain" alt="View" />
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* LEFT: IMAGE GALLERY */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative overflow-hidden rounded-[3rem]  border-4 border-gray-300 shadow-lg group">
              {/* Image Container with Overflow Hidden */}
              <div 
                ref={imageContainerRef}
                className="relative aspect-square bg-[#F8F8F8] group cursor-zoom-in overflow-hidden"
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => { setIsZooming(false); setIsSwiping(false); }}
                onMouseMove={handleMouseMove}
                onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
                onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
                onTouchEnd={handleDragEnd}
                onMouseDown={(e) => handleDragStart(e.clientX)}
                onMouseMoveCapture={(e) => handleDragMove(e.clientX)}
                onMouseUp={handleDragEnd}
              >
                {/* Image Track */}
                <div 
                  ref={imageTrackRef}
                  className="flex h-full transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${activeImg * 100}%)` }}
                >
                  {product.images?.map((img, i) => (
                    <div key={i} className="w-full h-full shrink-0 flex items-center justify-center">
                      <img 
                        src={img} 
                        className={`max-h-full object-contain select-none transition-opacity ${isZooming ? 'opacity-0' : 'opacity-100'}`} 
                        draggable="false" 
                        alt={`${product.name} - ${i + 1}`} 
                      />
                    </div>
                  ))}
                </div>

                {/* Desktop Zoom Overlay */}
                {isZooming && !isSwiping && !isMobile && (
                  <div 
                    className="absolute inset-0 pointer-events-none hidden lg:block"
                    style={{
                      backgroundImage: `url(${product.images[activeImg]})`,
                      backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                      backgroundSize: '250%',
                      backgroundRepeat: 'no-repeat'
                    }}
                  />
                )}

                {/* Fullscreen Button */}
                <button 
                  onClick={() => setShowFullscreen(true)} 
                  className="absolute bottom-6 right-6 p-3 bg-white shadow-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity z-10"
                >
                  <Maximize2 size={18} />
                </button>
              </div>

              {/* Navigation Dots (Mobile) */}
              {isMobile && product?.images?.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImg(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeImg === index 
                          ? 'bg-black scale-110' 
                          : 'bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Navigation Arrows */}
              {product?.images?.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <ChevronLeft size={20}/>
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <ChevronRight size={20}/>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery with Scroll Arrows */}
            {product?.images?.length > 1 && (
              <div className="relative">
                {/* Left Scroll Arrow */}
                {!isMobile && (
                  <button 
                    onClick={() => {
                      if (thumbnailContainerRef.current) {
                        thumbnailContainerRef.current.scrollBy({ left: -100, behavior: 'smooth' });
                      }
                    }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-2 bg-white rounded-full shadow-lg z-10"
                  >
                    <ChevronLeft size={16} />
                  </button>
                )}

                {/* Thumbnail Container */}
                <div 
                  ref={thumbnailContainerRef}
                  className="flex gap-3 overflow-x-auto p-2 scrollbar-hide scroll-smooth"
                  style={{ 
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch'
                  }}
                >
                  {product.images.map((img, i) => (
                    <button 
                      key={i} 
                      onClick={() => {
                        setActiveImg(i);
                        scrollThumbnailIntoView(i);
                      }}
                      className={`relative shrink-0 transition-all duration-300 ${
                        activeImg === i 
                          ? 'ring-2 ring-black rounded-xl scale-105' 
                          : 'opacity-70 hover:opacity-100 hover:scale-[1.02]'
                      }`}
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden">
                        <img 
                          src={img} 
                          className="w-full h-full object-cover" 
                          alt={`Thumbnail ${i + 1}`}
                        />
                      </div>
                      {activeImg === i && (
                        <div className="absolute pointer-events-none" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Right Scroll Arrow */}
                {!isMobile && (
                  <button 
                    onClick={() => {
                      if (thumbnailContainerRef.current) {
                        thumbnailContainerRef.current.scrollBy({ left: 100, behavior: 'smooth' });
                      }
                    }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-2 bg-white rounded-full shadow-lg z-10"
                  >
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-gray-100 rounded-full">
                  {product.brand || 'Originals'}
                </span>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${
                  product.stock > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {product.stock > 0 ? 'In Stock' : 'Sold Out'}
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tighter leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-4xl font-black">₹{product.price?.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-300 line-through font-medium">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Bento Grid Features */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-gray-50 rounded-3xl flex items-center gap-4">
                <div className="p-2 bg-white rounded-xl shadow-sm"><Truck size={20} /></div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-600">Shipping</p>
                  <p className="text-xs font-bold">Fast & Free</p>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-3xl flex items-center gap-4">
                <div className="p-2 bg-white rounded-xl shadow-sm"><Shield size={20} /></div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-600">Warranty</p>
                  <p className="text-xs font-bold">24 Months</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-600">The Description</h3>
              <p className={`text-gray-600 leading-relaxed text-lg ${!expandDescription && 'line-clamp-4'}`}>
                {product.description}
              </p>
              {product.description?.length > 200 && (
                <button 
                  onClick={() => setExpandDescription(!expandDescription)}
                  className="text-xs font-black uppercase tracking-widest border-2 border-black pb-1"
                >
                  {expandDescription ? 'Less -' : 'More +'}
                </button>
              )}
            </div>

            {/* Desktop CTA */}
            <div className="space-y-4 pt-4">
              <button 
                onClick={handleButtonClick}
                disabled={loading || product.stock <= 0}
                className={`w-full py-5 rounded-4xl font-bold text-lg transition-all active:scale-95 flex items-center justify-center gap-3 ${
                  isInCart ? 'bg-black text-white' : 'bg-black text-white hover:bg-zinc-800'
                } ${product.stock <= 0 ? 'bg-gray-100 text-gray-600 cursor-not-allowed shadow-none' : 'shadow-2xl shadow-black/20'}`}
              >
             
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Adding...
                  </>
                ) : isInCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    Go to Cart
                  </>
                ) : product.stock <= 0 ? (
                  "Out of Stock"
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* MOBILE STICKY FOOTER */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-2xl border-t border-gray-100 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-gray-600">Total Price</span>
            <span className="text-2xl font-black">₹{product.price?.toLocaleString()}</span>
          </div>
          <button 
            onClick={handleButtonClick}
            disabled={loading || product.stock <= 0}
            className={`flex-1 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 shadow-xl shadow-black/20 ${
              product.stock <= 0 
                ? 'bg-gray-200 text-gray-600 cursor-not-allowed' 
                : 'bg-black text-white'
            }`}
          >
            {isInCart ? <><Check size={18}/> Cart</> : <><ShoppingCart size={18}/> Buy</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
