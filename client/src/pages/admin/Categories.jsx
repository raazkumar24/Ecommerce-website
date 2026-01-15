// import { useEffect, useState } from "react";
// import api from "../../services/api";
// import toast from "react-hot-toast";
// import { 
//   Plus, 
//   Trash2, 
//   Edit3, 
//   Check, 
//   X, 
//   Tag,
//   Search,
//   Filter,
//   AlertCircle
// } from "lucide-react";

// const Categories = () => {
//   const [name, setName] = useState("");
//   const [categories, setCategories] = useState([]);
//   const [filteredCategories, setFilteredCategories] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [editingId, setEditingId] = useState(null);
//   const [editName, setEditName] = useState("");
//   const [showDeleteModal, setShowDeleteModal] = useState(null);

//   const fetchCategories = async () => {
//     try {
//       setLoading(true);
//       const { data } = await api.get("/categories");
//       setCategories(data || []);
//       setFilteredCategories(data || []);
//     } catch {
//       toast.error("Failed to load categories");
//       setCategories([]);
//       setFilteredCategories([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // Filter categories based on search
//   useEffect(() => {
//     if (!searchTerm.trim()) {
//       setFilteredCategories(categories);
//       return;
//     }
    
//     const filtered = categories.filter(category =>
//       category.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredCategories(filtered);
//   }, [searchTerm, categories]);

//   const handleAdd = async (e) => {
//     e.preventDefault();

//     if (!name.trim()) {
//       toast.error("Category name is required");
//       return;
//     }

//     try {
//       await api.post("/categories", { name: name.trim() });
//       toast.success("Category added successfully!");
//       setName("");
//       fetchCategories();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to add category");
//     }
//   };

//   const handleEdit = (category) => {
//     setEditingId(category._id);
//     setEditName(category.name);
//   };

//   const handleSaveEdit = async (id) => {
//     if (!editName.trim()) {
//       toast.error("Category name cannot be empty");
//       return;
//     }

//     try {
//       await api.put(`/categories/${id}`, { name: editName.trim() });
//       toast.success("Category updated successfully!");
//       setEditingId(null);
//       setEditName("");
//       fetchCategories();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to update category");
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditingId(null);
//     setEditName("");
//   };

//   const handleDelete = async (id) => {
//     try {
//       await api.delete(`/categories/${id}`);
//       toast.success("Category deleted successfully!");
//       fetchCategories();
//       setShowDeleteModal(null);
//     } catch {
//       toast.error("Failed to delete category");
//     }
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-linear-to-b from-gray-50 to-white flex items-center justify-center p-4">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black mb-4"></div>
//           <p className="text-black/60">Loading categories...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-linear-to-b from-gray-50 to-white p-4 sm:p-6 lg:p-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-8 sm:mb-10 lg:mb-12">
//           <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
//             <div>
//               <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2">
//                 Manage Categories
//               </h1>
//               <p className="text-black/60 text-sm sm:text-base">
//                 {categories.length} total categories • {filteredCategories.length} shown
//               </p>
//             </div>
            
//             <div className="flex items-center gap-3">
//               {searchTerm && (
//                 <button
//                   onClick={() => setSearchTerm("")}
//                   className="text-sm text-black/60 hover:text-black flex items-center gap-1"
//                 >
//                   <X className="w-4 h-4" />
//                   Clear search
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
//           {/* Left Column - Add Category & Search */}
//           <div className="lg:col-span-1 space-y-6">
//             {/* Add Category Card */}
//             <div className="bg-white border border-black/10 rounded-2xl shadow-lg p-6 sticky top-6">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-12 h-12 bg-linear-to-br from-black to-gray-800 rounded-xl flex items-center justify-center">
//                   <Plus className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-bold text-black">Add New Category</h2>
//                   <p className="text-sm text-black/60">Create a new product category</p>
//                 </div>
//               </div>

//               <form onSubmit={handleAdd} className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-semibold text-black mb-2">
//                     Category Name
//                   </label>
//                   <input
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     placeholder="e.g., Electronics, Clothing, Books"
//                     className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-black placeholder-black/40 outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all duration-200"
//                     maxLength={50}
//                   />
//                   <div className="text-xs text-black/40 mt-1 text-right">
//                     {name.length}/50 characters
//                   </div>
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full bg-linear-to-r from-black to-gray-800 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-black/20 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
//                 >
//                   <Plus className="w-4 h-4" />
//                   Add Category
//                 </button>
//               </form>

//               <div className="mt-6 pt-6 border-t border-black/10">
//                 <h3 className="text-sm font-semibold text-black mb-3">Tips</h3>
//                 <ul className="space-y-2 text-sm text-black/60">
//                   <li className="flex items-start gap-2">
//                     <div className="w-1.5 h-1.5 bg-black/40 rounded-full mt-1.5"></div>
//                     Keep category names short and descriptive
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <div className="w-1.5 h-1.5 bg-black/40 rounded-full mt-1.5"></div>
//                     Use unique names to avoid confusion
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <div className="w-1.5 h-1.5 bg-black/40 rounded-full mt-1.5"></div>
//                     Categories help organize your products
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             {/* Search Card */}
//             <div className="bg-white border border-black/10 rounded-2xl shadow-lg p-6">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center">
//                   <Search className="w-5 h-5 text-black/60" />
//                 </div>
//                 <div>
//                   <h2 className="text-lg font-semibold text-black">Search Categories</h2>
//                   <p className="text-sm text-black/60">Find specific categories</p>
//                 </div>
//               </div>

