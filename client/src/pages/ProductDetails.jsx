// import { useEffect, useState, useCallback, useRef } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { getSingleProduct } from "../services/api";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
// import {
//   ChevronLeft,
//   ShoppingCart,
//   Check,
//   ChevronRight,
//   Maximize2,
//   Truck,
//   Shield,
//   Heart,
//   Share2,
//   ArrowLeft,
//   Sparkles,
//   Tag,
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

//   // Swipe & Zoom State
//   const [touchStart, setTouchStart] = useState(0);
//   const [touchEnd, setTouchEnd] = useState(0);
//   const [isSwiping, setIsSwiping] = useState(false);
//   const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
//   const [isZooming, setIsZooming] = useState(false);

//   const imageTrackRef = useRef(null);
//   const thumbnailContainerRef = useRef(null);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

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

//   useEffect(() => {
//     fetchProduct();
//   }, [fetchProduct]);
//   useEffect(() => {
//     checkIsInCart();
//   }, [checkIsInCart]);

//   // share function
//   const handleShare = async () => {
//     const shareData = {
//       title: product.name,
//       text: `Check out this ${product.name} on E-Shop!`,
//       url: window.location.href,
//     };

//     try {
//       if (navigator.share) {
//         await navigator.share(shareData);
//       } else {
//         await navigator.clipboard.writeText(window.location.href);
//         toast.success("Link copied to clipboard!");
//       }
//     } catch (err) {
//       console.error("Error sharing:", err);
//     }
//   };

//   // Logic for Price Calculation
//   const hasDiscount = product?.discount > 0;
//   const originalPrice = hasDiscount
//     ? Math.round(product.price / (1 - product.discount / 100))
//     : null;

//   const nextImage = () => {
//     if (product?.images) {
//       const nextIndex = (activeImg + 1) % product.images.length;
//       setActiveImg(nextIndex);
//       scrollThumbnailIntoView(nextIndex);
//     }
//   };

//   const prevImage = () => {
//     if (product?.images) {
//       const prevIndex =
//         (activeImg - 1 + product.images.length) % product.images.length;
//       setActiveImg(prevIndex);
//       scrollThumbnailIntoView(prevIndex);
//     }
//   };

//   const scrollThumbnailIntoView = (index) => {
//     if (thumbnailContainerRef.current) {
//       const thumbnailElement = thumbnailContainerRef.current.children[index];
//       if (thumbnailElement) {
//         thumbnailElement.scrollIntoView({
//           behavior: "smooth",
//           block: "nearest",
//           inline: "center",
//         });
//       }
//     }
//   };

//   const handleDragStart = (clientX) => {
//     setTouchStart(clientX);
//     setIsSwiping(true);
//     if (imageTrackRef.current) imageTrackRef.current.style.transition = "none";
//   };

//   const handleDragMove = (clientX) => {
//     if (!isSwiping) return;
//     setTouchEnd(clientX);
//     const diff = touchStart - clientX;
//     if (imageTrackRef.current) {
//       imageTrackRef.current.style.transform = `translateX(calc(-${
//         activeImg * 100
//       }% - ${diff}px))`;
//     }
//   };

//   const handleDragEnd = () => {
//     if (!isSwiping) return;
//     const diff = touchStart - touchEnd;
//     if (Math.abs(diff) > 50) {
//       if (diff > 0) nextImage();
//       else prevImage();
//     }
//     setIsSwiping(false);
//     if (imageTrackRef.current) {
//       imageTrackRef.current.style.transition =
//         "transform 0.5s cubic-bezier(0.2, 1, 0.3, 1)";
//       imageTrackRef.current.style.transform = `translateX(-${
//         activeImg * 100
//       }%)`;
//     }
//   };

//   const handleMouseMove = (e) => {
//     if (isMobile) return;
//     const { left, top, width, height } =
//       e.currentTarget.getBoundingClientRect();
//     const x = ((e.pageX - left) / width) * 100;
//     const y = ((e.pageY - top) / height) * 100;
//     setZoomPos({ x, y });
//   };

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

