import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getProducts } from "../services/api";
import ProductGrid from "../components/ProductGrid";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/common/FilterSidebar";
import useProductFilters from "../hooks/useProductFilters";
import { ChevronRight, SlidersHorizontal, Package, X, Filter } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  // 🔗 URL → filters
  const filters = {
    keyword: searchParams.get("keyword") || "",
    category: searchParams.get("category") || "",
    sortBy: searchParams.get("sortBy") || "",
  };

  // 🧠 Apply filters
  const filteredProducts = useProductFilters(products, filters);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await getProducts("");
        setProducts(data || []);

        const uniqueCats = Array.from(
          new Map(data.map((p) => [p.category?._id, p.category])).values()
        ).filter(Boolean);
        
        setCategories(uniqueCats);
      } catch (err) {
        console.error("Fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // inside Products.jsx

const updateFilter = (key, value) => {
  const params = Object.fromEntries(searchParams);
  if (!value) delete params[key];
  else params[key] = value;
  setSearchParams(params);

  // IMPROVED LOGIC: 
  // Only close the drawer if the user is NOT typing (keyword)
  // We want it to stay open while typing, but close when clicking Category or Sort
  if (window.innerWidth < 1024 && key !== "keyword") {
    setIsMobileFilterOpen(false);
  }
};

const clearFilters = () => {
  setSearchParams({});
  // Close drawer on mobile when resetting
  if (window.innerWidth < 1024) {
    setIsMobileFilterOpen(false);
  }
};

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        
        {/* --- HEADER --- */}
        <header className="mb-12">
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-4">
            <Link to="/" className="hover:text-black transition-colors">Home</Link>
            <ChevronRight size={10} />
            <span className="text-black">Catalog</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl font-black tracking-tighter uppercase leading-none">
                All Products
              </h1>
              <p className="text-gray-500 mt-2 font-medium">
                Found {filteredProducts.length} premium items
              </p>
            </div>

            {/* Mobile Filter Trigger Button */}
            <div className="lg:hidden w-full md:w-auto">
              <button 
                onClick={() => setIsMobileFilterOpen(true)}
                className="w-full md:w-auto flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-black/10 active:scale-95 transition-all"
              >
                <SlidersHorizontal size={18} /> Filters
              </button>
            </div>
          </div>
        </header>

        <div className="lg:grid lg:grid-cols-4 gap-12 items-start">
          
          {/* --- DESKTOP SIDEBAR --- */}
          <aside className="hidden lg:block sticky top-28">
            <div className="flex items-center gap-2 mb-8 text-black">
              <Filter size={18} />
              <span className="font-black uppercase tracking-widest text-xs">Refine Search</span>
            </div>
            <FilterSidebar
              categories={categories}
              filters={filters}
              onChange={updateFilter}
              onClear={clearFilters}
            />
          </aside>

          {/* --- MOBILE DRAWER OVERLAY --- */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-100 lg:hidden">
              {/* Backdrop blurs the background */}
              <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" 
                onClick={() => setIsMobileFilterOpen(false)}
              />
              
              {/* Drawer Content */}
              <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white p-8 shadow-2xl animate-in animate-slide-in-from-right duration-500 overflow-y-auto rounded-l-[3rem]">
                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-black rounded-xl text-white"><SlidersHorizontal size={16} /></div>
                    <h3 className="font-black uppercase tracking-[0.2em] text-xs">Filters</h3>
                  </div>
                  <button 
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-3 bg-gray-100 rounded-2xl hover:bg-black hover:text-white transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                <FilterSidebar
                  categories={categories}
                  filters={filters}
                  onChange={updateFilter}
                  onClear={clearFilters}
                />
              </div>
            </div>
          )}

          {/* --- PRODUCTS GRID --- */}
          <div className="lg:col-span-3">
            <ProductGrid
              loading={loading}
              empty={filteredProducts.length === 0}
              gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredProducts.map((p, i) => (
                <ProductCard key={p._id} product={p} index={i} />
              ))}
            </ProductGrid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;