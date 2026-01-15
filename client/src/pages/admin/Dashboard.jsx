// import { useEffect, useState } from "react";
// import api from "../../services/api";
// import { Link } from "react-router-dom";
// import toast from "react-hot-toast";
// import { 
//   Plus, 
//   Edit3, 
//   Trash2, 
//   Search, 
//   Eye, 
//   Package, 
//   Grid, 
//   Filter, 
//   TrendingUp,
//   DollarSign,
//   ChevronRight,
//   ArrowUpRight,
//   CheckCircle,
//   XCircle,
//   BarChart3
// } from "lucide-react";

// const Dashboard = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [sortBy, setSortBy] = useState("newest");

//   // Handle responsive breakpoints
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 1024);
//     };
    
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Fetch products from API
//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const { data } = await api.get("/products");
//       setProducts(data);
//     } catch (error) {
//       toast.error("Failed to load products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete product
//   const deleteProduct = async (id, name) => {
//     if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

//     try {
//       await api.delete(`/products/${id}`);
//       toast.success("Product deleted successfully");
//       fetchProducts();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Delete failed");
//     }
//   };

//   // Get unique categories
//   const categories = ["all", ...new Set(products.map(p => p.category?.name || "Uncategorized"))];

//   // Filter products
//   const filteredProducts = products.filter((product) => {
//     const matchesSearch = 
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.category?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.description?.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesCategory = 
//       selectedCategory === "all" || 
//       (product.category?.name || "Uncategorized") === selectedCategory;

//     return matchesSearch && matchesCategory;
//   });

//   // Sort products
//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     switch (sortBy) {
//       case "name":
//         return a.name.localeCompare(b.name);
//       case "price-low":
//         return (a.price || 0) - (b.price || 0);
//       case "price-high":
//         return (b.price || 0) - (a.price || 0);
//       case "newest":
//         return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
//       case "oldest":
//         return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
//       default:
//         return 0;
//     }
//   });

//   // Calculate stats
//   const totalProducts = products.length;
//   const totalValue = products.reduce((sum, p) => sum + (p.price || 0) * (p.stock || 0), 0);
//   const inStockProducts = products.filter(p => (p.stock || 0) > 0).length;
//   const outOfStockProducts = totalProducts - inStockProducts;

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-linear-to-b from-white to-gray-50 flex items-center justify-center p-8">
//         <div className="flex flex-col items-center gap-4">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
//           <div className="text-center">
//             <span className="text-black font-medium">Loading Products</span>
//             <p className="text-sm text-black/60 mt-1">Please wait a moment...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-b from-white to-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b border-black/10 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Mobile Header */}
//           {isMobile ? (
//             <div className="space-y-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h1 className="text-2xl font-bold text-black">Dashboard</h1>
//                   <p className="text-sm text-black/60 mt-1">{totalProducts} products</p>
//                 </div>

//                 {/* Categories Link */}
//                 <Link
//                   to="/admin/categories"
//                   className="group flex items-center gap-3 text-black text-sm font-medium hover:text-black/80 transition-all duration-200"
//                 >
//                   <span>Categories</span>
//                 </Link>

//                 {/* Add Product Button */}
//                 <Link
//                   to="/admin/add-product"
//                   className="bg-black text-white p-3 rounded-xl shadow-lg"
//                 >
//                   <Plus className="w-5 h-5" />
//                 </Link>
//               </div>
              
//               {/* Mobile Search */}
//               <div className="relative">
//                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-black/20 bg-white placeholder-black/40 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>
//           ) : (
//             /* Desktop Header */
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//               <div>
//                 <h1 className="text-3xl lg:text-4xl font-bold text-black mb-2 bg-linear-to-r from-black to-black/70 bg-clip-text">
//                   Admin Dashboard
//                 </h1>
//                 <p className="text-lg lg:text-xl text-black/60 flex items-center gap-2">
//                   <span>Manage your product catalog</span>
//                   <ChevronRight className="w-4 h-4" />
//                   <span className="font-semibold text-black">{sortedProducts.length} products found</span>
//                 </p>
//               </div>

//               <div className="flex items-center gap-4 flex-wrap">
//                 {/* Categories Link */}
//                 <Link
//                   to="/admin/categories"
//                   className="group flex items-center gap-3 bg-linear-to-r from-gray-800 to-black hover:from-black hover:to-gray-800 text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
//                 >
//                   <Grid className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                   <span className="hidden sm:inline">Categories</span>
//                 </Link>

