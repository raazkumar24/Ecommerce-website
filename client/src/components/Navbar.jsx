// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useCart } from "../context/CartContext";
// import { useState } from "react";
// import {
//   ShoppingCart,
//   User,
//   LogOut,
//   Home,
//   Shield,
//   Menu,
//   X,
//   ShoppingBag,
//   FileSpreadsheet,
// } from "lucide-react";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const { cartCount } = useCart();
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   // Handle user logout
//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//     setIsMenuOpen(false);
//   };

//   const navLinkClass =
//     "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-black hover:bg-black/5 transition-all duration-200";
//   const mobileNavLinkClass =
//     "flex items-center gap-3 px-4 py-3 text-base rounded-lg text-black hover:bg-black/5 transition-all duration-200";

//   return (
//     <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-black/10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link
//             to="/"
//             className="flex items-center gap-2"
//             onClick={() => setIsMenuOpen(false)}
//           >
//             {/* <div className="p-2 border border-black rounded-lg">
//               <ShoppingBag className="w-5 h-5 text-black" />
//             </div> */}
//             <span className="text-xl font-semibold tracking-tight text-black">
//               E-Shop
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-4">
//             <Link to="/" className={navLinkClass}>
//               <Home className="w-4 h-4" />
//               <span>Home</span>
//             </Link>

//             {/* product link */}
//             <Link to="/products" className={navLinkClass}>
//               <ShoppingBag className="w-4 h-4" />
//               <span>Products</span>
//             </Link>

//             {/* About Link */}
//             <Link to="/about" className={navLinkClass}>
//               <FileSpreadsheet className="w-4 h-4" />
//               <span>About</span>
//             </Link>

//             {user && (
//               <Link to="/cart" className="relative">
//                 <div className={navLinkClass}>
//                   <ShoppingCart className="w-4 h-4" />
//                   <span>Cart</span>
//                   {cartCount > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
//                       {cartCount}
//                     </span>
//                   )}
//                 </div>
//               </Link>
//             )}

//             {/* Admin Dashboard Link */}
//             {user?.role === "admin" && (
//               <Link to="/admin/dashboard" className={navLinkClass}>
//                 <Shield className="w-4 h-4" />
//                 <span>Admin</span>
//               </Link>
//             )}

//             {!user ? (
//               <>
//                 <Link
//                   to="/login"
//                   className="px-4 py-2 rounded-lg border border-black text-sm font-medium text-black hover:bg-black hover:text-white transition-colors"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="px-4 py-2 rounded-lg bg-black text-sm font-medium text-white hover:bg-black/90 transition-colors"
//                 >
//                   Register
//                 </Link>
//               </>
//             ) : (
//               <div className="flex items-center gap-4 ml-4 pl-4 border-l border-black/10">
//                 <Link
//                   to="/profile"
//                   className="flex items-center gap-2 px-3 py-2 rounded-full border border-black/10 hover:bg-black/5 transition-colors"
//                 >
//                   <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
//                     <User className="w-4 h-4 text-white" />
//                   </div>
//                   <span className="text-sm font-medium text-black">
//                     Hi, {user.name.split(" ")[0]}
//                   </span>
//                 </Link>
//                 {/* Logout */}
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center gap-2 p-2 rounded-lg text-sm text-black hover:bg-black/5 transition-colors"
//                   title="Logout"
//                 >
//                   <LogOut className="w-4 h-4" />
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Mobile Navigation Buttons */}
//           <div className="flex md:hidden items-center gap-2">
//             {/* Cart Button (Mobile) - Visible when user is logged in */}
//             {user && (
//               <Link
//                 to="/cart"
//                 className="relative p-2 rounded-lg hover:bg-black/5 transition-colors"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <ShoppingCart className="w-6 h-6 text-black" />
//                 {cartCount > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-black text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>
//             )}

