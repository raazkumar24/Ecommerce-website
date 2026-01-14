// import { useEffect, useState, useCallback } from "react";
// import { Link } from "react-router-dom";
// import { getProducts } from "../services/api";
// import ProductCard from "../components/ProductCard";
// import ProductGrid from "../components/ProductGrid";
// import { Search, Filter, X } from "lucide-react";

// const Products = () => {
//   const [allProducts, setAllProducts] = useState([]); // All products
//   const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [keyword, setKeyword] = useState("");
//   const [category, setCategory] = useState("");
//   const [sortBy, setSortBy] = useState("");
//   const [showFilters, setShowFilters] = useState(false);
//   const [searchInput, setSearchInput] = useState("");

//   // Fetch all products once
//   const fetchAllProducts = useCallback(async () => {
//     try {
//       setLoading(true);
//       const { data } = await getProducts(""); // Get all products
//       setAllProducts(data || []);
//       setFilteredProducts(data || []);
      
//       // Extract unique categories from products (like in dashboard)
//       const uniqueCategories = [];
//       const categoryMap = new Map();
      
//       (data || []).forEach(product => {
//         const cat = product.category;
//         if (cat) {
//           // Handle both object and string formats
//           const categoryId = cat._id || cat;
//           const categoryName = cat.name || cat;
          
//           if (categoryId && categoryName && !categoryMap.has(categoryId)) {
//             categoryMap.set(categoryId, categoryName);
//             uniqueCategories.push({
//               _id: categoryId,
//               name: categoryName
//             });
//           }
//         }
//       });
      
//       setCategories(uniqueCategories);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setAllProducts([]);
//       setFilteredProducts([]);
//       setCategories([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Apply filters locally
//   const applyFilters = useCallback(() => {
//     let result = [...allProducts];

//     // Apply keyword filter
//     if (keyword.trim()) {
//       const searchTerm = keyword.toLowerCase().trim();
//       result = result.filter(product => 
//         product.name?.toLowerCase().includes(searchTerm) ||
//         product.description?.toLowerCase().includes(searchTerm) ||
//         // product.category?.name?.toLowerCase().includes(searchTerm) ||
//         // product.category?.toLowerCase().includes(searchTerm) || // Handle string category
//         product.brand?.toLowerCase().includes(searchTerm)
//       );
//     }

//     // Apply category filter
//     if (category) {
//       result = result.filter(product => {
//         const productCategory = product.category;
//         if (!productCategory) return false;
        
//         // Check both object and string formats
//         if (typeof productCategory === 'object') {
//           return productCategory._id === category || productCategory === category;
//         } else {
//           return productCategory === category;
//         }
//       });
//     }

//     // Apply sorting
//     if (sortBy) {
//       result.sort((a, b) => {
//         switch (sortBy) {
//           case 'price': 
//             return (a.price || 0) - (b.price || 0);
//           case '-price': 
//             return (b.price || 0) - (a.price || 0);
//           case 'name': 
//             return (a.name || '').localeCompare(b.name || '');
//           case '-name': 
//             return (b.name || '').localeCompare(a.name || '');
//           case '-createdAt': 
//             return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
//           case 'createdAt': 
//             return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
//           default: 
//             return 0;
//         }
//       });
//     }

//     setFilteredProducts(result);
//   }, [allProducts, keyword, category, sortBy]);

//   useEffect(() => {
//     fetchAllProducts();
//   }, [fetchAllProducts]);

//   // Apply filters when they change
//   useEffect(() => {
//     applyFilters();
//   }, [applyFilters]);

//   // Handle search with debounce
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setKeyword(searchInput);
//     }, 300);
//     return () => clearTimeout(timeout);
//   }, [searchInput]);

//   // Clear all filters
//   const clearFilters = () => {
//     setKeyword("");
//     setSearchInput("");
//     setCategory("");
//     setSortBy("");
//   };

//   // Get active filters count
//   const activeFiltersCount = [
//     keyword ? 1 : 0,
//     category ? 1 : 0,
//     sortBy ? 1 : 0
//   ].reduce((a, b) => a + b, 0);

//   // Get category name for display
//   const getCategoryName = (categoryId) => {
//     const foundCategory = categories.find(c => c._id === categoryId);
//     return foundCategory?.name || "Selected";
//   };

