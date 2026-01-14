import { Search, X } from "lucide-react";

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  inputClassName = "",
  showButton = false,
  onSubmit,
  variant = "light", // "light" | "dark"
}) => {
  const isDark = variant === "dark";

  return (
    <div className={`relative w-full ${className}`}>
      <Search
        className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
          isDark ? "text-gray-400" : "text-black/40"
        }`}
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`
          w-full pl-12 pr-10 py-3 rounded-xl outline-none transition
          ${isDark
            ? "bg-white/10 backdrop-blur border border-white/20 text-white placeholder-gray-400 focus:border-white"
            : "bg-white border border-black/20 text-black placeholder-black/40 focus:border-black focus:ring-2 focus:ring-black/10"}
          ${inputClassName}
        `}
      />

      {value && (
        <button
          onClick={() => onChange("")}
          className={`absolute right-4 top-1/2 -translate-y-1/2 ${
            isDark ? "text-gray-400 hover:text-white" : "text-black/40 hover:text-black"
          }`}
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {showButton && (
        <button
          onClick={onSubmit}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-black/90"
        >
          Search
        </button>
      )}
    </div>
  );
};

export default SearchInput;