//                 {/* Add Product Button */}
//                 <Link
//                   to="/admin/add-product"
//                   className="group flex items-center gap-3 bg-linear-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black text-white px-6 py-3.5 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
//                 >
//                   <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                   <span className="hidden sm:inline">Add Product</span>
//                   <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Stats & Filters */}
//       <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//         <div className="max-w-7xl mx-auto">
//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
//             {/* Total Products */}
//             <div className="bg-linear-to-br from-white to-gray-50 border border-black/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
//               <div className="flex items-start justify-between mb-4">
//                 <div className="w-14 h-14 bg-linear-to-br from-blue-500/10 to-blue-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   <Package className="w-7 h-7 text-blue-600" />
//                 </div>
//                 <TrendingUp className="w-5 h-5 text-green-500" />
//               </div>
//               <h3 className="text-2xl lg:text-3xl font-bold text-black mb-1">
//                 {totalProducts}
//               </h3>
//               <p className="text-sm font-medium text-black/70 uppercase tracking-wide">
//                 Total Products
//               </p>
//               <div className="mt-4 pt-4 border-t border-black/10">
//                 <p className="text-xs text-black/60">
//                   <CheckCircle className="w-3 h-3 inline mr-1 text-green-500" />
//                   {inStockProducts} in stock
//                 </p>
//               </div>
//             </div>

//             {/* Total Value */}
//             <div className="bg-linear-to-br from-white to-gray-50 border border-black/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
//               <div className="flex items-start justify-between mb-4">
//                 <div className="w-14 h-14 bg-linear-to-br from-green-500/10 to-green-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   <DollarSign className="w-7 h-7 text-green-600" />
//                 </div>
//                 <TrendingUp className="w-5 h-5 text-green-500" />
//               </div>
//               <h3 className="text-2xl lg:text-3xl font-bold text-black mb-1">
//                 ₹{totalValue.toLocaleString()}
//               </h3>
//               <p className="text-sm font-medium text-black/70 uppercase tracking-wide">
//                 Total Inventory Value
//               </p>
//               <div className="mt-4 pt-4 border-t border-black/10">
//                 <p className="text-xs text-black/60">
//                   Average: ₹{Math.round(totalValue / totalProducts).toLocaleString()}
//                 </p>
//               </div>
//             </div>

//             {/* Stock Status */}
//             <div className="bg-linear-to-br from-white to-gray-50 border border-black/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
//               <div className="flex items-start justify-between mb-4">
//                 <div className="w-14 h-14 bg-linear-to-br from-purple-500/10 to-purple-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   <BarChart3 className="w-7 h-7 text-purple-600" />
//                 </div>
//                 <div className={`text-xs font-bold px-2 py-1 rounded-full ${outOfStockProducts > 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
//                   {Math.round((inStockProducts / totalProducts) * 100)}%
//                 </div>
//               </div>
//               <h3 className="text-2xl lg:text-3xl font-bold text-black mb-1">
//                 {inStockProducts}/{totalProducts}
//               </h3>
//               <p className="text-sm font-medium text-black/70 uppercase tracking-wide">
//                 In Stock
//               </p>
//               <div className="mt-4 pt-4 border-t border-black/10">
//                 <p className="text-xs text-black/60">
//                   <XCircle className="w-3 h-3 inline mr-1 text-red-500" />
//                   {outOfStockProducts} out of stock
//                 </p>
//               </div>
//             </div>

//             {/* Showing */}
//             <div className="bg-linear-to-br from-white to-gray-50 border border-black/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
//               <div className="flex items-start justify-between mb-4">
//                 <div className="w-14 h-14 bg-linear-to-br from-amber-500/10 to-amber-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                   <Grid className="w-7 h-7 text-amber-600" />
//                 </div>
//                 <div className="text-xs font-bold px-2 py-1 rounded-full bg-blue-100 text-blue-600">
//                   {Math.round((sortedProducts.length / totalProducts) * 100)}%
//                 </div>
//               </div>
//               <h3 className="text-2xl lg:text-3xl font-bold text-black mb-1">
//                 {sortedProducts.length}
//               </h3>
//               <p className="text-sm font-medium text-black/70 uppercase tracking-wide">
//                 Showing
//               </p>
//               <div className="mt-4 pt-4 border-t border-black/10">
//                 <p className="text-xs text-black/60">
//                   Filtered from {totalProducts} total
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Filters Bar */}
//           <div className="bg-white border border-black/10 rounded-2xl p-4 sm:p-6 shadow-lg mb-8">
//             <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
//               {/* Search - Desktop */}
//               {!isMobile && (
//                 <div className="relative flex-1">
//                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
//                   <input
//                     type="text"
//                     placeholder="Search products by name, category, brand, or description..."
//                     className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-black/20 bg-white placeholder-black/40 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                 </div>
//               )}

