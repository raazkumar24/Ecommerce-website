import { X, Search, ChevronDown, ListFilter, RotateCcw } from "lucide-react";

const FilterSidebar = ({
  categories,
  filters,
  onChange,
  onClear,
}) => {
  const { keyword, category, sortBy } = filters;

  return (
    <div className="bg-white rounded-[2.5rem] p-7 border border-gray-50 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-gray-200/40">
      
      {/* Header with Icon */}
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2.5 bg-black rounded-xl">
          <ListFilter size={16} className="text-white" />
        </div>
        <h3 className="font-black uppercase tracking-[0.2em] text-xs">Filter By</h3>
      </div>

      {/* --- SEARCH SECTION --- */}
      <div className="mb-10">
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-3 block">
          Keyword
        </label>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-black transition-colors" />
          <input
            value={keyword}
            onChange={(e) => onChange("keyword", e.target.value)}
            placeholder="Search..."
            className="w-full bg-gray-50 border border-transparent py-4 pl-12 pr-4 rounded-2xl outline-none focus:bg-white focus:border-gray-200 transition-all text-sm font-medium"
          />
        </div>
      </div>

      {/* --- CATEGORY SECTION (Chips instead of Select) --- */}
      <div className="mb-10">
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-4 block">
          Category
        </label>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onChange("category", "")}
            className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold transition-all ${
              category === "" 
              ? "bg-black text-white shadow-lg shadow-black/10 translate-x-1" 
              : "bg-transparent text-gray-500 hover:bg-gray-50 hover:text-black"
            }`}
          >
            All Collections
          </button>
          {categories.map((c) => (
            <button
              key={c._id}
              onClick={() => onChange("category", c.name)}
              className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold transition-all ${
                category === c.name
                ? "bg-black text-white shadow-lg shadow-black/10 translate-x-1" 
                : "bg-transparent text-gray-500 hover:bg-gray-50 hover:text-black"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* --- SORT SECTION --- */}
      <div className="mb-10">
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-3 block">
          Order By
        </label>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onChange("sortBy", e.target.value)}
            className="w-full bg-white border border-gray-100 py-4 px-5 rounded-2xl outline-none appearance-none text-xs font-bold cursor-pointer hover:border-black transition-colors"
          >
            <option value="newest">Newest Arrival</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
          <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
        </div>
      </div>

      {/* --- CLEAR ACTION --- */}
      {(keyword || category || sortBy) && (
        <button
          onClick={onClear}
          className="w-full flex items-center justify-center gap-3 py-4 border border-red-50 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all group"
        >
          <RotateCcw size={14} className="group-hover:-rotate-180 transition-transform duration-500" />
          Reset Filters
        </button>
      )}
    </div>
  );
};

export default FilterSidebar;