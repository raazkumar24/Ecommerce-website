import { useState } from "react";
import { 
  Search, 
  ChevronDown, 
  RotateCcw, 
  ChevronRight, 
  Layers, 
  ChevronUp 
} from "lucide-react";

const FilterSidebar = ({
  categories,
  filters,
  onChange,
  onClear,
}) => {
  const { keyword, category, sortBy } = filters;
  
  // State to track which parent category dropdown is open
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (id) => {
    setOpenMenus(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // --- LOGIC FIX: Check for both string and object for .parent ---
  const mainCategories = categories.filter(c => {
    // Agar parent null hai ya exist nahi karta, toh wo Main Category hai
    return !c.parent;
  });

  const getSubCategories = (parentId) => 
    categories.filter(c => {
      // Sub-category ka parent ID nikalne ke liye check karein string vs object
      const currentParentId = typeof c.parent === 'object' ? c.parent?._id : c.parent;
      return currentParentId === parentId;
    });

  return (
    <div className="space-y-10">
      {/* --- SEARCH SECTION --- */}
      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-3 block">
          Keyword Search
        </label>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-black transition-colors" />
          <input
            value={keyword}
            onChange={(e) => onChange("keyword", e.target.value)}
            placeholder="Search items..."
            className="w-full bg-white border border-gray-100 py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 ring-black/5 transition-all text-sm font-bold shadow-sm"
          />
        </div>
      </div>

      {/* --- CATEGORY SECTION (DROPDOWN HIERARCHY) --- */}
      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-4 flex items-center gap-2">
          <Layers size={12} /> Collections
        </label>
        
        <div className="flex flex-col gap-1">
          {/* "All" Button */}
          <button
            onClick={() => onChange("category", "")}
            className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold transition-all mb-2 ${
              category === "" 
              ? "bg-black text-white shadow-lg translate-x-1" 
              : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Show All
          </button>

          {/* Render Categories */}
          {mainCategories.length > 0 ? (
            mainCategories.map((main) => {
              const subs = getSubCategories(main._id);
              const hasSubs = subs.length > 0;
              const isOpen = openMenus[main._id];
              const isMainSelected = category === main._id;

              return (
                <div key={main._id} className="space-y-1 mb-1">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onChange("category", main._id)}
                      className={`flex-1 text-left px-5 py-3 rounded-xl text-xs font-black tracking-tight transition-all flex items-center justify-between ${
                        isMainSelected
                        ? "bg-black text-white shadow-md translate-x-1" 
                        : "text-black hover:bg-gray-50"
                      }`}
                    >
                      {main.name}
                    </button>
                    
                    {hasSubs && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMenu(main._id);
                        }}
                        className={`p-2.5 rounded-xl transition-colors ${isOpen ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                      >
                        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    )}
                  </div>

                  {hasSubs && isOpen && (
                    <div className="ml-4 border-l-2 border-gray-100 pl-2 space-y-1 animate-in slide-in-from-top-2 duration-300">
                      {subs.map((sub) => (
                        <button
                          key={sub._id}
                          onClick={() => onChange("category", sub._id)}
                          className={`w-full text-left px-4 py-2 rounded-lg text-[11px] font-bold transition-all flex items-center gap-2 ${
                            category === sub._id
                            ? "text-black bg-gray-100 translate-x-1" 
                            : "text-gray-400 hover:text-black hover:bg-gray-50"
                          }`}
                        >
                          <ChevronRight size={10} className={category === sub._id ? "text-black" : "text-gray-300"} />
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-[10px] text-gray-400 text-center py-4 uppercase font-bold tracking-widest">
              No Collections Found
            </p>
          )}
        </div>
      </div>

      {/* --- SORT SECTION --- */}
      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-3 block">
          Sort Sequence
        </label>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onChange("sortBy", e.target.value)}
            className="w-full bg-white border border-gray-100 py-4 px-5 rounded-2xl outline-none appearance-none text-xs font-bold cursor-pointer hover:border-black transition-colors shadow-sm"
          >
          {/*  --- OPTIONS ---  */}
            <option value="newest">Latest Arrivals</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="name">Alphabetical (A-Z)</option>
          </select>
          <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
        </div>
      </div>

      {/* --- RESET ACTION --- */}
      {(keyword || category || sortBy) && (
        <button
          onClick={onClear}
          className="w-full flex items-center justify-center gap-3 py-4 border border-red-50 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all group shadow-sm"
        >
          <RotateCcw size={14} className="group-hover:-rotate-180 transition-transform duration-500" />
          Reset Parameters
        </button>
      )}
    </div>
  );
};

export default FilterSidebar;