//               <div className="relative">
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Type to search categories..."
//                   className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 pl-11 text-black placeholder-black/40 outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all duration-200"
//                 />
//                 <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-black/40" />
//                 {searchTerm && (
//                   <button
//                     onClick={() => setSearchTerm("")}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>

//               <div className="flex items-center gap-2 mt-4">
//                 <Filter className="w-4 h-4 text-black/40" />
//                 <span className="text-sm text-black/60">
//                   {filteredCategories.length} category{filteredCategories.length !== 1 ? 's' : ''} found
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Categories List */}
//           <div className="lg:col-span-2">
//             <div className="bg-white border border-black/10 rounded-2xl shadow-lg overflow-hidden">
//               {/* List Header */}
//               <div className="px-6 py-4 bg-black/5 border-b border-black/10">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <Tag className="w-5 h-5 text-black/60" />
//                     <h2 className="text-xl font-bold text-black">All Categories</h2>
//                   </div>
//                   <div className="text-sm text-black/60">
//                     Sorted alphabetically
//                   </div>
//                 </div>
//               </div>

//               {/* Categories List */}
//               <div className="divide-y divide-black/5">
//                 {filteredCategories.length === 0 ? (
//                   <div className="text-center py-16">
//                     <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-black/5 flex items-center justify-center">
//                       <Tag className="w-10 h-10 text-black/30" />
//                     </div>
//                     <h3 className="text-xl font-semibold text-black mb-2">
//                       {searchTerm ? "No categories found" : "No categories yet"}
//                     </h3>
//                     <p className="text-black/60 mb-6 max-w-sm mx-auto">
//                       {searchTerm 
//                         ? "Try a different search term or clear the search to see all categories."
//                         : "Add your first category to start organizing products."
//                       }
//                     </p>
//                     {searchTerm && (
//                       <button
//                         onClick={() => setSearchTerm("")}
//                         className="px-4 py-2 bg-black text-white rounded-xl font-medium hover:bg-black/90 transition-colors"
//                       >
//                         Clear Search
//                       </button>
//                     )}
//                   </div>
//                 ) : (
//                   filteredCategories.map((category) => (
//                     <div
//                       key={category._id}
//                       className="px-6 py-4 hover:bg-black/5 transition-colors duration-200 group"
//                     >
//                       {editingId === category._id ? (
//                         // Edit Mode
//                         <div className="flex items-center justify-between gap-4">
//                           <input
//                             value={editName}
//                             onChange={(e) => setEditName(e.target.value)}
//                             className="flex-1 rounded-xl border border-black/20 bg-white px-4 py-2 text-black outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-all"
//                             autoFocus
//                           />
//                           <div className="flex items-center gap-2">
//                             <button
//                               onClick={() => handleSaveEdit(category._id)}
//                               className="p-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
//                               title="Save"
//                             >
//                               <Check className="w-4 h-4" />
//                             </button>
//                             <button
//                               onClick={handleCancelEdit}
//                               className="p-2 bg-black/10 text-black rounded-xl hover:bg-black/20 transition-colors"
//                               title="Cancel"
//                             >
//                               <X className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </div>
//                       ) : (
//                         // View Mode
//                         <div className="flex items-center justify-between gap-4">
//                           <div className="flex items-center gap-4">
//                             <div className="w-10 h-10 bg-linear-to-br from-black/5 to-black/10 rounded-xl flex items-center justify-center">
//                               <span className="text-lg font-bold text-black/60">
//                                 {category.name.charAt(0).toUpperCase()}
//                               </span>
//                             </div>
//                             <div>
//                               <h3 className="font-semibold text-black text-lg">
//                                 {category.name}
//                               </h3>
//                               <p className="text-sm text-black/40">
//                                 ID: {category._id.slice(-6)}
//                               </p>
//                             </div>
//                           </div>
//                           <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                             <button
//                               onClick={() => handleEdit(category)}
//                               className="p-2 bg-black/5 text-black rounded-xl hover:bg-black/10 transition-colors hover:scale-105"
//                               title="Edit category"
//                             >
//                               <Edit3 className="w-4 h-4" />
//                             </button>
//                             <button
//                               onClick={() => setShowDeleteModal(category._id)}
//                               className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors hover:scale-105"
//                               title="Delete category"
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </button>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   ))
//                 )}
//               </div>

//               {/* List Footer */}
//               {filteredCategories.length > 0 && (
//                 <div className="px-6 py-4 bg-black/5 border-t border-black/10">
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-black/60">
//                       Showing {filteredCategories.length} of {categories.length} categories
//                     </span>
//                     <div className="flex items-center gap-2">
//                       <AlertCircle className="w-4 h-4 text-black/40" />
//                       <span className="text-black/60">
//                         Click on a category to edit or delete
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-slide-up">
//             <div className="text-center mb-6">
//               <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <AlertCircle className="w-8 h-8 text-red-600" />
//               </div>
//               <h3 className="text-xl font-bold text-black mb-2">Delete Category</h3>
//               <p className="text-black/60">
//                 Are you sure you want to delete this category? This action cannot be undone.
//               </p>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-3">
//               <button
//                 onClick={() => setShowDeleteModal(null)}
//                 className="flex-1 py-3 border border-black/20 text-black rounded-xl font-medium hover:bg-black/5 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => handleDelete(showDeleteModal)}
//                 className="flex-1 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
//               >
//                 <Trash2 className="w-4 h-4" />
//                 Delete Category
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add CSS for animation */}
//       <style jsx>{`
//         @keyframes slide-up {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-slide-up {
//           animation: slide-up 0.3s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Categories;


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