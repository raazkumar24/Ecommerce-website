import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Tag,
  Search,
  Filter,
  AlertCircle
} from "lucide-react";

const Categories = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/categories");
      setCategories(data || []);
      setFilteredCategories(data || []);
    } catch {
      toast.error("Failed to load categories");
      setCategories([]);
      setFilteredCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter categories based on search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCategories(categories);
      return;
    }
    
    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      await api.post("/categories", { name: name.trim() });
      toast.success("Category added successfully!");
      setName("");
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add category");
    }
  };

  const handleEdit = (category) => {
    setEditingId(category._id);
    setEditName(category.name);
  };

  const handleSaveEdit = async (id) => {
    if (!editName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    try {
      await api.put(`/categories/${id}`, { name: editName.trim() });
      toast.success("Category updated successfully!");
      setEditingId(null);
      setEditName("");
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update category");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName("");
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/categories/${id}`);
      toast.success("Category deleted successfully!");
      fetchCategories();
      setShowDeleteModal(null);
    } catch {
      toast.error("Failed to delete category");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
          <p className="text-black/60">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2">
                Manage Categories
              </h1>
              <p className="text-black/60 text-sm sm:text-base">
                {categories.length} total categories • {filteredCategories.length} shown
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-sm text-black/60 hover:text-black flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear search
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Add Category & Search */}
          <div className="lg:col-span-1 space-y-6">
            {/* Add Category Card */}
            <div className="bg-white border border-black/10 rounded-2xl shadow-lg p-6 sticky top-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-800 rounded-xl flex items-center justify-center">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-black">Add New Category</h2>
                  <p className="text-sm text-black/60">Create a new product category</p>
                </div>
              </div>

              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Category Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Electronics, Clothing, Books"
                    className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-black placeholder-black/40 outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all duration-200"
                    maxLength={50}
                  />
                  <div className="text-xs text-black/40 mt-1 text-right">
                    {name.length}/50 characters
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-black to-gray-800 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-black/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Category
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-black/10">
                <h3 className="text-sm font-semibold text-black mb-3">Tips</h3>
                <ul className="space-y-2 text-sm text-black/60">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-black/40 rounded-full mt-1.5"></div>
                    Keep category names short and descriptive
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-black/40 rounded-full mt-1.5"></div>
                    Use unique names to avoid confusion
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-black/40 rounded-full mt-1.5"></div>
                    Categories help organize your products
                  </li>
                </ul>
              </div>
            </div>

            {/* Search Card */}
            <div className="bg-white border border-black/10 rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center">
                  <Search className="w-5 h-5 text-black/60" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-black">Search Categories</h2>
                  <p className="text-sm text-black/60">Find specific categories</p>
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Type to search categories..."
                  className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 pl-11 text-black placeholder-black/40 outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all duration-200"
                />
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-black/40" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Filter className="w-4 h-4 text-black/40" />
                <span className="text-sm text-black/60">
                  {filteredCategories.length} category{filteredCategories.length !== 1 ? 's' : ''} found
                </span>
              </div>
            </div>
          </div>

          {/* Right Column - Categories List */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-black/10 rounded-2xl shadow-lg overflow-hidden">
              {/* List Header */}
              <div className="px-6 py-4 bg-black/5 border-b border-black/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Tag className="w-5 h-5 text-black/60" />
                    <h2 className="text-xl font-bold text-black">All Categories</h2>
                  </div>
                  <div className="text-sm text-black/60">
                    Sorted alphabetically
                  </div>
                </div>
              </div>

              {/* Categories List */}
              <div className="divide-y divide-black/5">
                {filteredCategories.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-black/5 flex items-center justify-center">
                      <Tag className="w-10 h-10 text-black/30" />
                    </div>
                    <h3 className="text-xl font-semibold text-black mb-2">
                      {searchTerm ? "No categories found" : "No categories yet"}
                    </h3>
                    <p className="text-black/60 mb-6 max-w-sm mx-auto">
                      {searchTerm 
                        ? "Try a different search term or clear the search to see all categories."
                        : "Add your first category to start organizing products."
                      }
                    </p>
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="px-4 py-2 bg-black text-white rounded-xl font-medium hover:bg-black/90 transition-colors"
                      >
                        Clear Search
                      </button>
                    )}
                  </div>
                ) : (
                  filteredCategories.map((category) => (
                    <div
                      key={category._id}
                      className="px-6 py-4 hover:bg-black/5 transition-colors duration-200 group"
                    >
                      {editingId === category._id ? (
                        // Edit Mode
                        <div className="flex items-center justify-between gap-4">
                          <input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="flex-1 rounded-xl border border-black/20 bg-white px-4 py-2 text-black outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all"
                            autoFocus
                          />
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleSaveEdit(category._id)}
                              className="p-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                              title="Save"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="p-2 bg-black/10 text-black rounded-xl hover:bg-black/20 transition-colors"
                              title="Cancel"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        // View Mode
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-black/5 to-black/10 rounded-xl flex items-center justify-center">
                              <span className="text-lg font-bold text-black/60">
                                {category.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-black text-lg">
                                {category.name}
                              </h3>
                              <p className="text-sm text-black/40">
                                ID: {category._id.slice(-6)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEdit(category)}
                              className="p-2 bg-black/5 text-black rounded-xl hover:bg-black/10 transition-colors hover:scale-105"
                              title="Edit category"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setShowDeleteModal(category._id)}
                              className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors hover:scale-105"
                              title="Delete category"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* List Footer */}
              {filteredCategories.length > 0 && (
                <div className="px-6 py-4 bg-black/5 border-t border-black/10">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-black/60">
                      Showing {filteredCategories.length} of {categories.length} categories
                    </span>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-black/40" />
                      <span className="text-black/60">
                        Click on a category to edit or delete
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-slide-up">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">Delete Category</h3>
              <p className="text-black/60">
                Are you sure you want to delete this category? This action cannot be undone.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 py-3 border border-black/20 text-black rounded-xl font-medium hover:bg-black/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteModal)}
                className="flex-1 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add CSS for animation */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Categories;