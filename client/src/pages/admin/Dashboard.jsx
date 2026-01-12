import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Eye, 
  Package, 
  Grid, 
} from "lucide-react";

// API base URL from environment variables
if (!import.meta.env.VITE_API_URL) {
  console.error("VITE_API_URL is missing");
}

const API_URL = import.meta.env.VITE_API_URL;
const Dashboard = () => {
  const [products, setProducts] = useState([]); // all products
  const [loading, setLoading] = useState(true); // loading state 
  const [searchTerm, setSearchTerm] = useState(""); // search term

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/products");
      setProducts(data);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product permanently?")) return;

    try {
      await api.delete(`/products/${id}`);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // Filter products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="flex items-center gap-3 text-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
          <span className="text-black">Loading products...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-black/10 px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-black mb-2">
              Admin Dashboard
            </h1>
            <p className="text-xl text-black/60">
              Manage your products ({filteredProducts.length} found)
            </p>
          </div>

          <Link
            to="/admin/add-product"
            className="group flex items-center gap-3 bg-black hover:bg-black/90 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-black/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] self-start lg:self-auto"
          >
            <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Add New Product
          </Link>
        </div>
      </div>

      {/* Search & Stats */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Products */}
          <div className="bg-white border border-black/10 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-black/5 rounded-2xl flex items-center justify-center">
                <Package className="w-8 h-8 text-black/60" />
              </div>
              <div>
                <p className="text-sm font-medium text-black/70 uppercase tracking-wide">Total Products</p>
                <p className="text-3xl font-bold text-black">{products.length}</p>
              </div>
            </div>
          </div>

          {/* Filtered Products */}
          <div className="bg-white border border-black/10 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-black/5 rounded-2xl flex items-center justify-center">
                <Grid className="w-8 h-8 text-black/60" />
              </div>
              <div>
                <p className="text-sm font-medium text-black/70 uppercase tracking-wide">Showing</p>
                <p className="text-3xl font-bold text-black">{filteredProducts.length}</p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="lg:col-span-2 bg-white border border-black/10 rounded-2xl p-6 shadow-lg">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-black/20 bg-white text-lg placeholder-black/40 focus:outline-none focus:border-black focus:ring-4 focus:ring-black/10 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-24">
              <Package className="w-24 h-24 text-black/20 mx-auto mb-8" />
              <h3 className="text-2xl font-bold text-black mb-4">No products found</h3>
              <p className="text-lg text-black/60 mb-8">
                {searchTerm ? "Try a different search term." : "No products available."}
              </p>
              <Link
                to="/admin/add-product"
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-2xl font-semibold hover:bg-black/90 transition-all"
              >
                <Plus className="w-5 h-5" />
                Add Your First Product
              </Link>
            </div>
          ) : (
            <div className="bg-white border border-black/10 rounded-3xl shadow-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black/5">
                    <tr>
                      <th className="px-8 py-6 text-left text-lg font-semibold text-black">
                        Product
                      </th>
                      <th className="px-6 py-6 text-left text-lg font-semibold text-black hidden lg:table-cell">
                        Price
                      </th>
                      <th className="px-6 py-6 text-left text-lg font-semibold text-black hidden md:table-cell">
                        Category
                      </th>
                      <th className="px-6 py-6 text-right text-lg font-semibold text-black">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5">
                    {filteredProducts.map((product) => (
                      <tr
                        key={product._id}
                        className="group hover:bg-black/5 transition-colors duration-200"
                      >
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black/5 group-hover:bg-black/10 transition-colors">
                              <img
                                src={`${API_URL}${product.images?.[0]}`}
                                alt={product.name}
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                onError={(e) => {
                                  e.target.src = "/placeholder.jpg";
                                }}
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-semibold text-black text-lg line-clamp-2 group-hover:text-black/90">
                                {product.name}
                              </h4>
                              <p className="text-sm text-black/60">{product._id.slice(-6)}</p> {/* Show last 6 chars of ID */}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6 hidden lg:table-cell">
                          <span className="font-bold text-black text-lg">
                            ₹{product.price?.toLocaleString() || 0}
                          </span>
                        </td>
                        <td className="px-6 py-6 hidden md:table-cell">
                          <span className="inline-flex items-center gap-2 px-3 py-1 bg-black/10 text-black/80 text-sm rounded-full font-medium">
                            {product.category?.name || product.category || "Uncategorized"}
                          </span>
                        </td>
                        <td className="px-6 py-6 text-right">
                          <div className="flex items-center gap-2 justify-end">
                            <Link
                              to={`/admin/edit-product/${product._id}`}
                              className="p-3 rounded-xl bg-black/5 hover:bg-black/10 text-black/70 hover:text-black transition-all duration-200 hover:scale-105 flex items-center gap-2 group"
                              title="Edit Product"
                            >
                              <Edit3 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </Link>
                            <button
                              onClick={() => deleteProduct(product._id)}
                              className="p-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-all duration-200 hover:scale-105 flex items-center gap-2 group"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </button>
                            <Link
                              to={`/product/${product._id}`}
                              className="p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-all duration-200 hover:scale-105 flex items-center gap-2 group"
                              title="View Product"
                            >
                              <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