//             {/* Mobile menu button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="p-2 rounded-lg hover:bg-black/5 transition-colors"
//               aria-label="Toggle menu"
//             >
//               {isMenuOpen ? (
//                 <X className="w-6 h-6 text-black" />
//               ) : (
//                 <Menu className="w-6 h-6 text-black" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-t border-black/10 shadow-lg">
//             <div className="px-4 py-3 space-y-2">
//               <Link
//                 to="/"
//                 className={mobileNavLinkClass}
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <Home className="w-5 h-5" />
//                 <span>Home</span>
//               </Link>

//               {/* About Link */}
//               <Link
//                 to="/about"
//                 className={mobileNavLinkClass}
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <FileSpreadsheet className="w-5 h-5" />
//                 <span>About</span>
//               </Link>

//               {user?.role === "admin" && (
//                 <Link
//                   to="/admin/dashboard"
//                   className={mobileNavLinkClass}
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <Shield className="w-5 h-5" />
//                   <span>Admin Dashboard</span>
//                 </Link>
//               )}

//               {!user ? (
//                 <>
//                   <Link
//                     to="/login"
//                     className="flex items-center justify-center gap-2 px-4 py-3 my-1 rounded-lg border border-black text-sm font-medium text-black hover:bg-black hover:text-white transition-colors"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <span>Login</span>
//                   </Link>
//                   <Link
//                     to="/register"
//                     className="flex items-center justify-center gap-2 px-4 py-3 my-1 rounded-lg bg-black text-sm font-medium text-white hover:bg-black/90 transition-colors"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <span>Register</span>
//                   </Link>
//                 </>
//               ) : (
//                 <>
//                   <Link
//                     to="/profile"
//                     className="flex items-center gap-3 px-4 py-3 rounded-lg border border-black/10 hover:bg-black/5 transition-colors"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center">
//                       <User className="w-5 h-5 text-white" />
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-black">
//                         {user.name}
//                       </p>
//                       <p className="text-xs text-black/70">{user.email}</p>
//                     </div>
//                   </Link>

//                   {/* Logout */}
//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center justify-center gap-3 w-full px-4 py-3 text-sm text-black hover:bg-black/5 rounded-lg"
//                   >
//                     <LogOut className="w-5 h-5" />
//                     <span>Logout</span>
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useCart } from "../context/CartContext";
// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion"; // Restored motion
// import {
//   ShoppingCart,
//   User,
//   LogOut,
//   Shield,
//   Menu,
//   X,
//   ShoppingBag,
//   Search,
//   ChevronRight,
// } from "lucide-react";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const { cart } = useCart(); // Use the cart object
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [search, setSearch] = useState("");

//   // UNIQUE COUNT LOGIC: 
//   // Counts unique items in the array. Adding 10 of the same item results in a count of 1.
//   const uniqueItemsCount = cart?.products?.length || 0;

//   useEffect(() => {
//     setSearch("");
//     setIsMenuOpen(false);
//   }, [location.pathname]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (!search.trim()) return;
//     navigate(`/products?keyword=${encodeURIComponent(search.trim())}`);
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const isActive = (path) => location.pathname === path;

//   const navLinkClass = (path) => `
//     flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
//     ${isActive(path) 
//       ? "bg-black text-white shadow-lg shadow-black/10" 
//       : "text-gray-500 hover:text-black hover:bg-gray-100"}
//   `;

//   return (
//     <nav className="sticky top-0 z-100 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">
          
//           {/* --- LOGO --- */}
//           <Link to="/" className="group flex items-center gap-2">
//             <motion.div 
//               whileHover={{ rotate: 12 }}
//               className="w-10 h-10 bg-black rounded-xl flex items-center justify-center"
//             >
//               <ShoppingBag className="text-white w-5 h-5" />
//             </motion.div>
//             <span className="text-xl font-black tracking-tighter uppercase hidden sm:block">
//               E-Shop
//             </span>
//           </Link>

