import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import ProductGrid from "../components/ProductGrid";
import { Search, Filter } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get(
        `/products?keyword=${keyword}&category=${category}&sort=${sortBy}`
      );
      setProducts(data);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [keyword, category, sortBy]);

  const fetchCategories = useCallback(async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
    } catch {
      setCategories([]);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const timeout = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timeout);
  }, [fetchProducts]);

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2">
            All Products
          </h1>
          <p className="text-black/60 text-sm sm:text-base">
            Browse our complete collection of products
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden w-full flex items-center justify-center gap-2 mb-6 px-4 py-3 bg-black text-white rounded-xl font-medium"
        >
          <Filter className="w-4 h-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className={`
            ${showFilters ? 'block' : 'hidden'} 
            lg:block lg:col-span-1 mb-8 lg:mb-0
          `}>
            <div className="bg-white border border-black/10 rounded-2xl shadow-lg p-6 sticky top-6">
              <h3 className="text-lg font-bold text-black mb-6 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-black mb-2">
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 pl-10 text-sm text-black placeholder-black/40 outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition"
                  />
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translateY-1/2 text-black/40" />
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-black mb-2">
                  Category
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setCategory("")}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${category === "" ? "bg-black text-white" : "bg-black/5 hover:bg-black/10"}`}
                  >
                    All Categories
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c._id}
                      onClick={() => setCategory(c._id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all ${category === c._id ? "bg-black text-white" : "bg-black/5 hover:bg-black/10"}`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-black mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm text-black outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition"
                >
                  <option value="">Featured</option>
                  <option value="price">Price: Low to High</option>
                  <option value="-price">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                  <option value="-name">Name: Z to A</option>
                  <option value="-createdAt">Newest First</option>
                </select>
              </div>

              {/* Reset Filters */}
              {(keyword || category || sortBy) && (
                <button
                  onClick={() => {
                    setKeyword("");
                    setCategory("");
                    setSortBy("");
                  }}
                  className="w-full py-3 text-center text-black/70 hover:text-black border border-black/20 hover:border-black/40 rounded-xl font-medium transition-all hover:scale-[1.02]"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-black/60">Showing</span>
                <span className="font-bold text-black">{products.length}</span>
                <span className="text-black/60">products</span>
              </div>
              <div className="hidden lg:block text-sm text-black/60">
                {category && `Category: ${categories.find(c => c._id === category)?.name}`}
              </div>
            </div>

            {/* Products */}
            <ProductGrid 
              loading={loading} 
              empty={products.length === 0 && !loading}
              gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            >
              {products.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </ProductGrid>

            {/* Empty State with Browse Button */}
            {products.length === 0 && !loading && (
              <div className="text-center py-12">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-black/90 transition-colors"
                >
                  Browse Homepage
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;