//   if (loadingProduct)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <div className="w-10 h-10 border-b-2 border-black border-t-transparent rounded-full animate-spin" />
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-white text-black pb-24 lg:pb-12">
//       <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 flex items-center px-6">
//         <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
//           <button
//             onClick={() => navigate(-1)}
//             className="group flex items-center gap-2 font-bold text-xs uppercase tracking-widest"
//           >
//             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
//             Back
//           </button>
//           <div className="flex items-center gap-4">
//             <button
//               onClick={handleShare}
//               className="p-3 bg-gray-50 rounded-full hover:bg-black hover:text-white transition-all"
//             >
//               <Share2 size={16} />
//             </button>{" "}
//             <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
//               <Heart size={18} />
//             </button>
//           </div>
//         </div>
//       </nav>

//       {showFullscreen && (
//         <div className="fixed inset-0 bg-black z-100 flex items-center justify-center p-4">
//           <div className="absolute top-6 right-6 flex gap-3">
//             <button
//               onClick={prevImage}
//               className="text-white p-3 bg-white/10 rounded-full backdrop-blur-md"
//             >
//               <ChevronLeft size={20} />
//             </button>
//             <button
//               onClick={nextImage}
//               className="text-white p-3 bg-white/10 rounded-full backdrop-blur-md"
//             >
//               <ChevronRight size={20} />
//             </button>
//             <button
//               onClick={() => setShowFullscreen(false)}
//               className="text-white p-3 bg-white/10 rounded-full backdrop-blur-md"
//             >
//               <Maximize2 />
//             </button>
//           </div>
//           <img
//             src={product.images?.[activeImg]}
//             className="max-w-full max-h-full object-contain"
//             alt="View"
//           />
//         </div>
//       )}

//       <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-16">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
//           {/* LEFT: IMAGE GALLERY */}
//           <div className="lg:col-span-6 space-y-6">
//             <div className="relative overflow-hidden rounded-[3rem] border-4 border-gray-100 shadow-xl group bg-[#F8F8F8]">
//               {/* --- NEW BADGE --- */}
//               {product.isNew && (
//                 <div className="absolute top-8 left-8 z-20 flex items-center gap-2 bg-black text-white px-4 py-2 rounded-2xl shadow-xl animate-pulse">
//                   <Sparkles className="w-3.5 h-3.5" />
//                   <span className="text-[10px] font-black uppercase tracking-widest">
//                     New Arrival
//                   </span>
//                 </div>
//               )}

//               {/* --- DISCOUNT BADGE --- */}
//               {hasDiscount && (
//                 <div className="absolute top-8 right-8 z-20 bg-red-500 text-white px-4 py-2 rounded-2xl shadow-xl font-black text-xs">
//                   -{product.discount}% OFF
//                 </div>
//               )}

//               <div
//                 className="relative aspect-square group cursor-zoom-in overflow-hidden"
//                 onMouseEnter={() => setIsZooming(true)}
//                 onMouseLeave={() => {
//                   setIsZooming(false);
//                   setIsSwiping(false);
//                 }}
//                 onMouseMove={handleMouseMove}
//                 onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
//                 onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
//                 onTouchEnd={handleDragEnd}
//                 onMouseDown={(e) => handleDragStart(e.clientX)}
//                 onMouseMoveCapture={(e) => handleDragMove(e.clientX)}
//                 onMouseUp={handleDragEnd}
//               >
//                 <div
//                   ref={imageTrackRef}
//                   className="flex h-full transition-transform duration-500 ease-out"
//                   style={{ transform: `translateX(-${activeImg * 100}%)` }}
//                 >
//                   {product.images?.map((img, i) => (
//                     <div
//                       key={i}
//                       className="w-full h-full shrink-0 flex items-center justify-center"
//                     >
//                       <img
//                         src={img}
//                         className={`max-h-full object-contain select-none transition-opacity ${
//                           isZooming ? "opacity-0" : "opacity-100"
//                         }`}
//                         draggable="false"
//                         alt={`${product.name}`}
//                       />
//                     </div>
//                   ))}
//                 </div>