//           {/* --- SEARCH (DESKTOP) --- */}
//           <form
//             onSubmit={handleSearch}
//             className="hidden lg:flex relative w-full max-w-md mx-8 group"
//           >
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-black transition-colors" />
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search premium products..."
//               className="w-full bg-gray-50 border border-transparent py-3 pl-12 pr-4 rounded-2xl text-sm focus:bg-white focus:border-gray-200 outline-none transition-all"
//             />
//           </form>

//           {/* --- NAV LINKS (DESKTOP) --- */}
//           <div className="hidden md:flex items-center gap-1">
//             <Link to="/" className={navLinkClass("/")}>Home</Link>
//             <Link to="/products" className={navLinkClass("/products")}>Shop</Link>
//             <Link to="/about" className={navLinkClass("/about")}>About</Link>
            
//             {user?.role === "admin" && (
//               <Link to="/admin/dashboard" className={navLinkClass("/admin/dashboard")}>
//                 <Shield size={16} />
//               </Link>
//             )}
//           </div>

//           {/* --- ACTIONS (DESKTOP) --- */}
//           <div className="hidden md:flex items-center gap-4 ml-4">
//             {user && (
//               <Link to="/cart" className="relative group p-3 bg-gray-50 rounded-full hover:bg-black hover:text-white transition-all">
//                 <ShoppingCart size={20} />
//                 <AnimatePresence>
//                   {uniqueItemsCount > 0 && (
//                     <motion.span 
//                       initial={{ scale: 0, opacity: 0 }}
//                       animate={{ scale: 1, opacity: 1 }}
//                       exit={{ scale: 0, opacity: 0 }}
//                       className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white group-hover:border-black transition-colors"
//                     >
//                       {uniqueItemsCount}
//                     </motion.span>
//                   )}
//                 </AnimatePresence>
//               </Link>
//             )}

//             {!user ? (
//               <div className="flex items-center gap-2">
//                 <Link to="/login" className="text-sm font-bold px-5 py-2.5 hover:text-gray-600 transition-colors">Login</Link>
//                 <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                   <Link to="/register" className="bg-black text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-md shadow-black/10 block">Register</Link>
//                 </motion.div>
//               </div>
//             ) : (
//               <div className="flex items-center gap-2 pl-4 border-l border-gray-100">
//                 {/* RESTORED USER DESIGN */}
//                 <Link to="/profile" className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-gray-50 border border-gray-100 hover:border-black transition-all">
//                   <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold text-xs">
//                     {user.name?.charAt(0)}
//                   </div>
//                   <span className="text-sm font-bold truncate max-w-20">
//                     {user.name?.split(" ")[0]}
//                   </span>
//                 </Link>
//                 <button onClick={handleLogout} className="p-3 text-gray-600 hover:text-red-500 transition-colors">
//                   <LogOut size={20} />
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* --- MOBILE TOGGLE --- */}
//           <div className="flex md:hidden items-center gap-3">
//              {user && (
//               <Link to="/cart" className="relative p-2 text-black">
//                 <ShoppingCart size={24} />
//                 {uniqueItemsCount > 0 && (
//                   <span className="absolute top-0 right-0 bg-black text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
//                     {uniqueItemsCount}
//                   </span>
//                 )}
//               </Link>
//             )}
//             <button 
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="p-2 bg-gray-50 rounded-xl"
//             >
//               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* --- MOBILE OVERLAY MENU (Animated) --- */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div 
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "100%" }}
//             transition={{ type: "spring", damping: 25, stiffness: 200 }}
//             className="md:hidden fixed right-0 top-20 w-3/4 h-[calc(100vh-80px)] border-l-2 border-gray-300 bg-white z-90 px-6 py-8 flex flex-col shadow-2xl"
//           >
//             <form onSubmit={handleSearch} className="relative mb-8">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
//               <input
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search products..."
//                 className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none border-none"
//               />
//             </form>

