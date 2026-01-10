import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleProduct } from "../services/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { ChevronLeft, ShoppingCart, Check } from "lucide-react";
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
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="text-center">
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
    }
  };

  // Safe category rendering
  const safeCategory = product.category?.name || product.category || "Uncategorized";

  // stock status
  const stockStatus = product.stock > 0 ? "In Stock" : "Out of Stock";

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 border-b border-black/10">
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

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image Gallery */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative group">
              <img
                src={`${API_URL}${product.images?.[activeImg] || product.images?.[0]}`}
                alt={product.name}
                className="w-full aspect-6/5 object-contain rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500 cursor-pointer p-10"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-2xl transition-colors"></div>
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`shrink-0 w-20 aspect-square rounded-xl border-2 object-cover transition-all duration-200 hover:scale-105 ${
                      activeImg === i
                        ? "border-black shadow-md"
                        : "border-black/20 hover:border-black/50"
                    }`}
                    style={{
                      backgroundImage: `url(${API_URL}${img})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      // objectFit: "contain",
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-black mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="text-2xl lg:text-3xl font-semibold text-black mb-6">
                ₹{product.price?.toLocaleString() || product.price} 
              </p>
            </div>

            <div className="prose prose-sm max-w-none text-black/80 leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleButtonClick}
                disabled={loading}
                className={`group w-full lg:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-200 ${
                  isInCart
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/25"
                    : "bg-black hover:bg-black/90 text-white shadow-black/20 hover:shadow-black/40"
                } ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
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
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>

              {isInCart && (
                <button
                  onClick={() => navigate("/cart")}
                  className="w-full lg:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-black text-black font-semibold hover:bg-black hover:text-white transition-all duration-200"
                >
                  View Cart
                </button>
              )}
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-4 text-sm text-black/70 pt-6 border-t border-black/10">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Category:</span>
                <span>{safeCategory}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Stock Status:</span>
                <span>{stockStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