//                 {isZooming && !isSwiping && !isMobile && (
//                   <div
//                     className="absolute inset-0 pointer-events-none hidden lg:block"
//                     style={{
//                       backgroundImage: `url(${product.images[activeImg]})`,
//                       backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
//                       backgroundSize: "250%",
//                       backgroundRepeat: "no-repeat",
//                     }}
//                   />
//                 )}

//                 <button
//                   onClick={() => setShowFullscreen(true)}
//                   className="absolute bottom-8 right-8 p-4 bg-white shadow-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 z-10"
//                 >
//                   <Maximize2 size={20} />
//                 </button>
//               </div>

//               {isMobile && product?.images?.length > 1 && (
//                 <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
//                   {product.images.map((_, index) => (
//                     <div
//                       key={index}
//                       className={`h-1.5 rounded-full transition-all duration-300 ${
//                         activeImg === index
//                           ? "w-8 bg-black"
//                           : "w-1.5 bg-black/20"
//                       }`}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Thumbnail Gallery */}
//             {product?.images?.length > 1 && (
//               <div
//                 ref={thumbnailContainerRef}
//                 className="flex gap-4 overflow-x-auto py-2 scrollbar-hide"
//               >
//                 {product.images.map((img, i) => (
//                   <button
//                     key={i}
//                     onClick={() => {
//                       setActiveImg(i);
//                       scrollThumbnailIntoView(i);
//                     }}
//                     className={`w-24 h-24 rounded-3xl overflow-hidden shrink-0 transition-all border-2 ${
//                       activeImg === i
//                         ? "border-black scale-105 shadow-lg"
//                         : "border-transparent opacity-60"
//                     }`}
//                   >
//                     <img
//                       src={img}
//                       className="w-full h-full object-cover"
//                       alt=""
//                     />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* RIGHT: PRODUCT INFO */}
//           <div className="lg:col-span-5 space-y-10">
//             <div className="space-y-6">
//               <div className="flex flex-wrap gap-3">
//                 <span className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 bg-gray-100 rounded-full">
//                   {product.brand || "Originals"}
//                 </span>
//                 <span
//                   className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full ${
//                     product.stock > 0
//                       ? "bg-green-50 text-green-600"
//                       : "bg-red-50 text-red-600"
//                   }`}
//                 >
//                   {product.stock > 0 ? "In Stock" : "Sold Out"}
//                 </span>
//               </div>

//               <h1 className="text-2xl lg:text-3xl font-bold tracking-tighter leading-tight">
//                 {product.name}
//               </h1>

//               <div className="flex items-baseline gap-4">
//                 <span className="text-4xl font-black tracking-tighter">
//                   ₹{product.price?.toLocaleString()}
//                 </span>
//                 {hasDiscount && (
//                   <span className="text-2xl text-gray-300 line-through font-bold">
//                     ₹{originalPrice?.toLocaleString()}
//                   </span>
//                 )}
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="p-5 bg-gray-50 rounded-4xl flex items-center gap-4">
//                 <div className="p-3 bg-white rounded-2xl shadow-sm">
//                   <Truck size={20} />
//                 </div>
//                 <div>
//                   <p className="text-[10px] font-black uppercase text-gray-400">
//                     Shipping
//                   </p>
//                   <p className="text-xs font-bold uppercase tracking-widest">
//                     Global Express
//                   </p>
//                 </div>
//               </div>
//               <div className="p-5 bg-gray-50 rounded-4xl flex items-center gap-4">
//                 <div className="p-3 bg-white rounded-2xl shadow-sm">
//                   <Shield size={20} />
//                 </div>
//                 <div>
//                   <p className="text-[10px] font-black uppercase text-gray-400">
//                     Authenticity
//                   </p>
//                   <p className="text-xs font-bold uppercase tracking-widest">
//                     100% Original
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <div className="flex items-center gap-2">
//                 <Tag size={14} className="text-gray-400" />
//                 <h3 className="text-xs font-black uppercase tracking-widest text-gray-600">
//                   Product Narrative
//                 </h3>
//               </div>
//               <p
//                 className={`text-gray-500 leading-relaxed text-lg font-medium ${
//                   !expandDescription && "line-clamp-4"
//                 }`}
//               >
//                 {product.description}
//               </p>
//               {product.description?.length > 200 && (
//                 <button
//                   onClick={() => setExpandDescription(!expandDescription)}
//                   className="text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-black pb-1 hover:text-gray-500 transition-colors"
//                 >
//                   {expandDescription ? "Collapse -" : "Expand Details +"}
//                 </button>
//               )}
//             </div>

