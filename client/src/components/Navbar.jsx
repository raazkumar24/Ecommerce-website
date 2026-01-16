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
  User,
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
    ${
      isActive(path)
        ? "bg-black text-white shadow-xl shadow-black/10 scale-105"
        : "text-gray-400 hover:text-black hover:bg-gray-50"
    }
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
              B-Store
            </span>
          </Link>

          {/* --- NAV LINKS (DESKTOP) --- */}
          <div className="hidden md:flex items-center gap-2 bg-gray-50/50 p-1.5 rounded-full border border-gray-100">
            <Link to="/" className={navLinkClass("/")}>
              Home
            </Link>
            <Link to="/products" className={navLinkClass("/products")}>
              Shop
            </Link>
            <Link to="/about" className={navLinkClass("/about")}>
              About
            </Link>

            {user?.role === "admin" && (
              <Link
                to="/admin/dashboard"
                className={navLinkClass("/admin/dashboard")}
              >
                <Shield size={15} />
              </Link>
            )}
          </div>

          {/* --- ACTIONS --- */}
          <div className="flex items-center gap-3">
            {/* Search Toggle (Optional or Integrated) */}
            <form
              onSubmit={handleSearch}
              className="hidden xl:block relative group ml-4"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-black" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search collection..."
                className="bg-gray-50 border-none py-2.5 pl-11 pr-4 rounded-xl text-sm shadow-2xs focus:ring-2 ring-black/5 w-48 focus:w-64 transition-all outline-none"
              />
            </form>

            {/* Cart Icon */}
            {user && (
              <Link
                to="/cart"
                className="relative p-3 bg-gray-50 rounded-2xl shadow-2xs hover:bg-black hover:text-white transition-all active:scale-90"
              >
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
                <Link
                  to="/login"
                  className="text-xs font-black uppercase tracking-widest px-4 py-2 hover:text-gray-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-black text-white text-xs font-black uppercase tracking-widest px-6 py-3 rounded-2xl hover:bg-zinc-800 transition-all shadow-xl shadow-black/10"
                >
                  Join
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3 ml-2 pl-4 border-l border-gray-100">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 p-2 bg-gray-50 rounded-3xl shadow-2xs"
                >
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold text-xs overflow-hidden shrink-0 border border-black/5">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      user.name?.charAt(0)
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-base leading-tight">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-2xs"
                >
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
                className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-4xl outline-none shadow-2xs"
              />
            </form>

            <div className="grid gap-4">
              <Link
                to="/"
                className="text-3xl font-black tracking-tighter uppercase flex items-center justify-between group"
              >
                Home{" "}
                <ChevronRight className="text-gray-200 group-hover:text-black" />
              </Link>
              <Link
                to="/products"
                className="text-3xl font-black tracking-tighter uppercase flex items-center justify-between group"
              >
                Shop{" "}
                <ChevronRight className="text-gray-200 group-hover:text-black" />
              </Link>
              <Link
                to="/about"
                className="text-3xl font-black tracking-tighter uppercase flex items-center justify-between group"
              >
                About{" "}
                <ChevronRight className="text-gray-200 group-hover:text-black" />
              </Link>
              {user?.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  className="text-3xl font-black tracking-tighter uppercase flex items-center justify-between group"
                >
                  Dashboard{" "}
                  <ChevronRight className="text-gray-200 group-hover:text-black" />
                </Link>
              )}
            </div>

            <div className="mt-auto pb-12 space-y-4">
              {!user ? (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    className="w-full py-5 rounded-4xl bg-gray-50 font-black text-center uppercase tracking-widest text-xs"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="w-full py-5 rounded-4xl bg-black text-white font-black text-center uppercase tracking-widest text-xs shadow-2xl"
                  >
                    Join Now
                  </Link>
                </div>
              ) : (
                <div className="bg-gray-50 p-6 rounded-4xl flex items-center justify-between shadow-2xs">
                  <Link to="/profile" className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold text-xs overflow-hidden shrink-0 border border-black/5">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        user.name?.charAt(0)
                      )}
                    </div>
                    <div>
                      <p className="font-black uppercase text-xs tracking-widest">
                        {user.name}
                      </p>
                      <p className="text-[10px] text-gray-400">{user.email}</p>
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-4 bg-white text-red-500 rounded-2xl shadow-sm"
                  >
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