//             <div className="flex flex-col gap-2">
//               <Link to="/" className="flex items-center justify-between py-4 text-base font-bold border-b border-gray-50">
//                 Home <ChevronRight className="text-gray-300" />
//               </Link>
//               <Link to="/products" className="flex items-center justify-between py-4 text-base font-bold border-b border-gray-50">
//                 Products <ChevronRight className="text-gray-300" />
//               </Link>
//               <Link to="/about" className="flex items-center justify-between py-4 text-base font-bold border-b border-gray-50">
//                 About <ChevronRight className="text-gray-300" />
//               </Link>
//             </div>

//             <div className="mt-auto pb-10">
//               {!user ? (
//                 <div className="grid grid-cols-2 gap-4">
//                   <Link to="/login" className="flex items-center justify-center py-4 rounded-2xl bg-gray-50 font-bold">Login</Link>
//                   <Link to="/register" className="flex items-center justify-center py-4 rounded-2xl bg-black text-white font-bold">Register</Link>
//                 </div>
//               ) : (
//                 <div className="space-y-4">
//                   <Link to="/profile" className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
//                     <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl">
//                       {user.name?.charAt(0)}
//                     </div>
//                     <div>
//                       <p className="font-bold text-lg leading-tight">{user.name}</p>
//                       <p className="text-sm text-gray-500">{user.email}</p>
//                     </div>
//                   </Link>
//                   <button 
//                     onClick={handleLogout}
//                     className="w-full flex items-center justify-center gap-2 py-4 text-red-500 font-bold border border-red-100 rounded-2xl"
//                   >
//                     <LogOut size={20} /> Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };

// export default Navbar;


