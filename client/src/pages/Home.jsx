import { useEffect, useState, useCallback } from "react";
import { getProducts } from "../services/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Search } from "lucide-react";
import p1 from "../assets/p1.png";
import p2 from "../assets/p2.png";
import p3 from "../assets/p3.png";
import p4 from "../assets/p4.png";
import bannerImage from "../assets/banner.png";

// API base URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch products from the API
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

  // Fetch products when keyword changes
  useEffect(() => {
    const timeoutId = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timeoutId);
  }, [fetchProducts]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="bg-cover bg-center bg-no-repeat py-20 px-4 sm:px-6 lg:px-8 relative"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        {/* Clean black overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Product images with subtle shadow */}
        <img
          src={p1}
          alt="Product 1"
          className="w-40 h-auto absolute top-6 left-6 lg:left-16 hidden md:block rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
        />

        <img
          src={p2}
          alt="Product 2"
          className="w-40 h-auto absolute bottom-6 right-6 lg:right-16 hidden md:block rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Title with subtle text shadow */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Discover Amazing Products
          </h1>

          {/* Subtle divider */}
          <div className="w-20 h-1 bg-white mx-auto mb-8"></div>

          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Browse our curated collection of high-quality items perfect for your
            needs.
          </p>

          {/* Search section */}
          <div className="max-w-2xl mx-auto">
            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-full border-2 border-white/30 bg-white/95 px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg text-gray-900 placeholder-gray-600 outline-none focus:border-white focus:bg-white transition-all duration-200 shadow-xl"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black text-white p-2 sm:p-3 rounded-full hover:bg-gray-800 active:scale-95 transition-all duration-200 shadow-lg">
                <Search className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </div>

            {/* Popular keywords - simple black and white style */}
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
              {/* <span className="text-white text-xs sm:text-sm font-medium self-center">Popular:</span> */}
              <button
                onClick={() => setKeyword("")}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-black text-white rounded-full hover:bg-gray-800 active:scale-95 transition-all duration-200 shadow-lg border border-white/20"
              >
                All
              </button>
              <button
                onClick={() => setKeyword("laptop")}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-white text-black rounded-full hover:bg-gray-100 active:scale-95 transition-all duration-200 shadow-lg border border-black/20"
              >
                Laptops
              </button>
              <button
                onClick={() => setKeyword("phone")}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-white text-black rounded-full hover:bg-gray-100 active:scale-95 transition-all duration-200 shadow-lg border border-black/20"
              >
                Phones
              </button>
              <button
                onClick={() => setKeyword("headphones")}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-white text-black rounded-full hover:bg-gray-100 active:scale-95 transition-all duration-200 shadow-lg border border-black/20"
              >
                Headphones
              </button>
              <button
                onClick={() => setKeyword("camera")}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-white text-black rounded-full hover:bg-gray-100 active:scale-95 transition-all duration-200 shadow-lg border border-black/20"
              >
                Cameras
              </button>
            </div>

            {/* Simple stats */}
            <div className="mt-12 flex justify-center items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">500+ Products</span>
              </div>
              <div className="w-1 h-4 bg-white/50 rounded-full"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="w-1 h-4 bg-white/50 rounded-full"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-semibold text-black sm:text-4xl">
              Featured Products
              <span className="ml-2 text-xl text-black/50">
                ({products.length})
              </span>
            </h2>

            {/* View All Button (link to products page) */}
            <Link
              to="/products"
              className="text-black/70 hover:text-black font-medium text-sm flex items-center gap-1 hover:underline"
            >
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-black/5 rounded-xl p-6 h-80"></div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-24 h-24 bg-black/5 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl">
                  <Search className="w-10 h-10 text-black/30" />
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-black mb-2">
                No products found
              </h3>
              <p className="text-black/70 mb-6">
                Try adjusting your search or browse all products.
              </p>
              <Link
                to="/products"
                className="inline-block px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-black/90 transition-colors"
              >
                Browse All Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  className="group block"
                >
                  <div className="bg-white border border-black/10 rounded-2xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden hover:border-black/20">
                    {/* Image */}
                    <div className="relative h-48 md:h-52 mb-4 overflow-hidden rounded-xl bg-black/5 group-hover:bg-black/10 transition-colors">
                      <img
                        src={`${API_URL}${product.images?.[0]}`}
                        alt={product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 p-2" //adding padding for better view
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 bg-black text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200">
                        Quick View
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3
                        className="font-semibold text-lg text-black overflow-hidden text-ellipsis whitespace-nowrap max-w-full group-hover:text-black/90 transition-colors"
                        title={product.name}
                      >
                        {product.name}
                      </h3>

                      <p className="text-xl font-bold text-black">
                        ₹{product.price.toLocaleString()}
                      </p>

                      <div className="flex items-center gap-2 pt-2">
                        <span className="text-sm text-black/70 font-medium">
                          View Details
                        </span>
                        <svg
                          className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