//               {/* Category Filter */}
//               <div className="flex-1">
//                 <label className="flex items-center gap-2 text-sm font-semibold text-black mb-2">
//                   <Filter className="w-4 h-4" />
//                   Category
//                 </label>
//                 <select
//                   className="w-full px-4 py-3 rounded-xl border border-black/20 bg-white focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all"
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                 >
//                   {categories.map((category) => (
//                     <option key={category} value={category}>
//                       {category === "all" ? "All Categories" : category}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Sort By */}
//               <div className="flex-1">
//                 <label className="flex items-center gap-2 text-sm font-semibold text-black mb-2">
//                   <TrendingUp className="w-4 h-4" />
//                   Sort By
//                 </label>
//                 <select
//                   className="w-full px-4 py-3 rounded-xl border border-black/20 bg-white focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all"
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                 >
//                   <option value="newest">Newest First</option>
//                   <option value="oldest">Oldest First</option>
//                   <option value="name">Name A-Z</option>
//                   <option value="price-low">Price: Low to High</option>
//                   <option value="price-high">Price: High to Low</option>
//                 </select>
//               </div>

//               {/* Clear Filters */}
//               {(searchTerm || selectedCategory !== "all" || sortBy !== "newest") && (
//                 <button
//                   onClick={() => {
//                     setSearchTerm("");
//                     setSelectedCategory("all");
//                     setSortBy("newest");
//                   }}
//                   className="self-end sm:self-center px-4 py-3 bg-black/5 hover:bg-black/10 text-black rounded-xl font-medium transition-colors"
//                 >
//                   Clear Filters
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Products Table/List */}
//       <div className="px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
//         <div className="max-w-7xl mx-auto">
//           {sortedProducts.length === 0 ? (
//             <div className="bg-linear-to-br from-white to-gray-50 border border-black/10 rounded-3xl p-8 sm:p-12 text-center shadow-xl">
//               <div className="w-24 h-24 mx-auto mb-6 bg-black/5 rounded-3xl flex items-center justify-center">
//                 <Package className="w-12 h-12 text-black/30" />
//               </div>
//               <h3 className="text-2xl font-bold text-black mb-4">
//                 {searchTerm || selectedCategory !== "all" ? "No matching products found" : "No products available"}
//               </h3>
//               <p className="text-lg text-black/60 mb-8 max-w-md mx-auto">
//                 {searchTerm || selectedCategory !== "all" 
//                   ? "Try adjusting your search or filters to find what you're looking for."
//                   : "Start by adding your first product to manage your inventory."}
//               </p>
//               <Link
//                 to="/admin/add-product"
//                 className="inline-flex items-center gap-3 bg-linear-to-r from-black to-gray-800 text-white px-8 py-4 rounded-xl font-semibold hover:from-gray-800 hover:to-black transition-all duration-300 shadow-lg hover:shadow-xl"
//               >
//                 <Plus className="w-5 h-5" />
//                 Add Your First Product
//               </Link>
//             </div>
//           ) : isMobile ? (
//             /* Mobile Product Cards */
//             <div className="space-y-4">
//               {sortedProducts.map((product) => (
//                 <div
//                   key={product._id}
//                   className="bg-white border border-black/10 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
//                 >
//                   <div className="flex gap-4">
//                     {/* Image */}
//                     <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-black/5 shrink-0">
//                       <img
//                         src={product.images?.[0]}
//                         alt={product.name}
//                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//                         onError={(e) => {
//                           e.target.src = "/placeholder-image.jpg";
//                         }}
//                       />
//                       <div className={`absolute top-1 right-1 px-1.5 py-0.5 rounded-full text-xs font-bold ${(product.stock || 0) > 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
//                         {product.stock || 0}
//                       </div>
//                     </div>