//             <div className="pt-6">
//               <button
//                 onClick={handleButtonClick}
//                 disabled={loading || product.stock <= 0}
//                 className={`w-full py-6 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center justify-center gap-3 ${
//                   product.stock <= 0
//                     ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                     : "bg-black text-white hover:bg-zinc-800 shadow-2xl shadow-black/30"
//                 }`}
//               >
//                 {loading ? (
//                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                 ) : isInCart ? (
//                   <>
//                     <Check className="w-5 h-5" /> Go to Bag
//                   </>
//                 ) : product.stock <= 0 ? (
//                   "Currently Unavailable"
//                 ) : (
//                   <>
//                     <ShoppingCart className="w-5 h-5" /> Add to Bag
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* --- SIMILAR PRODUCTS SECTION ---
//         {similarProducts.length > 0 && (
//           <div className="mt-32 pt-16 border-t border-gray-100">
//             <div className="flex items-center justify-between mb-12">
//               <h2 className="text-3xl font-black tracking-tighter uppercase">
//                 Similar Assets
//               </h2>
//               <Link
//                 to="/products"
//                 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group"
//               >
//                 View All{" "}
//                 <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
//               </Link>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//               {similarProducts.map((p, index) => (
//                 <ProductCard key={p._id} product={p} index={index} />
//               ))}
//             </div>
//           </div>
//         )} */}
//       </main>

