import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { 
  Plus, Trash2, Edit3, Check, X, Tag, Search, 
  Filter, AlertCircle, Layers, RotateCcw
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  useEffect(() => {
    const filtered = categories.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchTerm, categories]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Name required");
    try {
      await api.post("/categories", { name: name.trim() });
      toast.success("Category created");
      setName("");
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  const handleSaveEdit = async (id) => {
    if (!editName.trim()) return toast.error("Cannot be empty");
    try {
      await api.put(`/categories/${id}`, { name: editName.trim() });
      toast.success("Updated");
      setEditingId(null);
      fetchCategories();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/categories/${id}`);
      toast.success("Removed successfully");
      fetchCategories();
      setShowDeleteModal(null);
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-8 h-8 border-b-2 border-black border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black antialiased pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 md:pt-12">
        
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8 md:mb-12">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-600 mb-1">
              <Layers className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Taxonomy</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase leading-none">Categories</h1>
          </div>
          <p className="text-gray-600 font-bold text-[10px] tracking-widest border-2 border-black p-1">
            {categories.length} Structures Total
          </p>
        </header>

        {/* --- RESPONSIVE GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">
          
          {/* --- LEFT: ACTIONS (Stacks on mobile, Sticky on desktop) --- */}
          <div className="lg:col-span-4 space-y-4 md:space-y-6 lg:sticky lg:top-8 order-2 lg:order-1">
            {/* Create Card */}
            <div className="bg-white rounded-4xl md:rounded-[2.5rem] p-6 md:p-8 border border-gray-50 shadow-sm transition-all hover:shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-600 mb-4 md:mb-6">New Category</h3>
              <form onSubmit={handleAdd} className="space-y-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter label..."
                  className="w-full bg-gray-50 border-none py-3 px-5 md:py-4 md:px-6 rounded-xl md:rounded-2xl outline-none focus:ring-1 focus:ring-black/10 transition-all font-medium text-sm"
                  maxLength={50}
                />
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 md:py-4 rounded-xl md:rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-black/10 hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={14} /> Create Entry
                </button>
              </form>
            </div>

            {/* Search Card */}
            <div className="bg-white rounded-4xl md:rounded-[2.5rem] p-6 md:p-8 border border-gray-100 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-600 mb-4">Filter List</h3>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter by name..."
                  className="w-full bg-gray-50 border-none py-3 pl-11 pr-4 rounded-xl md:rounded-2xl outline-none text-xs font-bold"
                />
              </div>
            </div>
          </div>

          {/* --- RIGHT: LIST (8 COLS) --- */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="bg-white rounded-4xl md:rounded-[3rem] border border-gray-50 shadow-sm overflow-hidden">
              <div className="px-6 py-4 md:px-8 md:py-6 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Database Records</span>
                <Filter size={14} className="text-gray-300" />
              </div>

              <div className="divide-y divide-gray-50">
                {filteredCategories.length === 0 ? (
                  <div className="py-16 md:py-24 text-center px-6">
                    <RotateCcw className="w-10 h-10 text-gray-100 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">No records matching query.</p>
                  </div>
                ) : (
                  filteredCategories.map((category) => (
                    <div key={category._id} className="group px-4 py-4 md:px-8 md:py-6 hover:bg-gray-50/50 transition-all">
                      {editingId === category._id ? (
                        /* Edit Mode */
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full sm:flex-1 bg-white border border-black/10 py-2 px-4 md:py-3 md:px-5 rounded-xl outline-none font-bold"
                            autoFocus
                          />
                          <div className="flex gap-2 w-full sm:w-auto justify-end">
                            <button onClick={() => handleSaveEdit(category._id)} className="flex-1 sm:flex-none p-3 bg-black text-white rounded-xl shadow-lg flex justify-center"><Check size={18} /></button>
                            <button onClick={() => setEditingId(null)} className="flex-1 sm:flex-none p-3 bg-gray-100 text-gray-600 rounded-xl flex justify-center"><X size={18} /></button>
                          </div>
                        </div>
                      ) : (
                        /* View Mode */
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-3 md:gap-6 min-w-0">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-50 rounded-xl md:rounded-2xl shrink-0 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                              <span className="text-xs md:text-sm font-black italic">{category.name.charAt(0)}</span>
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-bold text-sm md:text-lg tracking-tight group-hover:translate-x-1 transition-transform duration-500 truncate">{category.name}</h3>
                              <p className="text-[8px] md:text-[9px] font-mono text-gray-500 uppercase truncate">UID: {category._id.slice(-8)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 md:gap-2 lg:opacity-0 group-hover:opacity-100 transition-all lg:translate-x-4 group-hover:translate-x-0">
                            {/* <button 
                              onClick={() => { setEditingId(category._id); setEditName(category.name); }}
                              className="p-2 md:p-3 bg-gray-50 hover:bg-black hover:text-white rounded-xl transition-all"
                            >
                              <Edit3 size={14} className="md:w-4 md:h-4" />
                            </button> */}
                            <button 
                              onClick={() => setShowDeleteModal(category._id)}
                              className="p-2 md:p-3 bg-gray-50 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                            >
                              <Trash2 size={14} className="md:w-4 md:h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* --- DELETE MODAL (Responsive Bottom Sheet on Mobile) --- */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-100 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-t-[2.5rem] sm:rounded-[3rem] max-w-sm w-full p-8 md:p-10 shadow-2xl animate-in slide-in-from-bottom sm:zoom-in duration-300">
            <div className="text-center mb-8">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-2">Delete Record</h3>
              <p className="text-gray-600 font-medium text-xs md:text-sm leading-relaxed px-2">
                This action is permanent and will remove this category from the system.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setShowDeleteModal(null)} className="py-3 md:py-4 bg-gray-100 rounded-xl md:rounded-2xl font-bold text-[10px] uppercase tracking-widest">Cancel</button>
              <button onClick={() => handleDelete(showDeleteModal)} className="py-3 md:py-4 bg-black text-white rounded-xl md:rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-xl">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;