//                     {/* Details */}
//                     <div className="flex-1 min-w-0">
//                       <div className="flex justify-between items-start gap-2">
//                         <div className="flex-1">
//                           <h4 className="font-bold text-black line-clamp-2 mb-1">
//                             {product.name}
//                           </h4>
//                           <p className="text-sm text-black/60 line-clamp-1">
//                             {product.brand || "No brand"}
//                           </p>
//                         </div>
//                         <div className="text-right">
//                           <p className="font-bold text-lg text-black">
//                             ₹{product.price?.toLocaleString() || 0}
//                           </p>
//                           <span className="text-xs px-2 py-1 bg-black/10 rounded-full">
//                             {product.category?.name?.slice(0, 10) || "Uncategorized"}
//                           </span>
//                         </div>
//                       </div>

//                       {/* Actions */}
//                       <div className="flex items-center justify-between mt-4 pt-4 border-t border-black/10">
//                         <div className="flex items-center gap-2">
//                           <Link
//                             to={`/admin/edit-product/${product._id}`}
//                             className="p-2 rounded-lg bg-black/5 hover:bg-black/10 text-black/70 hover:text-black transition-colors"
//                             title="Edit"
//                           >
//                             <Edit3 className="w-4 h-4" />
//                           </Link>
//                           <button
//                             onClick={() => deleteProduct(product._id, product.name)}
//                             className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
//                             title="Delete"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </button>
//                           <Link
//                             to={`/product/${product._id}`}
//                             className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
//                             title="View"
//                           >
//                             <Eye className="w-4 h-4" />
//                           </Link>
//                         </div>
//                         <span className="text-xs text-black/40">
//                           ID: {product._id.slice(-6)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             /* Desktop Products Table */
//             <div className="bg-white border border-black/10 rounded-3xl shadow-2xl overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-linear-to-r from-black/5 to-black/10">
//                     <tr>
//                       <th className="px-8 py-6 text-left text-base font-semibold text-black">
//                         Product
//                       </th>
//                       <th className="px-6 py-6 text-left text-base font-semibold text-black">
//                         Category
//                       </th>
//                       <th className="px-6 py-6 text-left text-base font-semibold text-black">
//                         Price
//                       </th>
//                       <th className="px-6 py-6 text-left text-base font-semibold text-black">
//                         Stock
//                       </th>
//                       <th className="px-6 py-6 text-right text-base font-semibold text-black">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-black/5">
//                     {sortedProducts.map((product) => (
//                       <tr
//                         key={product._id}
//                         className="group hover:bg-black/5 transition-all duration-200"
//                       >
//                         <td className="px-8 py-6">
//                           <div className="flex items-center gap-4">
//                             <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black/5 group-hover:bg-black/10 transition-colors">
//                               <img
//                                 src={product.images?.[0]}
//                                 alt={product.name}
//                                 className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
//                                 onError={(e) => {
//                                   e.target.src = "/placeholder-image.jpg";
//                                 }}
//                               />
//                             </div>
//                             <div className="min-w-0 flex-1">
//                               <h4 className="font-semibold text-black text-base line-clamp-1 group-hover:text-black/90">
//                                 {product.name}
//                               </h4>
//                               <p className="text-sm text-black/60 line-clamp-1">
//                                 {product.brand || "No brand specified"}
//                               </p>
//                               <p className="text-xs text-black/40 mt-1">
//                                 ID: {product._id.slice(-8)}
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-6">
//                           <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-black/10 hover:bg-black/15 text-black/80 text-sm rounded-full font-medium transition-colors">
//                             {product.category?.name || product.category || "Uncategorized"}
//                           </span>
//                         </td>
//                         <td className="px-6 py-6">
//                           <span className="font-bold text-lg text-black">
//                             ₹{product.price?.toLocaleString() || 0}
//                           </span>
//                         </td>
//                         <td className="px-6 py-6">
//                           <div className="flex items-center gap-3">
//                             <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${
//                               (product.stock || 0) > 10 
//                                 ? 'bg-green-100 text-green-700'
//                                 : (product.stock || 0) > 0
//                                 ? 'bg-amber-100 text-amber-700'
//                                 : 'bg-red-100 text-red-700'
//                             }`}>
//                               <div className={`w-2 h-2 rounded-full ${
//                                 (product.stock || 0) > 10 
//                                   ? 'bg-green-500'
//                                   : (product.stock || 0) > 0
//                                   ? 'bg-amber-500'
//                                   : 'bg-red-500'
//                               }`} />
//                               {product.stock || 0} units
//                             </span>
//                           </div>
//                         </td>
//                         <td className="px-6 py-6 text-right">
//                           <div className="flex items-center gap-2 justify-end">
//                             <Link
//                               to={`/product/${product._id}`}
//                               className="p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-all duration-200 hover:scale-105 group"
//                               title="View Product"
//                             >
//                               <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
//                             </Link>
//                             <Link
//                               to={`/admin/edit-product/${product._id}`}
//                               className="p-3 rounded-xl bg-black/5 hover:bg-black/10 text-black/70 hover:text-black transition-all duration-200 hover:scale-105 group"
//                               title="Edit Product"
//                             >
//                               <Edit3 className="w-4 h-4 group-hover:scale-110 transition-transform" />
//                             </Link>
//                             <button
//                               onClick={() => deleteProduct(product._id, product.name)}
//                               className="p-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all duration-200 hover:scale-105 group"
//                               title="Delete Product"
//                             >
//                               <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Table Footer */}
//               <div className="border-t border-black/10 px-8 py-4 bg-black/5">
//                 <div className="flex items-center justify-between">
//                   <p className="text-sm text-black/60">
//                     Showing {sortedProducts.length} of {products.length} products
//                   </p>
//                   <div className="flex items-center gap-4">
//                     <button
//                       onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//                       className="text-sm text-black/70 hover:text-black transition-colors flex items-center gap-1"
//                     >
//                       <ArrowUpRight className="w-4 h-4" />
//                       Back to top
//                     </button>
//                     <Link
//                       to="/admin/add-product"
//                       className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-black/90 transition-colors"
//                     >
//                       + Add More
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Quick Stats Bar - Mobile */}
//           {isMobile && sortedProducts.length > 0 && (
//             <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-black/10 shadow-2xl p-4 z-20">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-black/70">Showing</p>
//                   <p className="text-lg font-bold text-black">{sortedProducts.length} products</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Link
//                     to="/admin/add-product"
//                     className="bg-black text-white p-3 rounded-xl shadow-lg"
//                   >
//                     <Plus className="w-5 h-5" />
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Empty space for mobile bottom padding */}
//       {isMobile && sortedProducts.length > 0 && <div className="h-20"></div>}
//     </div>
//   );
// };

