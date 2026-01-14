import { X, Search, ChevronDown, ListFilter, RotateCcw } from "lucide-react";

const FilterSidebar = ({
  categories,
  filters,
  onChange,
  onClear,
}) => {
  const { keyword, category, sortBy } = filters;

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
            className="w-full bg-white border border-gray-100 py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 ring-black/5 transition-all text-sm font-bold"
          />
        </div>
      </div>

      {/* --- CATEGORY SECTION --- */}
      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-4 block">
          Collections
        </label>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onChange("category", "")}
            className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold transition-all ${
              category === "" 
              ? "bg-black text-white shadow-lg translate-x-1" 
              : "text-gray-500 hover:bg-gray-100 hover:text-black"
            }`}
          >
            Show All
          </button>
          {categories.map((c) => (
            <button
              key={c._id}
              onClick={() => onChange("category", c.name)}
              className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold transition-all ${
                category === c.name
                ? "bg-black text-white shadow-lg translate-x-1" 
                : "text-gray-500 hover:bg-gray-100 hover:text-black"
              }`}
            >
              {c.name}
            </button>
          ))}
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
            className="w-full bg-white border border-gray-100 py-4 px-5 rounded-2xl outline-none appearance-none text-xs font-bold cursor-pointer hover:border-black transition-colors"
          >
            <option value="newest">Latest Arrivals</option>
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="name">Alphabetical (A-Z)</option>
          </select>
          <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
        </div>
      </div>

      {/* --- RESET --- */}
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