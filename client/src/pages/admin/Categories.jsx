import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { 
  Plus, Trash2, Check, X, Layers, Search, 
  Filter, AlertCircle, RotateCcw, ChevronRight 
} from "lucide-react";

const Categories = () => {
  const [name, setName] = useState("");
  const [parent, setParent] = useState(""); // New state for parent category
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
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
    console.log("Sending Data:", { name, parent: parent || null });
    if (!name.trim()) return toast.error("Name required");
    try {
      await api.post("/categories", { 
        name: name.trim(),
        parent: parent || null 
      });
      toast.success("Category created");
      setName("");
      setParent("");
      fetchCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
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
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Taxonomy System</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase leading-none">Categories</h1>
          </div>
          <p className="text-gray-600 font-bold text-[10px] tracking-widest border-2 border-black p-1">
            {categories.length} Total Nodes
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* --- LEFT: ACTIONS --- */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-8 order-2 lg:order-1">
            {/* Create Card */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-50 shadow-sm transition-all hover:shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-600 mb-6">New Category</h3>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold uppercase ml-1 mb-1 block text-gray-400">Label</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Laptops"
                    className="w-full bg-gray-50 border-none py-4 px-6 rounded-2xl outline-none focus:ring-1 focus:ring-black/10 transition-all font-medium text-sm"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase ml-1 mb-1 block text-gray-400">Parent (Optional)</label>
                  <select
                    value={parent}
                    onChange={(e) => setParent(e.target.value)}
                    className="w-full bg-gray-50 border-none py-4 px-6 rounded-2xl outline-none focus:ring-1 focus:ring-black/10 transition-all font-medium text-sm text-gray-600 appearance-none cursor-pointer"
                  >
                    <option value="">Main Category</option>
                    {categories.filter(c => !c.parent).map(c => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-black/10 hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={14} /> Create Entry
                </button>
              </form>
            </div>

            {/* Search Card */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-600 mb-4">Filter List</h3>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter by name..."
                  className="w-full bg-gray-50 border-none py-3 pl-11 pr-4 rounded-2xl outline-none text-xs font-bold"
                />
              </div>
            </div>
          </div>

          {/* --- RIGHT: LIST --- */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="bg-white rounded-[3rem] border border-gray-50 shadow-sm overflow-hidden">
              <div className="px-8 py-6 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Database Records</span>
                <Filter size={14} className="text-gray-300" />
              </div>

              <div className="divide-y divide-gray-50">
                {filteredCategories.length === 0 ? (
                  <div className="py-24 text-center px-6">
                    <RotateCcw className="w-10 h-10 text-gray-100 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">No records matching query.</p>
                  </div>
                ) : (
                  filteredCategories.map((category) => (
                    <div key={category._id} className="group px-8 py-6 hover:bg-gray-50/50 transition-all">
                      <div className="flex items-center justify-between gap-2">
                        <div className={`flex items-center gap-4 min-w-0 ${category.parent ? 'ml-8' : ''}`}>
                          {/* Icon/Avatar */}
                          <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center transition-all duration-500 
                            ${category.parent ? 'bg-white border border-gray-100 text-gray-400' : 'bg-gray-50 text-black group-hover:bg-black group-hover:text-white'}`}>
                            {category.parent ? <ChevronRight size={14} /> : <span className="text-xs font-black italic">{category.name.charAt(0)}</span>}
                          </div>
                          
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className={`font-bold tracking-tight transition-transform duration-500 truncate ${category.parent ? 'text-sm text-gray-600' : 'text-lg text-black'}`}>
                                {category.name}
                              </h3>
                              {category.parent && (
                                <span className="text-[7px] bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">
                                  Child of {category.parent.name}
                                </span>
                              )}
                            </div>
                            <p className="text-[8px] font-mono text-gray-400 uppercase truncate">ID: {category._id}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                          <button 
                            onClick={() => setShowDeleteModal(category._id)}
                            className="p-3 bg-gray-50 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- DELETE MODAL --- */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-100 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-t-[2.5rem] sm:rounded-[3rem] max-w-sm w-full p-10 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Delete Record</h3>
              <p className="text-gray-600 font-medium text-sm leading-relaxed">
                Deleting this category might affect products linked to it. Continue?
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setShowDeleteModal(null)} className="py-4 bg-gray-100 rounded-2xl font-bold text-[10px] uppercase tracking-widest">Cancel</button>
              <button onClick={() => handleDelete(showDeleteModal)} className="py-4 bg-black text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-xl">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;