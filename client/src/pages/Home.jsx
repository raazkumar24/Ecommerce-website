// import { useEffect, useState, useCallback } from "react";
// import { getProducts } from "../services/api";
// import { Link } from "react-router-dom";
// import ProductCard from "../components/ProductCard";
// import ProductGrid from "../components/ProductGrid";
// import { Search } from "lucide-react";
// import p1 from "../assets/p1.png";
// import p2 from "../assets/p2.png";
// import p3 from "../assets/p3.png";
// import p4 from "../assets/p4.png";
// import bannerImage from "../assets/banner.png";

// const Home = () => {
//   const [allProducts, setAllProducts] = useState([]); // All products
//   const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
//   const [keyword, setKeyword] = useState(""); // Search keyword
//   const [loading, setLoading] = useState(false); // Loading state

//   // Fetch all products once
//   const fetchProducts = useCallback(async () => {
//     setLoading(true);
//     try {
//       const { data } = await getProducts(""); // Get all products
//       setAllProducts(data || []);
//       setFilteredProducts(data || []); // Initially show all
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setAllProducts([]); // Clear all products
//       setFilteredProducts([]); // Clear filtered products
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Filter products based on keyword
//   useEffect(() => {
//     if (!keyword.trim()) { // If no keyword, show all
//       setFilteredProducts(allProducts); // Reset to all products
//       return;
//     }

//     const searchTerm = keyword.toLowerCase().trim();
//     const filtered = allProducts.filter(
//       (product) =>
//         product.name?.toLowerCase().includes(searchTerm) ||
//         product.description?.toLowerCase().includes(searchTerm) ||
//         product.category?.name?.toLowerCase().includes(searchTerm) ||
//         product.brand?.toLowerCase().includes(searchTerm)
//     );

//     setFilteredProducts(filtered); // Update filtered products
//   }, [keyword, allProducts]); // Re-run when keyword or allProducts change

//   // Fetch products on mount
//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   const featuredProduct = allProducts?.[0];

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section */}
//       <div className="relative min-h-[90vh] sm:min-h-screen overflow-hidden">
//         {/* Background with your banner image */}
//         <div
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//           style={{ backgroundImage: `url(${bannerImage})` }}
//         >
//           {/* Dark overlay for better text contrast */}
//           <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-black/80"></div>
//         </div>

//         {/* Main Content */}
//         <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
//           <div className="max-w-7xl mx-auto">
//             <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
//               {/* Left Column - Text Content */}
//               <div className="text-center lg:text-left animate-fade-in-up">
//                 {/* Badge */}
//                 <div className="inline-flex items-center gap-2 bg-linear-to-r from-gray-900 to-black text-white px-4 py-2 rounded-full mb-6 shadow-xl border border-white/20">
//                   <span className="text-xs font-semibold uppercase tracking-wider">
//                     🎯 Premium Collection
//                   </span>
//                 </div>

//                 {/* Main Heading */}
//                 <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
//                   <span className="block bg-linear-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                     Elevate Your
//                   </span>
//                   <span className="block bg-linear-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
//                     Tech Experience
//                   </span>
//                 </h1>

//                 {/* Subheading */}
//                 <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
//                   Discover premium electronics with sleek design, superior
//                   performance, and exceptional quality.
//                 </p>

//                 {/* CTA Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-4 mb-10 sm:mb-12 justify-center lg:justify-start">
//                   <Link
//                     to="/products"
//                     className="group relative px-8 py-4 bg-linear-to-r from-black to-gray-900 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gray-800/50 border border-white/20 text-center"
//                   >
//                     <span className="relative z-10 flex items-center justify-center gap-2">
//                       <span>Shop Now</span>
//                       <svg
//                         className="w-5 h-5 group-hover:translate-x-1 transition-transform"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M17 8l4 4m0 0l-4 4m4-4H3"
//                         />
//                       </svg>
//                     </span>
//                   </Link>
//                 </div>

//                 {/* Stats */}
//                 <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
//                   <div className="text-center p-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
//                     <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
//                       {allProducts.length || 0}
//                     </div>
//                     <div className="text-xs sm:text-sm text-gray-300">
//                       Products
//                     </div>
//                   </div>
//                   <div className="text-center p-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
//                     <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
//                       24/7
//                     </div>
//                     <div className="text-xs sm:text-sm text-gray-300">
//                       Support
//                     </div>
//                   </div>
//                   <div className="text-center p-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
//                     <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
//                       Free
//                     </div>
//                     <div className="text-xs sm:text-sm text-gray-300">
//                       Shipping
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Right Column - Product Showcase */}
//               <div className="relative mt-12 lg:mt-0">
//                 {/* Main Product Display */}
//                 <div className="relative max-w-lg mx-auto">
//                   {/* Floating Product Cards */}
//                   <div className="absolute -top-10 -left-4 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 animate-float z-20">
//                     <img
//                       src={p1}
//                       alt="Product 1"
//                       className="w-full h-full object-contain rounded-lg"
//                     />
//                   </div>

