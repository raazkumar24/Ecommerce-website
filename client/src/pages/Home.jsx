import { useEffect, useState, useCallback } from "react";
import { getProducts } from "../services/api";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductGrid from "../components/ProductGrid";
import { Search } from "lucide-react";
import p1 from "../assets/p1.png";
import p2 from "../assets/p2.png";
import p3 from "../assets/p3.png";
import p4 from "../assets/p4.png";
import bannerImage from "../assets/banner.png";

if (!import.meta.env.VITE_API_URL) {
  console.error("VITE_API_URL is missing");
}

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [allProducts, setAllProducts] = useState([]); // All products
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
  const [keyword, setKeyword] = useState(""); // Search keyword
  const [loading, setLoading] = useState(false);

  // Fetch all products once
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getProducts(""); // Get all products
      setAllProducts(data || []);
      setFilteredProducts(data || []); // Initially show all
    } catch (error) {
      console.error("Error fetching products:", error);
      setAllProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter products based on keyword
  useEffect(() => {
    if (!keyword.trim()) {
      setFilteredProducts(allProducts);
      return;
    }

    const searchTerm = keyword.toLowerCase().trim();
    const filtered = allProducts.filter(
      (product) =>
        product.name?.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm) ||
        product.category?.name?.toLowerCase().includes(searchTerm) ||
        product.brand?.toLowerCase().includes(searchTerm)
    );

    setFilteredProducts(filtered);
  }, [keyword, allProducts]);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const featuredProduct = allProducts?.[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative min-h-[90vh] sm:min-h-screen overflow-hidden">
        {/* Background with your banner image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bannerImage})` }}
        >
          {/* Dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-black/80"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="text-center lg:text-left animate-fade-in-up">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-linear-to-r from-gray-900 to-black text-white px-4 py-2 rounded-full mb-6 shadow-xl border border-white/20">
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    🎯 Premium Collection
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  <span className="block bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Elevate Your
                  </span>
                  <span className="block bg-linear-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
                    Tech Experience
                  </span>
                </h1>

                {/* Subheading */}
                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Discover premium electronics with sleek design, superior
                  performance, and exceptional quality.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10 sm:mb-12 justify-center lg:justify-start">
                  <Link
                    to="/products"
                    className="group relative px-8 py-4 bg-linear-to-r from-black to-gray-900 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-800/50 border border-white/20 text-center"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <span>Shop Now</span>
                      <svg
                        className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
                  <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      {allProducts.length || 0}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-300">
                      Products
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      24/7
                    </div>
                    <div className="text-xs sm:text-sm text-gray-300">
                      Support
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                      Free
                    </div>
                    <div className="text-xs sm:text-sm text-gray-300">
                      Shipping
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Product Showcase */}
              <div className="relative mt-12 lg:mt-0">
                {/* Main Product Display */}
                <div className="relative max-w-lg mx-auto">
                  {/* Floating Product Cards */}
                  <div className="absolute -top-10 -left-4 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 animate-float z-20">
                    <img
                      src={p1}
                      alt="Product 1"
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>

                  <div
                    className="absolute -bottom-30 -right-4 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32  animate-float z-20"
                    style={{ animationDelay: "1.5s" }}
                  >
                    <img
                      src={p2}
                      alt="Product 2"
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>

                  <div
                    className="absolute top-2/4 -left-8 w-16 h-16 sm:w-20 sm:h-20 animate-float z-10"
                    style={{ animationDelay: "2.5s" }}
                  >
                    <img
                      src={p3}
                      alt="Product 3"
                      className="w-full h-full object-contain rounded"
                    />
                  </div>

                  <div
                    className="absolute bottom-2/4 -right-2 w-16 h-16 sm:w-25 sm:h-25 animate-float z-10"
                    style={{ animationDelay: "3s" }}
                  >
                    <img
                      src={p4}
                      alt="Product 4"
                      className="w-full h-full object-contain rounded"
                    />
                  </div>

                  {/* Central Featured Product */}
                  {/* RIGHT HERO IMAGE (UPDATED – REAL PRODUCT) */}
                  <div className="relative flex justify-center">
                    {featuredProduct && (
                      <div
                        className="relative w-75 sm:w-90 md:w-105
                                aspect-square rounded-3xl overflow-hidden
                                bg-linear-to-b from-black/10 via-black/30 to-black/10 shadow-2xl shadow-black/60
                                border border-white/20
                                transition-transform duration-500 hover:scale-105"
                      >
                        <img
                          src={`${API_URL}${featuredProduct.images?.[0]}`}
                          alt={featuredProduct.name}
                          className="w-full h-full object-contain"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

                        <div className="absolute bottom-4 left-4 right-4">
                          {/* <h3 className="text-white text-sm font-semibold truncate">
                            {featuredProduct.name}
                          </h3> */}
                        </div>
                      </div>
                    )}

                    {/* Glow */}
                    <div className="absolute w-120 h-120 bg-white/10 blur-3xl rounded-full -z-10" />
                  </div>
                </div>

                {/* Search Bar */}
                <div className="absolute -bottom-6 left-0 right-0 mx-auto max-w-xl px-4">
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Search for products..."
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-4 pl-14 text-white placeholder-gray-400 outline-none focus:border-white focus:bg-white/15 transition-all duration-300 shadow-2xl focus:shadow-white/20"
                    />
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white px-6 py-2.5 rounded-full font-medium hover:bg-gray-900 transition-all duration-300 hover:scale-105 border border-white/20">
                      Search
                    </button>
                  </div>

                  {/* Quick Search Tags */}
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {["Laptops", "Phones", "Headphones", "Cameras"].map(
                      (tag, index) => (
                        <button
                          key={tag}
                          onClick={() => setKeyword(tag.toLowerCase())}
                          className="px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-xs text-gray-300 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300 hover:scale-105"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          {tag}
                        </button>
                      )
                    )}
                  </div>
                </div>
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
                {keyword
                  ? `Search Results for "${keyword}"`
                  : "Featured Products"}
              </h2>
              <p className="text-black/60 text-sm sm:text-base">
                {keyword
                  ? `Found ${filteredProducts.length} product${
                      filteredProducts.length !== 1 ? "s" : ""
                    }`
                  : "Handpicked collection of our best products"}
              </p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-black/90 transition-all duration-200 shadow-lg hover:shadow-black/30 self-start sm:self-center"
            >
              View All
              <svg
                className="w-4 h-4"
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
            </Link>
          </div>

          {/* Products Grid */}
          <ProductGrid
            loading={loading}
            empty={filteredProducts.length === 0 && !loading}
            gridCols="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
          </ProductGrid>

          {/* View All Button (Mobile Bottom) */}
          {filteredProducts.length > 0 && (
            <div className="mt-12 text-center lg:hidden">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-black to-gray-800 text-white rounded-xl font-semibold hover:shadow-2xl transition-all duration-300"
              >
                View All Products
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          )}

          {/* Search Results Empty State */}
          {keyword && filteredProducts.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-black/5 flex items-center justify-center">
                <Search className="w-12 h-12 text-black/30" />
              </div>
              <h3 className="text-2xl font-semibold text-black mb-3">
                No products found for "{keyword}"
              </h3>
              <p className="text-black/60 mb-6">
                Try a different search term or browse all products.
              </p>
              <button
                onClick={() => setKeyword("")}
                className="px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-black/90 transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
