import { ShoppingBag } from "lucide-react";

const ProductGrid = ({ children, loading, empty, gridCols = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" }) => {
  
  if (loading) {
    return (
      <div className={`grid ${gridCols} gap-4 md:gap-6`}>
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bg-white rounded-4xl p-3 border border-gray-50 animate-pulse">
            <div className="aspect-4/5 bg-gray-100 rounded-3xl mb-4" />
            <div className="h-2 bg-gray-100 rounded-full w-1/3 mb-3" />
            <div className="h-4 bg-gray-100 rounded-full w-3/4 mb-3" />
            <div className="h-8 bg-gray-100 rounded-full w-full mt-auto" />
          </div>
        ))}
      </div>
    );
  }

  if (empty) {
    return (
      <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] border border-gray-100">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-8 h-8 text-gray-200" />
        </div>
        <h2 className="text-2xl font-bold text-black tracking-tighter">No items found</h2>
        <p className="text-gray-500 mt-2 text-center max-w-xs text-sm">
          Try refining your search or explore our latest arrivals.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols} gap-4 md:gap-6`}>
      {children}
    </div>
  );
};

export default ProductGrid;