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