import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import {
  ShoppingCart,
  LogOut,
  Shield,
  Menu,
  X,
  ShoppingBag,
  Search,
  ChevronRight,
  User
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart(); // Use the whole cart object instead of just cartCount
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  // CALCULATE UNIQUE ITEMS: 
  // This ensures if you have 10 of the same product, the count is still 1.
  const uniqueItemsCount = cart?.products?.length || 0;

  useEffect(() => {
    setSearch("");
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/products?keyword=${encodeURIComponent(search.trim())}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) => `
    flex items-center gap-2 px-5 py-2 rounded-full text-[13px] font-bold uppercase tracking-widest transition-all duration-300
    ${isActive(path) 
      ? "bg-black text-white shadow-xl shadow-black/10 scale-105" 
      : "text-gray-400 hover:text-black hover:bg-gray-50"}
  `;

  return (
    <nav className="sticky top-0 z-100 bg-white/80 backdrop-blur-2xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* --- LOGO --- */}
          <Link to="/" className="group flex items-center gap-3">
            <div className="w-11 h-11 bg-black rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rounded-full group-hover:rotate-360">
              <ShoppingBag className="text-white w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase hidden lg:block">
              E-Shop
            </span>
          </Link>

          {/* --- NAV LINKS (DESKTOP) --- */}
          <div className="hidden md:flex items-center gap-2 bg-gray-50/50 p-1.5 rounded-full border border-gray-100">
            <Link to="/" className={navLinkClass("/")}>Home</Link>
            <Link to="/products" className={navLinkClass("/products")}>Shop</Link>
            <Link to="/about" className={navLinkClass("/about")}>About</Link>
            
            {user?.role === "admin" && (
              <Link to="/admin/dashboard" className={navLinkClass("/admin/dashboard")}>
                <Shield size={15} />
              </Link>
            )}
          </div>

          {/* --- ACTIONS --- */}
          <div className="flex items-center gap-3">
            {/* Search Toggle (Optional or Integrated) */}
            <form onSubmit={handleSearch} className="hidden xl:block relative group ml-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search collection..."
                className="bg-gray-50 border-none py-2.5 pl-11 pr-4 rounded-xl text-sm focus:ring-2 ring-black/5 w-48 focus:w-64 transition-all outline-none"
              />
            </form>

            {/* Cart Icon */}
            {user && (
              <Link to="/cart" className="relative p-3 bg-gray-50 rounded-2xl hover:bg-black hover:text-white transition-all active:scale-90">
                <ShoppingCart size={20} />
                {uniqueItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-black text-white text-[10px] font-black w-5 h-5 rounded-lg flex items-center justify-center border-2 border-white shadow-lg">
                    {uniqueItemsCount}
                  </span>
                )}
              </Link>
            )}

            {!user ? (
              <div className="hidden md:flex items-center gap-2 ml-2">
                <Link to="/login" className="text-xs font-black uppercase tracking-widest px-4 py-2 hover:text-gray-400 transition-colors">Login</Link>
                <Link to="/register" className="bg-black text-white text-xs font-black uppercase tracking-widest px-6 py-3 rounded-2xl hover:bg-zinc-800 transition-all shadow-xl shadow-black/10">Join</Link>
              </div>
            ) : (
              // <div className="hidden md:flex items-center gap-3 ml-2 pl-4 border-l border-gray-100">
              //   <Link to="/profile" className="w-10 h-10 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center hover:border-black transition-all overflow-hidden group">
              //     {user.avatar ? (
              //       <img src={user.avatar} className="w-full h-full object-cover" alt="User" />
              //     ) : (
              //       <User size={18} className="text-gray-400 group-hover:text-black" />
              //     )}
              //   </Link>
              //   <button onClick={handleLogout} className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
              //     <LogOut size={18} />
              //   </button>
              // </div>
                 <div className="hidden md:flex items-center gap-3 ml-2 pl-4 border-l border-gray-100">
                   <Link to="/profile" className="flex items-center gap-2 p-2 bg-gray-50 rounded-3xl">
                     <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl">
                       {user.name?.charAt(0)}
                     </div>
                     <div>
                       <p className="font-bold text-base leading-tight">{user.name}</p>
                       <p className="text-sm text-gray-500">{user.email}</p>
                     </div>
                   </Link>
                 <button onClick={handleLogout} className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                   <LogOut size={18} />
                 </button>
                 </div>
            )}

            {/* Mobile Menu Trigger */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 bg-gray-50 rounded-2xl hover:bg-black hover:text-white transition-all"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE DRAWER --- */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-20 left-0 right-0 h-[calc(100vh-5rem)] bg-white z-90 animate-in slide-in-from-bottom">
         {/* <div className="md:hidden inset-0 fixed top-20 bg-white z-90 animate-in slide-in-from-bottom-4"> */}
          <div className="p-8 space-y-8 h-full flex flex-col">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Find something..."
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-4xl outline-none"
              />
            </form>

            <div className="grid gap-4">
              <Link to="/" className="text-3xl font-black tracking-tighter uppercase flex items-center justify-between group">
                Home <ChevronRight className="text-gray-200 group-hover:text-black" />
              </Link>
              <Link to="/products" className="text-3xl font-black tracking-tighter uppercase flex items-center justify-between group">
                Shop <ChevronRight className="text-gray-200 group-hover:text-black" />
              </Link>
              <Link to="/about" className="text-3xl font-black tracking-tighter uppercase flex items-center justify-between group">
                About <ChevronRight className="text-gray-200 group-hover:text-black" />
              </Link>
            </div>

            <div className="mt-auto pb-12 space-y-4">
              {!user ? (
                <div className="flex flex-col gap-3">
                  <Link to="/login" className="w-full py-5 rounded-4xl bg-gray-50 font-black text-center uppercase tracking-widest text-xs">Login</Link>
                  <Link to="/register" className="w-full py-5 rounded-4xl bg-black text-white font-black text-center uppercase tracking-widest text-xs shadow-2xl">Join Now</Link>
                </div>
              ) : (
                <div className="bg-gray-50 p-6 rounded-4xl flex items-center justify-between">
                  <Link to="/profile" className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-black">
                      {user.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black uppercase text-xs tracking-widest">{user.name}</p>
                      <p className="text-[10px] text-gray-400">{user.email}</p>
                    </div>
                  </Link>
                  <button onClick={handleLogout} className="p-4 bg-white text-red-500 rounded-2xl shadow-sm">
                    <LogOut size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;