// export default Dashboard;


import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Plus,
  Edit3,
  Trash2,
  Search,
  ArrowUpRight,
  Package,
  Layers,
  ChevronDown,
  Grid,
  DollarSign,
  AlertCircle
} from "lucide-react";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  /* ---------------- API Fetch ---------------- */
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/products");
      setProducts(data || []);
    } catch {
      toast.error("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success("Product removed");
      fetchProducts();
    } catch {
      toast.error("Error deleting product");
    }
  };

  /* ---------------- Filter & Sort Logic ---------------- */
  const filteredProducts = products
    .filter((p) => {
      const matchesSearch = !searchTerm || 
        p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || p.category?.name === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return (a.price || 0) - (b.price || 0);
      if (sortBy === "price-high") return (b.price || 0) - (a.price || 0);
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

  const categories = ["all", ...new Set(products.map((p) => p.category?.name).filter(Boolean))];
  const totalValue = products.reduce((sum, p) => sum + (p.price || 0) * (p.stock || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-b-2 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black pb-24">
      <div className="max-w-5xl mx-auto px-6 pt-12">
        
        {/* --- TOP HEADER --- */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Layers className="w-4 h-4" />
              <span className="text-xs font-bold tracking-widest uppercase">Admin Panel</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight">Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              to="/admin/categories"
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-white border border-gray-200 rounded-2xl text-sm font-bold hover:bg-gray-50 transition-all shadow-sm"
            >
              <Grid className="w-4 h-4" />
              <span>Categories</span>
            </Link>
            <Link
              to="/admin/add-product"
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-black text-white rounded-2xl text-sm font-bold hover:shadow-xl hover:shadow-black/10 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </Link>
          </div>
        </header>

        {/* --- STATS SUMMARY --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-4xl p-5 border border-gray-100 shadow-sm">
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-1">Total Items</p>
            <h2 className="text-2xl font-bold">{products.length}</h2>
          </div>
          <div className="bg-white rounded-4xl p-5 border border-gray-100 shadow-sm">
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-1">Value</p>
            <h2 className="text-2xl font-bold text-emerald-600">₹{(totalValue / 100000).toFixed(1)}L</h2>
          </div>
          <div className="bg-white rounded-4xl p-5 border border-gray-100 shadow-sm">
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-1">Low Stock</p>
            <h2 className="text-2xl font-bold text-red-500">{products.filter(p => p.stock < 10).length}</h2>
          </div>
          <div className="bg-white rounded-4xl p-5 border border-gray-100 shadow-sm">
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-1">Active Filters</p>
            <h2 className="text-2xl font-bold">{filteredProducts.length}</h2>
          </div>
        </div>

        {/* --- SEARCH & FILTERS --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-10">
          <div className="md:col-span-6 relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            <input
              type="text"
              placeholder="Search inventory..."
              className="w-full bg-white border border-gray-100 py-4 pl-12 pr-6 rounded-2xl shadow-sm outline-none focus:ring-1 focus:ring-black/5 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="md:col-span-3 relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-white border border-gray-100 px-6 py-4 rounded-2xl shadow-sm appearance-none outline-none font-medium text-sm cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.filter(c => c !== 'all').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
          </div>
          <div className="md:col-span-3 relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-white border border-gray-100 px-6 py-4 rounded-2xl shadow-sm appearance-none outline-none font-medium text-sm cursor-pointer"
            >
              <option value="newest">Sort: Newest</option>
              <option value="price-low">Price: Low-High</option>
              <option value="price-high">Price: High-Low</option>
              <option value="name">Name: A-Z</option>
            </select>
            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
          </div>
        </div>

        {/* --- PRODUCT LIST --- */}
        <div className="space-y-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
              <Package className="w-8 h-8 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-600 text-sm font-medium">No products found.</p>
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p._id}
                className="group bg-white rounded-[2.2rem] p-3 pr-6 border border-gray-50 shadow-sm hover:shadow-xl hover:shadow-gray-200/40 hover:-translate-y-0.5 transition-all duration-500"
              >
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  
                  {/* Image */}
                  <div className="w-full sm:w-28 h-28 rounded-[1.8rem] overflow-hidden bg-gray-50 shrink-0">
                    <img
                      src={p.images?.[0] || "https://via.placeholder.com/150"}
                      className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                      alt={p.name}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 w-full min-w-0">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest truncate max-w-25">
                            {p.brand || "Brand"}
                          </span>
                          <span className="w-1 h-1 bg-gray-200 rounded-full" />
                          <span className="text-[9px] font-black text-black px-2 py-0.5 bg-gray-100 rounded-md uppercase tracking-tighter">
                            {p.category?.name || "General"}
                          </span>
                        </div>
                        
                        {/* Name - Truncated by default, full on hover */}
                        <h4 className="text-base font-semibold text-gray-900 leading-tight line-clamp-2">
                          {p.name}
                        </h4>
                        
                        <div className="mt-2 flex items-center gap-3">
                          <span className={`text-[11px] font-bold flex items-center gap-1.5 ${p.stock < 10 ? 'text-red-500' : 'text-gray-600'}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${p.stock < 10 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
                            {p.stock || 0} units
                          </span>
                        </div>
                      </div>

                      {/* Actions & Price */}
                      <div className="flex items-center justify-between lg:justify-end gap-6 border-t lg:border-none pt-3 lg:pt-0">
                        <div className="text-left lg:text-right">
                          <p className="text-xl font-black tracking-tight">₹{p.price?.toLocaleString() || 0}</p>
                          <p className="text-[9px] font-bold text-gray-600 uppercase">Unit Price</p>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Link
                            to={`/admin/edit-product/${p._id}`}
                            className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-2xl hover:bg-black hover:text-white transition-all text-gray-600"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => deleteProduct(p._id, p.name)}
                            className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all text-gray-600"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <Link
                            to={`/product/${p._id}`}
                            className="w-10 h-10 flex items-center justify-center bg-black text-white rounded-2xl shadow-lg shadow-black/5 active:scale-90 transition-all"
                            title="View"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;