//       {/* MOBILE STICKY FOOTER */}
//       <div className="lg:hidden fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-2xl border-t border-gray-100 z-50">
//         <div className="max-w-md mx-auto flex items-center justify-between gap-6">
//           <div className="flex flex-col">
//             <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
//               Premium Price
//             </span>
//             <span className="text-2xl font-black">
//               ₹{product.price?.toLocaleString()}
//             </span>
//           </div>
//           <button
//             onClick={handleButtonClick}
//             disabled={loading || product.stock <= 0}
//             className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 shadow-xl ${
//               product.stock <= 0
//                 ? "bg-gray-200 text-gray-400"
//                 : "bg-black text-white"
//             }`}
//           >
//             {isInCart ? "In Bag" : "Add Bag"}
//           </button>
//         </div>
//       </div>
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
  ChevronLeft,
  ShoppingCart,
  Check,
  ChevronRight,
  Maximize2,
  Truck,
  Shield,
  Heart,
  Share2,
  ArrowLeft,
  Sparkles,
  Tag,
  X // Added for closing fullscreen
} from "lucide-react";
import toast from "react-hot-toast";
import SimilarProducts from "../components/SimilarProducts"; // Naya Component

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

  // Swipe & Zoom State
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  const imageTrackRef = useRef(null);
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
    const exists = cart.products.some(
      (item) => item.product._id === product._id
    );
    setIsInCart(exists);
  }, [cart, product]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  useEffect(() => {
    checkIsInCart();
  }, [checkIsInCart]);

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `Check out this ${product.name} on E-Shop!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const hasDiscount = product?.discount > 0;
  const originalPrice = hasDiscount
    ? Math.round(product.price / (1 - product.discount / 100))
    : null;

  const nextImage = () => {
    if (product?.images) {
      const nextIndex = (activeImg + 1) % product.images.length;
      setActiveImg(nextIndex);
      scrollThumbnailIntoView(nextIndex);
    }
  };

  const prevImage = () => {
    if (product?.images) {
      const prevIndex =
        (activeImg - 1 + product.images.length) % product.images.length;
      setActiveImg(prevIndex);
      scrollThumbnailIntoView(prevIndex);
    }
  };

  const scrollThumbnailIntoView = (index) => {
    if (thumbnailContainerRef.current) {
      const thumbnailElement = thumbnailContainerRef.current.children[index];
      if (thumbnailElement) {
        thumbnailElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  const handleDragStart = (clientX) => {
    setTouchStart(clientX);
    setIsSwiping(true);
    if (imageTrackRef.current) imageTrackRef.current.style.transition = "none";
  };

  const handleDragMove = (clientX) => {
    if (!isSwiping) return;
    setTouchEnd(clientX);
    const diff = touchStart - clientX;
    if (imageTrackRef.current) {
      imageTrackRef.current.style.transform = `translateX(calc(-${
        activeImg * 100
      }% - ${diff}px))`;
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
      imageTrackRef.current.style.transition =
        "transform 0.5s cubic-bezier(0.2, 1, 0.3, 1)";
      imageTrackRef.current.style.transform = `translateX(-${
        activeImg * 100
      }%)`;
    }
  };

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleButtonClick = () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }
    if (isInCart) {
      navigate("/cart");
    } else {
      addToCart(product._id, 1);
      toast.success("Added to cart!");
    }
  };

  if (loadingProduct)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-b-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-black pb-24 lg:pb-12">
      {/* NAVIGATION */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 flex items-center px-6">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 font-bold text-xs uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={handleShare}
              className="p-3 bg-gray-50 rounded-full hover:bg-black hover:text-white transition-all"
            >
              <Share2 size={16} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* FULLSCREEN IMAGE MODAL (FIXED FOR MOBILE) */}
      {showFullscreen && (
        <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center">
          <div className="absolute top-6 right-6 flex gap-3 z-[10000]">
            <button onClick={prevImage} className="text-white p-3 bg-white/10 rounded-full backdrop-blur-md">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextImage} className="text-white p-3 bg-white/10 rounded-full backdrop-blur-md">
              <ChevronRight size={20} />
            </button>
            <button onClick={() => setShowFullscreen(false)} className="text-white p-3 bg-white/10 rounded-full backdrop-blur-md">
              <X size={20} />
            </button>
          </div>
          <img
            src={product.images?.[activeImg]}
            className="max-w-full max-h-full object-contain p-4"
            alt="Product full view"
          />
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* LEFT: IMAGE GALLERY */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative overflow-hidden rounded-[3rem] border-4 border-gray-100 shadow-xl group bg-[#F8F8F8] z-10">
              {product.isNew && (
                <div className="absolute top-8 left-8 z-20 flex items-center gap-2 bg-black text-white px-4 py-2 rounded-2xl shadow-xl animate-pulse">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">New Arrival</span>
                </div>
              )}

              {hasDiscount && (
                <div className="absolute top-8 right-8 z-20 bg-red-500 text-white px-4 py-2 rounded-2xl shadow-xl font-black text-xs">
                  -{product.discount}% OFF
                </div>
              )}

              <div
                className="relative aspect-square group cursor-zoom-in overflow-hidden"
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => {
                  setIsZooming(false);
                  setIsSwiping(false);
                }}
                onMouseMove={handleMouseMove}
                onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
                onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
                onTouchEnd={handleDragEnd}
                onMouseDown={(e) => handleDragStart(e.clientX)}
                onMouseMoveCapture={(e) => handleDragMove(e.clientX)}
                onMouseUp={handleDragEnd}
              >
                <div
                  ref={imageTrackRef}
                  className="flex h-full transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${activeImg * 100}%)` }}
                >
                  {product.images?.map((img, i) => (
                    <div key={i} className="w-full h-full shrink-0 flex items-center justify-center">
                      <img
                        src={img}
                        className={`max-h-full object-contain select-none transition-opacity ${isZooming ? "opacity-0" : "opacity-100"}`}
                        draggable="false"
                        alt={product.name}
                      />
                    </div>
                  ))}
                </div>

                {isZooming && !isSwiping && !isMobile && (
                  <div
                    className="absolute inset-0 pointer-events-none hidden lg:block"
                    style={{
                      backgroundImage: `url(${product.images[activeImg]})`,
                      backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                      backgroundSize: "250%",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                )}

                <button
                  onClick={() => setShowFullscreen(true)}
                  className="absolute bottom-8 right-8 p-4 bg-white shadow-2xl rounded-3xl opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 z-10"
                >
                  <Maximize2 size={20} />
                </button>
              </div>

              {isMobile && product?.images?.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
                  {product.images.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full transition-all duration-300 ${activeImg === index ? "w-8 bg-black" : "w-1.5 bg-black/20"}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product?.images?.length > 1 && (
              <div ref={thumbnailContainerRef} className="flex gap-4 overflow-x-auto py-2 scrollbar-hide">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => { setActiveImg(i); scrollThumbnailIntoView(i); }}
                    className={`w-24 h-24 rounded-3xl overflow-hidden shrink-0 transition-all border-2 ${activeImg === i ? "border-black scale-105 shadow-lg" : "border-transparent opacity-60"}`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 bg-gray-100 rounded-full">
                  {product.brand || "Originals"}
                </span>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full ${product.stock > 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                  {product.stock > 0 ? "In Stock" : "Sold Out"}
                </span>
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold tracking-tighter leading-tight">{product.name}</h1>

              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-black tracking-tighter">₹{product.price?.toLocaleString()}</span>
                {hasDiscount && (
                  <span className="text-2xl text-gray-300 line-through font-bold">₹{originalPrice?.toLocaleString()}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-gray-50 rounded-4xl flex items-center gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm"><Truck size={20} /></div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400">Shipping</p>
                  <p className="text-xs font-bold uppercase tracking-widest">Global Express</p>
                </div>
              </div>
              <div className="p-5 bg-gray-50 rounded-4xl flex items-center gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm"><Shield size={20} /></div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400">Authenticity</p>
                  <p className="text-xs font-bold uppercase tracking-widest">100% Original</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Tag size={14} className="text-gray-400" />
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-600">Product Narrative</h3>
              </div>
              <p className={`text-gray-500 leading-relaxed text-lg font-medium ${!expandDescription && "line-clamp-4"}`}>
                {product.description}
              </p>
              {product.description?.length > 200 && (
                <button
                  onClick={() => setExpandDescription(!expandDescription)}
                  className="text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-black pb-1 hover:text-gray-500 transition-colors"
                >
                  {expandDescription ? "Collapse -" : "Expand Details +"}
                </button>
              )}
            </div>

            <div className="pt-6">
              <button
                onClick={handleButtonClick}
                disabled={loading || product.stock <= 0}
                className={`w-full py-6 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center justify-center gap-3 ${
                  product.stock <= 0 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-black text-white hover:bg-zinc-800 shadow-2xl shadow-black/30"
                }`}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : isInCart ? (
                  <><Check className="w-5 h-5" /> Go to Bag</>
                ) : (
                  <><ShoppingCart className="w-5 h-5" /> Add to Bag</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* SIMILAR PRODUCTS SECTION */}
        {product?.category && (
          <SimilarProducts 
            categoryId={product.category._id || product.category} 
            currentProductId={product._id} 
          />
        )}
      </main>

      {/* MOBILE STICKY FOOTER */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-2xl border-t border-gray-100 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Premium Price</span>
            <span className="text-2xl font-black">₹{product.price?.toLocaleString()}</span>
          </div>
          <button
            onClick={handleButtonClick}
            disabled={loading || product.stock <= 0}
            className={`flex-1 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 shadow-xl ${
              product.stock <= 0 ? "bg-gray-200 text-gray-400" : "bg-black text-white"
            }`}
          >
            {isInCart ? "In Bag" : "Add Bag"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;