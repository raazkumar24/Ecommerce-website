import { useEffect, useState, useCallback } from "react";
import { getProducts } from "../services/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Search } from "lucide-react";
import ProductCard from "../components/ProductCard";
import ProductGrid from "../components/ProductGrid";
import p1 from "../assets/p1.png";
import p2 from "../assets/p2.png";
import p3 from "../assets/p3.png";
import p4 from "../assets/p4.png";
import bannerImage from "../assets/banner.png";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getProducts(keyword ? `?keyword=${keyword}` : "");
      setProducts(data);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [keyword]);

  useEffect(() => {
    const timeoutId = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timeoutId);
  }, [fetchProducts]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="bg-cover bg-center bg-no-repeat py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20"></div>

        {/* Floating Product Images */}
        {/* <img
          src={p1}
          alt="Product 1"
          className="w-32 h-auto absolute top-6 left-4 md:left-10 lg:left-16 hidden md:block rounded-lg shadow-2xl animate-float"
          style={{ animationDelay: "0s" }}
        />
        <img
          src={p2}
          alt="Product 2"
          className="w-32 h-auto absolute bottom-6 right-4 md:right-10 lg:right-16 hidden md:block rounded-lg shadow-2xl animate-float"
          style={{ animationDelay: "1s" }}
        />
        <img
          src={p3}
          alt="Product 3"
          className="w-28 h-auto absolute top-1/4 right-8 hidden lg:block rounded-lg shadow-2xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <img
          src={p4}
          alt="Product 4"
          className="w-28 h-auto absolute bottom-1/4 left-8 hidden lg:block rounded-lg shadow-2xl animate-float"
          style={{ animationDelay: "3s" }}
        /> */}

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight leading-tight">
            Discover Amazing
            <span className="block mt-2">Products</span>
          </h1>
          
          {/* Divider */}
          <div className="w-16 h-1 bg-white/60 mx-auto mb-6 sm:mb-8 rounded-full"></div>
          
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
            Browse our curated collection of high-quality items perfect for your needs.
          </p>

          {/* Search Section */}
          <div className="max-w-2xl mx-auto px-4">
            <div className="relative mb-6 sm:mb-8">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-full border-2 border-white/30 bg-white/95 px-4 sm:px-6 py-3 text-sm sm:text-base text-gray-900 placeholder-gray-600 outline-none focus:border-white focus:bg-white transition-all duration-300 shadow-2xl focus:shadow-white/20"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black text-white p-2 sm:p-3 rounded-full hover:bg-gray-800 active:scale-95 transition-all duration-200 shadow-lg">
                <Search className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </div>

            {/* Popular Keywords */}
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
              <button
                onClick={() => setKeyword("")}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-white/95 text-black rounded-full hover:bg-white active:scale-95 transition-all duration-200 shadow-lg backdrop-blur-sm"
              >
                All Products
              </button>
              <button
                onClick={() => setKeyword("laptop")}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 active:scale-95 transition-all duration-200 shadow-lg"
              >
                Laptops
              </button>
              <button
                onClick={() => setKeyword("phone")}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 active:scale-95 transition-all duration-200 shadow-lg"
              >
                Phones
              </button>
              <button
                onClick={() => setKeyword("headphones")}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 active:scale-95 transition-all duration-200 shadow-lg"
              >
                Headphones
              </button>
              <button
                onClick={() => setKeyword("camera")}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 active:scale-95 transition-all duration-200 shadow-lg"
              >
                Cameras
              </button>
            </div>

            {/* Stats */}
            <div className="mt-8 sm:mt-12 flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm">500+ Products</span>
              </div>
              <div className="w-1 h-4 bg-white/50 rounded-full hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                <span className="text-xs sm:text-sm">Free Shipping</span>
              </div>
              <div className="w-1 h-4 bg-white/50 rounded-full hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
                <span className="text-xs sm:text-sm">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-1">
                Featured Products
              </h2>
              <p className="text-black/60 text-sm sm:text-base">
                Handpicked collection of our best products
              </p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-black/90 transition-all duration-200 shadow-lg hover:shadow-black/30 self-start sm:self-center"
            >
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Products Grid */}
          <ProductGrid loading={loading} empty={products.length === 0 && !loading}>
            {products.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
          </ProductGrid>

          {/* View All Button (Mobile Bottom) */}
          {products.length > 0 && (
            <div className="mt-12 text-center lg:hidden">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-black to-gray-800 text-white rounded-xl font-semibold hover:shadow-2xl transition-all duration-300"
              >
                View All Products
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Add CSS for floating animation
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
`;
document.head.appendChild(style);

export default Home;