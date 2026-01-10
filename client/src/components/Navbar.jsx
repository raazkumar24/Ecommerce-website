import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import {
  ShoppingCart,
  User,
  LogOut,
  Home,
  Shield,
  Menu,
  X,
  ShoppingBag,
  FileSpreadsheet,
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle user logout
  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
  };

  const navLinkClass =
    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-black hover:bg-black/5 transition-all duration-200";
  const mobileNavLinkClass =
    "flex items-center gap-3 px-4 py-3 text-base rounded-lg text-black hover:bg-black/5 transition-all duration-200";

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="p-2 border border-black rounded-lg">
              <ShoppingBag className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-black">
              E-Shop
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/" className={navLinkClass}>
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>

            {user && (
              <Link to="/cart" className="relative">
                <div className={navLinkClass}>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>
            )}
            {/* About Link */}
            <Link to="/about" className={navLinkClass}>
              <FileSpreadsheet className="w-4 h-4" />
              <span>About</span>
            </Link>

            {/* Admin Dashboard Link */}
            {user?.role === "admin" && (
              <Link to="/admin/dashboard" className={navLinkClass}>
                <Shield className="w-4 h-4" />
                <span>Admin</span>
              </Link>
            )}

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg border border-black text-sm font-medium text-black hover:bg-black hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-black text-sm font-medium text-white hover:bg-black/90 transition-colors"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-black/10">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-full border border-black/10 hover:bg-black/5 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-black">
                    Hi, {user.name.split(" ")[0]}
                  </span>
                </Link>
                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 p-2 rounded-lg text-sm text-black hover:bg-black/5 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-black/5 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-black" />
            ) : (
              <Menu className="w-6 h-6 text-black" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-t border-black/10 shadow-lg">
            <div className="px-4 py-3 space-y-2">
              <Link
                to="/"
                className={mobileNavLinkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>

              {user && (
                <Link
                  to="/cart"
                  className={mobileNavLinkClass}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <ShoppingCart className="w-5 h-5" />
                      <span>Cart</span>
                    </div>
                    {cartCount > 0 && (
                      <span className="bg-black text-white text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </div>
                </Link>
              )}

              {/* About Link */}
              <Link to="/about" className={navLinkClass}>
                <FileSpreadsheet className="w-5 h-5" />
                <span>About</span>
              </Link>

              {user?.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  className={mobileNavLinkClass}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Shield className="w-5 h-5" />
                  <span>Admin Dashboard</span>
                </Link>
              )}

              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 px-4 py-3 my-1 rounded-lg border border-black text-sm font-medium text-black hover:bg-black hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center justify-center gap-2 px-4 py-3 my-1 rounded-lg bg-black text-sm font-medium text-white hover:bg-black/90 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Register</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg border border-black/10 hover:bg-black/5 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black">
                        {user.name}
                      </p>
                      <p className="text-xs text-black/70">{user.email}</p>
                    </div>
                  </Link>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-3 w-full px-4 py-3 text-sm text-black hover:bg-black/5 rounded-lg"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