//   return (
//     <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
//             <div>
//               <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2">
//                 All Products
//               </h1>
//               <p className="text-black/60 text-sm sm:text-base">
//                 {allProducts.length} products available
//               </p>
//             </div>
//             <div className="flex items-center gap-3">
//               {activeFiltersCount > 0 && (
//                 <div className="flex items-center gap-2 text-sm">
//                   <span className="bg-black text-white px-2 py-1 rounded-full text-xs">
//                     {activeFiltersCount}
//                   </span>
//                   <span className="text-black/60">active filters</span>
//                 </div>
//               )}
//               <Link
//                 to="/"
//                 className="text-sm font-medium text-black hover:text-black/70 transition-colors"
//               >
//                 ← Back to Home
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Filter Toggle */}
//         <button
//           onClick={() => setShowFilters(!showFilters)}
//           className="lg:hidden w-full flex items-center justify-center gap-2 mb-6 px-4 py-3 bg-black text-white rounded-xl font-medium hover:bg-black/90 transition-colors"
//         >
//           <Filter className="w-4 h-4" />
//           {showFilters ? "Hide Filters" : "Show Filters"}
//           {activeFiltersCount > 0 && (
//             <span className="ml-1 bg-white text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
//               {activeFiltersCount}
//             </span>
//           )}
//         </button>

//         <div className="lg:grid lg:grid-cols-4 lg:gap-8">
//           {/* Filters Sidebar */}
//           <div className={`
//             ${showFilters ? 'block' : 'hidden'} 
//             lg:block lg:col-span-1 mb-8 lg:mb-0
//           `}>
//             <div className="bg-white border border-black/10 rounded-2xl shadow-lg p-6 sticky top-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-lg font-bold text-black flex items-center gap-2">
//                   <Filter className="w-5 h-5" />
//                   Filters
//                 </h3>
//                 {activeFiltersCount > 0 && (
//                   <button
//                     onClick={clearFilters}
//                     className="text-sm text-black/60 hover:text-black flex items-center gap-1"
//                   >
//                     <X className="w-4 h-4" />
//                     Clear all
//                   </button>
//                 )}
//               </div>

//               {/* Search */}
//               <div className="mb-6">
//                 <label className="block text-sm font-semibold text-black mb-2">
//                   Search Products
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Type product name..."
//                     value={searchInput}
//                     onChange={(e) => setSearchInput(e.target.value)}
//                     className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 pl-10 pr-10 text-sm text-black placeholder-black/40 outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition"
//                   />
//                   <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
//                   {searchInput && (
//                     <button
//                       onClick={() => {
//                         setSearchInput("");
//                         setKeyword("");
//                       }}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 hover:text-black"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* Category */}
//               <div className="mb-6">
//                 <div className="flex items-center justify-between mb-2">
//                   <label className="block text-sm font-semibold text-black">
//                     Category
//                   </label>
//                   {category && (
//                     <button
//                       onClick={() => setCategory("")}
//                       className="text-xs text-black/60 hover:text-black"
//                     >
//                       Clear
//                     </button>
//                   )}
//                 </div>
//                 <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
//                   <button
//                     onClick={() => setCategory("")}
//                     className={`w-full text-left px-4 py-2 rounded-lg transition-all text-sm ${
//                       category === "" 
//                         ? "bg-black text-white" 
//                         : "bg-black/5 hover:bg-black/10 text-black"
//                     }`}
//                   >
//                     All Categories
//                   </button>
//                   {loading ? (
//                     <div className="text-center py-4 text-black/60 text-sm">
//                       Loading categories...
//                     </div>
//                   ) : categories.length > 0 ? (
//                     categories.map((cat) => (
//                       <button
//                         key={cat._id}
//                         onClick={() => setCategory(cat._id)}
//                         className={`w-full text-left px-4 py-2 rounded-lg transition-all text-sm ${
//                           category === cat._id 
//                             ? "bg-black text-white" 
//                             : "bg-black/5 hover:bg-black/10 text-black"
//                         }`}
//                       >
//                         {cat.name}
//                       </button>
//                     ))
//                   ) : (
//                     <div className="text-center py-4 text-black/60 text-sm">
//                       No categories found
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Sort */}
//               <div className="mb-6">
//                 <div className="flex items-center justify-between mb-2">
//                   <label className="block text-sm font-semibold text-black">
//                     Sort By
//                   </label>
//                   {sortBy && (
//                     <button
//                       onClick={() => setSortBy("")}
//                       className="text-xs text-black/60 hover:text-black"
//                     >
//                       Clear
//                     </button>
//                   )}
//                 </div>
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm text-black outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition"
//                 >
//                   <option value="">Featured</option>
//                   <option value="price">Price: Low to High</option>
//                   <option value="-price">Price: High to Low</option>
//                   <option value="name">Name: A to Z</option>
//                   <option value="-name">Name: Z to A</option>
//                   <option value="-createdAt">Newest First</option>
//                   <option value="createdAt">Oldest First</option>
//                 </select>
//               </div>

