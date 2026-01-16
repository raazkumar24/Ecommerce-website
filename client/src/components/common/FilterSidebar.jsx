// import { X, Search, ChevronDown, RotateCcw } from "lucide-react";

// const FilterSidebar = ({
//   categories,
//   filters,
//   onChange,
//   onClear,
// }) => {
//   const { keyword, category, sortBy } = filters;

//   return (
//     <div className="space-y-10">
//       {/* --- SEARCH SECTION --- */}
//       <div>
//         <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-3 block">
//           Keyword Search
//         </label>
//         <div className="relative group">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-black transition-colors" />
//           <input
//             value={keyword}
//             onChange={(e) => onChange("keyword", e.target.value)}
//             placeholder="Search items..."
//             className="w-full bg-white border border-gray-100 py-4 pl-12 pr-4 rounded-2xl outline-none focus:ring-2 ring-black/5 transition-all text-sm font-bold shadow-sm"
//           />
//         </div>
//       </div>

//       {/* --- CATEGORY SECTION --- */}
//       <div>
//         <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-4 block">
//           Collections
//         </label>
//         <div className="flex flex-col gap-2">
//           {/* "All" Button */}
//           <button
//             onClick={() => onChange("category", "")}
//             className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold transition-all ${
//               category === "" 
//               ? "bg-black text-white shadow-lg shadow-black/10 translate-x-1" 
//               : "text-gray-500 hover:bg-gray-100 hover:text-black"
//             }`}
//           >
//             Show All
//           </button>

//           {/* Dynamic Categories */}
//           {categories.map((c) => (
//             <button
//               key={c._id}
//               // CRITICAL: We pass the _id here, not the name
//               onClick={() => onChange("category", c._id)}
//               className={`w-full text-left px-5 py-3 rounded-xl text-xs font-bold transition-all ${
//                 // CRITICAL: We compare against the _id
//                 category === c._id
//                 ? "bg-black text-white shadow-lg shadow-black/10 translate-x-1" 
//                 : "text-gray-500 hover:bg-gray-100 hover:text-black"
//               }`}
//             >
//               {c.name}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* --- SORT SECTION --- */}
//       <div>
//         <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-3 block">
//           Sort Sequence
//         </label>
//         <div className="relative">
//           <select
//             value={sortBy}
//             onChange={(e) => onChange("sortBy", e.target.value)}
//             className="w-full bg-white border border-gray-100 py-4 px-5 rounded-2xl outline-none appearance-none text-xs font-bold cursor-pointer hover:border-black transition-colors shadow-sm"
//           >
//             <option value="newest">Latest Arrivals</option>
//             <option value="price">Price: Low to High</option>
//             <option value="-price">Price: High to Low</option>
//             <option value="name">Alphabetical (A-Z)</option>
//           </select>
//           <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
//         </div>
//       </div>

//       {/* --- RESET ACTION --- */}
//       {(keyword || category || sortBy) && (
//         <button
//           onClick={onClear}
//           className="w-full flex items-center justify-center gap-3 py-4 border border-red-50 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all group shadow-sm"
//         >
//           <RotateCcw size={14} className="group-hover:-rotate-180 transition-transform duration-500" />
//           Reset Parameters
//         </button>
//       )}
//     </div>
//   );
// };

// export default FilterSidebar;
import { X, Search, ChevronDown, RotateCcw, ChevronRight } from "lucide-react";

const FilterSidebar = ({
  categories,
  filters,
  onChange,
  onClear,
}) => {
  const { keyword, category, sortBy } = filters;

  // Logic to separate Main Categories and Sub-categories
  const mainCategories = categories.filter(c => !c.parent);
  const getSubCategories = (parentId) => categories.filter(c => c.parent?._id === parentId || c.parent === parentId);

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

      {/* --- CATEGORY SECTION (WITH HIERARCHY) --- */}
      <div>
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 mb-4 block">
          Collections
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

          {/* Hierarchical Categories */}
          {mainCategories.map((main) => (
            <div key={main._id} className="space-y-1 mb-2">
              {/* Parent Category */}
              <button
                onClick={() => onChange("category", main._id)}
                className={`w-full text-left px-5 py-2.5 rounded-xl text-xs font-black tracking-tight transition-all ${
                  category === main._id
                  ? "bg-black text-white shadow-md translate-x-1" 
                  : "text-black hover:bg-gray-100"
                }`}
              >
                {main.name}
              </button>

              {/* Sub-categories (Child) */}
              <div className="ml-4 border-l-2 border-gray-100 pl-2 space-y-1">
                {getSubCategories(main._id).map((sub) => (
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
            </div>
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
            className="w-full bg-white border border-gray-100 py-4 px-5 rounded-2xl outline-none appearance-none text-xs font-bold cursor-pointer hover:border-black transition-colors shadow-sm"
          >
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