//                   <div
//                     className="absolute bottom-10 -right-4 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32  animate-float z-20"
//                     style={{ animationDelay: "1.5s" }}
//                   >
//                     <img
//                       src={p2}
//                       alt="Product 2"
//                       className="w-full h-full object-contain rounded-lg"
//                     />
//                   </div>

//                   <div
//                     className="absolute top-2/4 -left-4 w-16 h-16 sm:w-25 sm:h-25 animate-float z-10"
//                     style={{ animationDelay: "2.5s" }}
//                   >
//                     <img
//                       src={p3}
//                       alt="Product 3"
//                       className="w-full h-full object-contain rounded"
//                     />
//                   </div>

//                   <div
//                     className="absolute bottom-3/4 -right-2 w-16 h-16 sm:w-25 sm:h-25 animate-float z-10"
//                     style={{ animationDelay: "3s" }}
//                   >
//                     <img
//                       src={p4}
//                       alt="Product 4"
//                       className="w-full h-full object-contain rounded"
//                     />
//                   </div>

//                   {/* Central Featured Product */}
//                   {/* RIGHT HERO IMAGE (UPDATED – REAL PRODUCT) */}
//                   <div className="relative flex justify-center">
//                     {featuredProduct && (
//                       <div
//                         className="relative w-75 sm:w-90 md:w-105
//                                 aspect-square rounded-3xl overflow-hidden
//                                 bg-linear-to-b from-black/10 via-black/30 to-black/10 shadow-2xl shadow-black/60
//                                 border border-white/20
//                                 transition-transform duration-500 hover:scale-105"
//                       >
//                         <img
//                           src={featuredProduct.images?.[0]}
//                           alt={featuredProduct.name}
//                           className="w-full h-full object-contain"
//                         />

//                         <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

//                         <div className="absolute bottom-4 left-4 right-4">
//                           {/* <h3 className="text-white text-sm font-semibold truncate">
//                             {featuredProduct.name}
//                           </h3> */}
//                         </div>
//                       </div>
//                     )}

//                     {/* Glow */}
//                     <div className="absolute w-120 h-120 bg-white/10 blur-3xl rounded-full -z-10" />
//                   </div>
//                 </div>

//                 {/* Search Bar */}
//                 <div className="absolute -bottom-6 left-0 right-0 mx-auto max-w-xl px-4 z-50">
//                   <div className="relative group">
//                     <input
//                       type="text"
//                       placeholder="Search for products..."
//                       value={keyword}
//                       onChange={(e) => setKeyword(e.target.value)}
//                       className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-4 pl-14 text-white placeholder-gray-400 outline-none focus:border-white focus:bg-white/15 transition-all duration-300 shadow-2xl focus:shadow-white/20"
//                     />
//                     <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
//                     <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white px-6 py-2.5 rounded-full font-medium hover:bg-gray-900 transition-all duration-300 hover:scale-105 border border-white/20">
//                       Search
//                     </button>
//                   </div>

//                   {/* Quick Search Tags */}
//                   <div className="flex flex-wrap justify-center gap-2 mt-4">
//                     {["Laptop", "Phone", "Headphone", "Camera"].map(
//                       (tag, index) => (
//                         <button
//                           key={tag}
//                           onClick={() => setKeyword(tag.toLowerCase())}
//                           className="px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-xs text-gray-300 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300 hover:scale-105"
//                           style={{ animationDelay: `${index * 100}ms` }}
//                         >
//                           {tag}
//                         </button>
//                       )
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Products Section */}
//       <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-12 gap-4">
//             <div>
//               <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-1">
//                 {keyword
//                   ? `Search Results for "${keyword}"`
//                   : "Featured Products"}
//               </h2>
//               <p className="text-black/60 text-sm sm:text-base">
//                 {keyword
//                   ? `Found ${filteredProducts.length} product${
//                       filteredProducts.length !== 1 ? "s" : ""
//                     }`
//                   : "Handpicked collection of our best products"}
//               </p>
//             </div>
//             <Link
//               to="/products"
//               className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-black/90 transition-all duration-200 shadow-lg hover:shadow-black/30 self-start sm:self-center"
//             >
//               View All
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 5l7 7-7 7"
//                 />
//               </svg>
//             </Link>
//           </div>

//           {/* Products Grid */}
//           <ProductGrid
//             loading={loading}
//             empty={filteredProducts.length === 0 && !loading}
//             gridCols="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
//           >
//             {filteredProducts.map((product, index) => (
//               <ProductCard key={product._id} product={product} index={index} />
//             ))}
//           </ProductGrid>

//           {/* View All Button (Mobile Bottom) */}
//           {filteredProducts.length > 0 && (
//             <div className="mt-12 text-center lg:hidden">
//               <Link
//                 to="/products"
//                 className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-black to-gray-800 text-white rounded-xl font-semibold hover:shadow-2xl transition-all duration-300"
//               >
//                 View All Products
//                 <svg
//                   className="w-5 h-5"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M17 8l4 4m0 0l-4 4m4-4H3"
//                   />
//                 </svg>
//               </Link>
//             </div>
//           )}

