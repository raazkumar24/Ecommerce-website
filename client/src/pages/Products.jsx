import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import { Search } from "lucide-react";

// API base URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

const Products = () => {
  const [products, setProducts] = useState([]); // all products
  const [categories, setCategories] = useState([]); // product categories
  const [loading, setLoading] = useState(true); // loading state
  const [keyword, setKeyword] = useState(""); // search keyword
  const [category, setCategory] = useState(""); // selected category

  // Fetch products from API with filters
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get(
        `/products?keyword=${keyword}&category=${category}`
      );
      setProducts(data); // set fetched products
    } catch {
      setProducts([]); // on error, set products to empty
    } finally {
      setLoading(false);
    }
  }, [keyword, category]);

  const fetchCategories = useCallback(async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
    } catch {
      setCategories([]);
    }
  }, []);

  // Fetch products and categories on mount
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Fetch products when keyword or category changes
  useEffect(() => {
    const timeout = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timeout);
  }, [fetchProducts]);

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
              Products
            </h1>
            <p className="text-black/60">
              Browse all available products and refine with search & filters.
            </p>
          </div>
          <p className="text-sm text-black/50">
            Showing{" "}
            <span className="font-semibold text-black">{products.length}</span>{" "}
            result{products.length !== 1 && "s"}
          </p>
        </div>

        {/* Filter bar */}
        <div className="mb-10 bg-white border border-black/10 rounded-2xl shadow-lg p-4 sm:p-6">
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            {/* Search */}
            <div className="flex-1">
              <label className="block text-xs font-semibold text-black/60 mb-1 uppercase tracking-wide">
                Search
              </label>
              <input
                type="text"
                placeholder="Search products..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm text-black placeholder-black/40 outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition"
              />
            </div>

            {/* Category */}
            <div className="w-full md:w-60">
              <label className="block text-xs font-semibold text-black/60 mb-1 uppercase tracking-wide">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm text-black outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition"
              >
                <option value="">All categories</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid - Updated to match Home page style */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-black/5 rounded-xl p-6 h-80"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-black/5 flex items-center justify-center text-3xl">
              <Search className="w-12 h-12 text-black/30" />
            </div>
            <h2 className="text-2xl font-semibold text-black mb-2">
              No products found
            </h2>
            <p className="text-black/60 mb-4">
              Try changing your search or selecting a different category.
            </p>
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
                      src={
                        product.images?.length > 0
                          ? `${API_URL}${product.images[0]}`
                          : "/placeholder.png"
                      }
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
                      ₹{product.price?.toLocaleString()}
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
  );
};

export default Products;
