import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleProduct } from "../services/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { 
  ChevronLeft, 
  ShoppingCart, 
  Check, 
  ChevronRight, 
  ChevronUp,
  Maximize2,
  Star,
  Truck,
  Shield,
  RefreshCw,
  Heart,
  Share2
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
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const imageTrackRef = useRef(null);
  const imageContainerRef = useRef(null);

  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch product
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

  // Check if product already in cart
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

  // Image navigation
  const nextImage = () => {
    if (product?.images) {
      setActiveImg((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product?.images) {
      setActiveImg((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  // Touch swipe handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setIsSwiping(true);
    if (imageContainerRef.current) {
      imageContainerRef.current.style.transition = 'none';
    }
  };

  const handleTouchMove = (e) => {
    if (!isSwiping) return;
    const currentX = e.touches[0].clientX;
    setTouchEnd(currentX);
    
    // Move image track during swipe
    const diff = touchStart - currentX;
    if (imageTrackRef.current) {
      imageTrackRef.current.style.transform = `translateX(calc(-${activeImg * 100}% - ${diff}px))`;
    }
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    
    const swipeDistance = touchStart - touchEnd;
    const swipeThreshold = 50;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        // Swipe left - go to next
        nextImage();
      } else {
        // Swipe right - go to previous
        prevImage();
      }
    }
    
    // Reset
    setIsSwiping(false);
    setTouchStart(0);
    setTouchEnd(0);
    
    // Reset track position
    if (imageTrackRef.current) {
      imageTrackRef.current.style.transition = 'transform 0.3s ease-out';
      imageTrackRef.current.style.transform = `translateX(-${activeImg * 100}%)`;
    }
  };

  // Mouse swipe for desktop
  const handleMouseDown = (e) => {
    if (isMobile) return;
    setTouchStart(e.clientX);
    setIsSwiping(true);
    if (imageContainerRef.current) {
      imageContainerRef.current.style.transition = 'none';
    }
  };

  const handleMouseMove = (e) => {
    if (!isSwiping || isMobile) return;
    setTouchEnd(e.clientX);
    
    const diff = touchStart - e.clientX;
    if (imageTrackRef.current) {
      imageTrackRef.current.style.transform = `translateX(calc(-${activeImg * 100}% - ${diff}px))`;
    }
  };

  const handleMouseUp = () => {
    if (!isSwiping) return;
    handleTouchEnd();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') setShowFullscreen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product?.images]);

  // Fetch product on component mount
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  // Check if product is in cart
  useEffect(() => {
    checkIsInCart();
  }, [checkIsInCart]);

  // Loading state
  if (loadingProduct) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-black/60">Loading product...</p>
        </div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-8">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-black mb-4">Product not found</h2>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-black/90 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Handle Add to Cart / Go to Cart button click
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

  const safeCategory = product.category?.name || product.category || "Uncategorized";
  const stockStatus = product.stock > 0 ? "In Stock" : "Out of Stock";
  const brand = product.brand || "N/A";

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile back button - sticky */}
      {isMobile && (
        <div className="sticky top-0 z-20 bg-white border-b border-black/10 px-4 py-3 flex items-center justify-between shadow-sm">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-black hover:text-black/70 transition-colors p-2"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium text-sm">Back</span>
          </button>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Breadcrumb - Desktop only */}
      {!isMobile && (
        <div className="px-6 lg:px-8 py-4 border-b border-black/10">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center space-x-2 text-sm text-black/70">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-1 hover:text-black transition-colors hover:underline"
              >
                Home
              </button>
              <span>/</span>
              <button
                onClick={() => navigate("/products")}
                className="hover:text-black transition-colors hover:underline"
              >
                Products
              </button>
              <span>/</span>
              <span className="text-black font-medium truncate max-w-xs">{product.name}</span>
            </nav>
          </div>
        </div>
      )}

      {/* Fullscreen Image Modal */}
      {showFullscreen && (
        <div 
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          onClick={() => setShowFullscreen(false)}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={() => setShowFullscreen(false)}
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-full transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 hover:bg-white/10 rounded-full transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            <img
              src={product.images?.[activeImg]}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {product.images.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    activeImg === i ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image Container with Swipe Support */}
            <div 
              ref={imageContainerRef}
              className="relative aspect-square sm:aspect-6/5 rounded-xl sm:rounded-2xl overflow-hidden bg-black/5 shadow-lg sm:shadow-xl group cursor-grab active:cursor-grabbing"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={() => {
                if (isSwiping) {
                  handleTouchEnd();
                }
              }}
            >
              {/* Image Track */}
              <div 
                ref={imageTrackRef}
                className="flex w-full h-full transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${activeImg * 100}%)` }}
              >
                {product.images?.map((img, index) => (
                  <div key={index} className="w-full h-full shrink-0 flex items-center justify-center p-4 sm:p-8">
                    <img
                      src={img}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-contain"
                      draggable="false"
                    />
                  </div>
                ))}
              </div>

              {/* Fullscreen Button - Desktop */}
              {!isMobile && product.images && (
                <button
                  onClick={() => setShowFullscreen(true)}
                  className="absolute top-4 right-4 bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/90"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              )}

              {/* Image Counter */}
              {product.images && product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                  {activeImg + 1} / {product.images.length}
                </div>
              )}

              {/* Navigation Arrows - Desktop */}
              {!isMobile && product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Navigation Arrows - Mobile */}
              {isMobile && product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails - Desktop */}
            {!isMobile && product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`relative shrink-0 w-20 aspect-square rounded-xl border-2 transition-all duration-200 overflow-hidden group ${
                      activeImg === i
                        ? "border-black shadow-md"
                        : "border-black/20 hover:border-black/40"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                    />
                    {activeImg === i && (
                      <div className="absolute inset-0 border-2 border-black/20"></div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Thumbnail Dots - Mobile */}
            {isMobile && product.images && product.images.length > 1 && (
              <div className="flex justify-center gap-2">
                {product.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      activeImg === i 
                        ? 'bg-black w-6' 
                        : 'bg-black/20'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6 lg:sticky lg:top-6">
            {/* Header with Actions */}
            <div className="space-y-3">
              {!isMobile && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-black/60">
                    <span>{safeCategory}</span>
                    <span>•</span>
                    <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                      {stockStatus}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4">
                <p className="text-3xl lg:text-4xl font-bold text-black">
                  ₹{product.price?.toLocaleString()}
                </p>
                {product.originalPrice && (
                  <p className="text-xl text-black/50 line-through">
                    ₹{product.originalPrice?.toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-black/60">
                  {product.rating} • {product.reviewCount || 0} reviews
                </span>
              </div>
            )}

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-semibold text-black">Description</h3>
              <div className={`text-black/70 leading-relaxed ${!expandDescription && 'line-clamp-4'}`}>
                {product.description}
              </div>
              {product.description && product.description.length > 200 && (
                <button
                  onClick={() => setExpandDescription(!expandDescription)}
                  className="text-sm font-medium text-black hover:text-black/70 transition-colors flex items-center gap-1"
                >
                  {expandDescription ? 'Show less' : 'Read more'}
                  <ChevronUp className={`w-4 h-4 transition-transform ${expandDescription ? 'rotate-180' : ''}`} />
                </button>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-black/5 rounded-xl">
                <Truck className="w-5 h-5 text-black/60" />
                <div>
                  <p className="font-medium text-sm">Free Shipping</p>
                  <p className="text-xs text-black/60">On orders over ₹999</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-black/5 rounded-xl">
                <Shield className="w-5 h-5 text-black/60" />
                <div>
                  <p className="font-medium text-sm">2 Year Warranty</p>
                  <p className="text-xs text-black/60">Manufacturer warranty</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-black/5 rounded-xl">
                <RefreshCw className="w-5 h-5 text-black/60" />
                <div>
                  <p className="font-medium text-sm">30-Day Returns</p>
                  <p className="text-xs text-black/60">Easy return policy</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-black/5 rounded-xl">
                <svg className="w-5 h-5 text-black/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium text-sm">Fast Delivery</p>
                  <p className="text-xs text-black/60">2-3 business days</p>
                </div>
              </div>
            </div>

            {/* Stock Status - Mobile */}
            {isMobile && (
              <div className="flex items-center justify-between p-4 bg-black/5 rounded-xl">
                <span className="font-medium">Availability</span>
                <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stockStatus}
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleButtonClick}
                disabled={loading || product.stock <= 0}
                className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  isInCart
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25"
                    : product.stock <= 0
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-black hover:bg-black/90 text-white shadow-lg shadow-black/20 hover:shadow-black/40"
                } ${loading ? "opacity-75" : ""}`}
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

              <button
                onClick={() => navigate("/products")}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-black text-black font-medium rounded-xl hover:bg-black hover:text-white transition-all duration-200"
              >
                Continue Shopping
              </button>
            </div>

            {/* Additional Info */}
            <div className="pt-6 border-t border-black/10">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-black/60 mb-1">Category</p>
                  <p className="font-medium">{safeCategory}</p>
                </div>
                <div>
                  <p className="text-black/60 mb-1">SKU</p>
                  <p className="font-medium">{product.sku || "N/A"}</p>
                </div>
                <div>
                  <p className="text-black/60 mb-1">Brand</p>
                  <p className="font-medium">{brand}</p>
                </div>
                <div>
                  <p className="text-black/60 mb-1">Weight</p>
                  <p className="font-medium">{product.weight || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button - Mobile */}
      {isMobile && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-4 bg-black text-white p-3 rounded-full shadow-xl z-10 hover:bg-black/90 transition-colors"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default ProductDetails;