//           {/* Search Results Empty State */}
//           {keyword && filteredProducts.length === 0 && !loading && (
//             <div className="text-center py-12">
//               <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-black/5 flex items-center justify-center">
//                 <Search className="w-12 h-12 text-black/30" />
//               </div>
//               <h3 className="text-2xl font-semibold text-black mb-3">
//                 No products found for "{keyword}"
//               </h3>
//               <p className="text-black/60 mb-6">
//                 Try a different search term or browse all products.
//               </p>
//               <button
//                 onClick={() => setKeyword("")}
//                 className="px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-black/90 transition-colors"
//               >
//                 Clear Search
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import ProductGrid from "../components/ProductGrid";
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Truck, 
  Layers,
  ArrowUpRight
} from "lucide-react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [featuredProduct, setFeaturedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await getProducts("");
      const items = data || [];
      setProducts(items.slice(0, 8));
      // Set the first item as the "Hero" featured product
      setFeaturedProduct(items[0]);
    } catch (err) {
      console.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black antialiased">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <div className="order-2 lg:order-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black text-white rounded-full">
                <Sparkles className="w-3 h-3" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">New Season Drop</span>
              </div>

              <h1 className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9] uppercase">
                Premium <br />
                <span className="text-gray-400">Hardware.</span>
              </h1>

              <p className="text-lg text-gray-500 max-w-sm font-medium leading-relaxed">
                Experience the next generation of performance. Our curated collection brings your real workflow to life.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="flex items-center justify-center gap-3 bg-black text-white px-10 py-5 rounded-2xl font-bold hover:bg-zinc-800 transition-all active:scale-95 shadow-2xl shadow-black/10"
                >
                  Shop Now <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center md:text-left">
                  <p className="text-2xl font-black">2.4k+</p>
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Active Users</p>
                </div>
                <div className="h-10 w-px bg-gray-100" />
                <div className="text-center md:text-left">
                  <p className="text-2xl font-black">Free</p>
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Global Ship</p>
                </div>
              </div>
            </div>

            {/* Visual Element using REAL PRODUCT IMAGE */}
            <div className="order-1 lg:order-2 relative group">
              <div className="aspect-square rounded-[3rem] overflow-hidden bg-[#F8F8F8] shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
                {featuredProduct?.images?.[0] ? (
                  <img 
                    src={featuredProduct.images[0]} 
                    alt={featuredProduct.name}
                    className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-200">
                    <Layers className="w-20 h-20" />
                  </div>
                )}
              </div>
              
              {/* Floating Badge for Real Product */}
              {featuredProduct && (
                <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-white p-6 rounded-4xl shadow-2xl border border-gray-50 max-w-50 animate-bounce-slow">
                  <p className="text-[9px] font-bold text-gray-600 uppercase mb-1 tracking-widest">Featured Item</p>
                  <p className="text-sm font-black truncate uppercase">{featuredProduct.name}</p>
                  <p className="text-lg font-black text-emerald-600 mt-1">₹{featuredProduct.price?.toLocaleString()}</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ================= TRUSTED SECTION (BLACK BG) ================= */}
      <section className="bg-black py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-10">
            Trusted by Industry Leaders
          </p>
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-10 lg:gap-20 opacity-70">
            <span className="text-2xl lg:text-3xl font-black italic text-white tracking-tighter">NIKE</span>
            <span className="text-2xl lg:text-3xl font-black italic text-white tracking-tighter">ADIDAS</span>
            <span className="text-2xl lg:text-3xl font-black italic text-white tracking-tighter">APPLE</span>
            <span className="text-2xl lg:text-3xl font-black italic text-white tracking-tighter">SONY</span>
            <span className="text-2xl lg:text-3xl font-black italic text-white tracking-tighter">BEATS</span>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <header className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Layers className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Our Store</span>
              </div>
              <h2 className="text-5xl font-bold tracking-tighter uppercase">Latest Drops</h2>
            </div>
            
            <Link 
              to="/products" 
              className="group flex items-center gap-3 text-sm font-bold border-b-2 border-black pb-2 transition-all"
            >
              See All Products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </header>

          <ProductGrid
            loading={loading}
            empty={products.length === 0 && !loading}
            gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          >
            {products.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
          </ProductGrid>
        </div>
      </section>

      {/* ================= MODERN CTA ================= */}
     <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto bg-black rounded-[4rem] p-12 lg:p-24 overflow-hidden relative text-center lg:text-left">
          <Zap className="absolute top-10 right-10 w-64 h-64 text-white/5 -rotate-12" />
          
          <div className="relative z-10 grid lg:grid-cols-2 items-center gap-12">
            <div>
              <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none mb-6">
                Ready to <br /> Upgrade?
              </h2>
              <p className="text-white/50 text-lg font-medium max-w-sm mx-auto lg:mx-0">
                Join our newsletter and get exclusive access to new drops and premium discounts.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
              <input 
                type="email" 
                placeholder="Enter email address" 
                className="bg-white/10 border border-white/10 rounded-2xl px-8 py-5 text-white outline-none focus:bg-white/20 transition-all sm:w-80"
              />
              <button className="bg-white text-black px-10 py-5 rounded-2xl font-black hover:bg-gray-200 transition-all">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