//               {/* Active Filters Summary */}
//               {(keyword || category || sortBy) && (
//                 <div className="border-t border-black/10 pt-6">
//                   <h4 className="text-sm font-semibold text-black mb-3">Active Filters</h4>
//                   <div className="space-y-2">
//                     {keyword && (
//                       <div className="flex items-center justify-between text-sm">
//                         <span className="text-black/70">Search:</span>
//                         <div className="flex items-center gap-1">
//                           <span className="font-medium">"{keyword}"</span>
//                           <button
//                             onClick={() => {
//                               setKeyword("");
//                               setSearchInput("");
//                             }}
//                             className="text-black/40 hover:text-black ml-1"
//                           >
//                             <X className="w-3 h-3" />
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                     {category && (
//                       <div className="flex items-center justify-between text-sm">
//                         <span className="text-black/70">Category:</span>
//                         <div className="flex items-center gap-1">
//                           <span className="font-medium">
//                             {getCategoryName(category)}
//                           </span>
//                           <button
//                             onClick={() => setCategory("")}
//                             className="text-black/40 hover:text-black ml-1"
//                           >
//                             <X className="w-3 h-3" />
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                     {sortBy && (
//                       <div className="flex items-center justify-between text-sm">
//                         <span className="text-black/70">Sort:</span>
//                         <div className="flex items-center gap-1">
//                           <span className="font-medium">
//                             {sortBy === "price" ? "Price: Low to High" :
//                              sortBy === "-price" ? "Price: High to Low" :
//                              sortBy === "name" ? "Name: A to Z" :
//                              sortBy === "-name" ? "Name: Z to A" :
//                              sortBy === "-createdAt" ? "Newest First" : "Oldest First"}
//                           </span>
//                           <button
//                             onClick={() => setSortBy("")}
//                             className="text-black/40 hover:text-black ml-1"
//                           >
//                             <X className="w-3 h-3" />
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Products Grid */}
//           <div className="lg:col-span-3">
//             {/* Results Header */}
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//               <div className="flex items-center gap-2">
//                 <span className="text-black/60">Showing</span>
//                 <span className="font-bold text-black">{filteredProducts.length}</span>
//                 <span className="text-black/60">of {allProducts.length} products</span>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {category && (
//                   <div className="inline-flex items-center gap-1 bg-black/5 px-3 py-1 rounded-full text-sm">
//                     <span className="text-black/60">Category:</span>
//                     <span className="font-medium">
//                       {getCategoryName(category)}
//                     </span>
//                     <button
//                       onClick={() => setCategory("")}
//                       className="text-black/40 hover:text-black ml-1"
//                     >
//                       <X className="w-3 h-3" />
//                     </button>
//                   </div>
//                 )}
//                 {keyword && (
//                   <div className="inline-flex items-center gap-1 bg-black/5 px-3 py-1 rounded-full text-sm">
//                     <span className="text-black/60">Search:</span>
//                     <span className="font-medium">"{keyword}"</span>
//                     <button
//                       onClick={() => {
//                         setKeyword("");
//                         setSearchInput("");
//                       }}
//                       className="text-black/40 hover:text-black ml-1"
//                     >
//                       <X className="w-3 h-3" />
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Products */}
//             <ProductGrid 
//               loading={loading} 
//               empty={filteredProducts.length === 0 && !loading}
//               gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
//             >
//               {filteredProducts.map((product, index) => (
//                 <ProductCard key={product._id} product={product} index={index} />
//               ))}
//             </ProductGrid>

//             {/* Empty State */}
//             {filteredProducts.length === 0 && !loading && (
//               <div className="text-center py-16">
//                 <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-black/5 flex items-center justify-center">
//                   <Search className="w-12 h-12 text-black/30" />
//                 </div>
//                 <h3 className="text-2xl font-semibold text-black mb-3">
//                   No products found
//                 </h3>
//                 <p className="text-black/60 mb-6 max-w-md mx-auto">
//                   {keyword || category || sortBy 
//                     ? "Try adjusting your search or filters to find what you're looking for."
//                     : "There are currently no products available."}
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                   {(keyword || category || sortBy) && (
//                     <button
//                       onClick={clearFilters}
//                       className="px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-black/90 transition-colors"
//                     >
//                       Clear All Filters
//                     </button>
//                   )}
//                   <Link
//                     to="/"
//                     className="px-6 py-3 border border-black text-black rounded-xl font-medium hover:bg-black hover:text-white transition-colors"
//                   >
//                     Back to Homepage
//                   </Link>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Products;
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getProducts } from "../services/api";
import ProductGrid from "../components/ProductGrid";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/common/FilterSidebar";
import useProductFilters from "../hooks/useProductFilters";
import { ChevronRight, SlidersHorizontal, Package, X, Filter } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // 🔗 URL → filters
  const filters = {
    keyword: searchParams.get("keyword") || "",
    category: searchParams.get("category") || "",
    sortBy: searchParams.get("sortBy") || "",
  };

  // 🧠 Apply filters
  const filteredProducts = useProductFilters(products, filters);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await getProducts("");
        setProducts(data || []);

        const uniqueCats = Array.from(
          new Map(data.map((p) => [p.category?._id, p.category])).values()
        ).filter(Boolean);
        
        setCategories(uniqueCats);
      } catch (err) {
        console.error("Fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateFilter = (key, value) => {
    const params = Object.fromEntries(searchParams);
    if (!value) delete params[key];
    else params[key] = value;
    setSearchParams(params);
    // Close drawer on mobile after selecting a filter
    if (window.innerWidth < 1024) setIsMobileFilterOpen(false);
  };

  const clearFilters = () => {
    setSearchParams({});
    if (window.innerWidth < 1024) setIsMobileFilterOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        
        {/* --- HEADER --- */}
        <header className="mb-12">
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-4">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <ChevronRight size={10} />
            <span className="text-black">Catalog</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl font-black tracking-tighter uppercase leading-none">
                All Products
              </h1>
              <p className="text-gray-500 mt-2 font-medium">
                Found {filteredProducts.length} premium items
              </p>
            </div>

            {/* Mobile Filter Trigger Button */}
            <div className="lg:hidden w-full md:w-auto">
              <button 
                onClick={() => setIsMobileFilterOpen(true)}
                className="w-full md:w-auto flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-black/10 active:scale-95 transition-all"
              >
                <SlidersHorizontal size={18} /> Filters
              </button>
            </div>
          </div>
        </header>

        <div className="lg:grid lg:grid-cols-4 gap-12 items-start">
          
          {/* --- DESKTOP SIDEBAR --- */}
          <aside className="hidden lg:block sticky top-28">
            <div className="flex items-center gap-2 mb-8 text-black">
              <Filter size={18} />
              <span className="font-black uppercase tracking-widest text-xs">Refine Search</span>
            </div>
            <FilterSidebar
              categories={categories}
              filters={filters}
              onChange={updateFilter}
              onClear={clearFilters}
            />
          </aside>

          {/* --- MOBILE DRAWER OVERLAY --- */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-100 lg:hidden">
              {/* Backdrop blurs the background */}
              <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" 
                onClick={() => setIsMobileFilterOpen(false)}
              />
              
              {/* Drawer Content */}
              <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white p-8 shadow-2xl animate-in animate-slide-in-from-right duration-500 overflow-y-auto rounded-l-[3rem]">
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-black rounded-xl text-white"><SlidersHorizontal size={16} /></div>
                    <h3 className="font-black uppercase tracking-[0.2em] text-xs">Filters</h3>
                  </div>
                  <button 
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-3 bg-gray-100 rounded-2xl hover:bg-black hover:text-white transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                <FilterSidebar
                  categories={categories}
                  filters={filters}
                  onChange={updateFilter}
                  onClear={clearFilters}
                />
              </div>
            </div>
          )}

          {/* --- PRODUCTS GRID --- */}
          <div className="lg:col-span-3">
            <ProductGrid
              loading={loading}
              empty={filteredProducts.length === 0}
              gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredProducts.map((p, i) => (
                <ProductCard key={p._id} product={p} index={i} />
              ))}
            </ProductGrid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;