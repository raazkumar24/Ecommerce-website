import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleProduct } from "../services/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { ChevronLeft, ShoppingCart, Check, ChevronRight, ChevronUp } from "lucide-react";
import toast from "react-hot-toast";

// API base URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

const ProductDetails = () => {
  const { id } = useParams(); // get product id from URL
  const navigate = useNavigate(); // navigation hook
  const { user } = useAuth(); // get current user
  const { cart, addToCart, loading } = useCart(); // cart context
  const [product, setProduct] = useState(null); // product state
  const [isInCart, setIsInCart] = useState(false); // check if product is in cart
  const [activeImg, setActiveImg] = useState(0); // active image index
  const [loadingProduct, setLoadingProduct] = useState(true); // loading state
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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

  // Navigate images on mobile
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

  // Fetch product on component mount
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  // Check if product is in cart whenever cart or product changes
  useEffect(() => {
    checkIsInCart();
  }, [checkIsInCart]);

  // Loading state
  if (loadingProduct) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-8">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-8">
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4">Product not found</h2>
          <button
            onClick={() => navigate("/")}
            className="px-4 sm:px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-black/90 transition-colors w-full sm:w-auto"
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
    }
  };

  // Safe category rendering
  const safeCategory = product.category?.name || product.category || "Uncategorized";

  // stock status
  const stockStatus = product.stock > 0 ? "In Stock" : "Out of Stock";

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile back button - sticky */}
      {isMobile && (
        <div className="sticky top-0 z-10 bg-white border-b border-black/10 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-black hover:text-black/70 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2 bg-black/5 rounded-full"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Breadcrumb - Desktop only */}
      {!isMobile && (
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-black/10">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center space-x-2 text-sm text-black/70">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-1 hover:text-black transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Home
              </button>
              <span>/ {product.name}</span>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-20 items-start">
          {/* Image Gallery */}
          <div className="space-y-4 sm:space-y-6">
            {/* Main Image with navigation on mobile */}
            <div className="relative group">
              {isMobile && product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg z-10"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg z-10"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              
              <img
                src={`${API_URL}${product.images?.[activeImg] || product.images?.[0]}`}
                alt={product.name}
                className="w-full aspect-square sm:aspect-6/5 object-contain rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl group-hover:scale-105 transition-transform duration-500 cursor-pointer p-4 sm:p-6 lg:p-10"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 sm:group-hover:bg-black/20 rounded-xl sm:rounded-2xl transition-colors"></div>
              
              {/* Image indicator for mobile */}
              {isMobile && product.images && product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {product.images.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        activeImg === i ? 'bg-black' : 'bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnails - Desktop only */}
            {!isMobile && product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`shrink-0 w-16 lg:w-20 aspect-square rounded-xl border-2 transition-all duration-200 hover:scale-100 ${
                      activeImg === i
                        ? "border-black shadow-md"
                        : "border-black/20 hover:border-black/50"
                    }`}
                    style={{
                      backgroundImage: `url(${API_URL}${img})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-4 sm:space-y-6 lg:sticky lg:top-24">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-3 sm:mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-black mb-4 sm:mb-6">
                ₹{product.price?.toLocaleString() || product.price} 
              </p>
            </div>

            <div className="prose prose-sm max-w-none text-black/80 leading-relaxed text-sm sm:text-base">
              <p>{product.description}</p>
            </div>

            {/* Stock Status - Mobile only */}
            {isMobile && (
              <div className="flex items-center justify-between py-3 border-y border-black/10">
                <span className="font-medium">Stock Status:</span>
                <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stockStatus}
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 sm:space-y-4">
              <button
                onClick={handleButtonClick}
                disabled={loading}
                className={`group w-full flex items-center justify-center gap-3 px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-lg transition-all duration-200 ${
                  isInCart
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/25"
                    : "bg-black hover:bg-black/90 text-white shadow-black/20 hover:shadow-black/40"
                } ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                    Adding...
                  </>
                ) : isInCart ? (
                  <>
                    <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                    Go to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                    Add to Cart
                  </>
                )}
              </button>

              {isInCart && (
                <button
                  onClick={() => navigate("/cart")}
                  className="w-full flex items-center justify-center gap-3 px-4 sm:px-8 py-3 sm:py-4 rounded-xl border border-black text-black font-semibold hover:bg-black hover:text-white transition-all duration-200"
                >
                  View Cart
                </button>
              )}
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm text-black/70 pt-4 sm:pt-6 border-t border-black/10">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Category:</span>
                <span>{safeCategory}</span>
              </div>
              {!isMobile && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Stock Status:</span>
                  <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                    {stockStatus}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;