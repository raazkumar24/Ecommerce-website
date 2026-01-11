const ProductGrid = ({ children, loading, empty, gridCols = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" }) => {
  if (loading) {
    return (
      <div className={`grid ${gridCols} gap-4 sm:gap-6 md:gap-8`}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-linear-to-br from-black/5 to-black/10 rounded-2xl h-[400px]"></div>
          </div>
        ))}
      </div>
    );
  }

  if (empty) {
    return (
      <div className="text-center py-12 md:py-20">
        <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-black/5 to-black/10 flex items-center justify-center">
          <svg
            className="w-10 h-10 md:w-12 md:h-12 text-black/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold text-black mb-2">
          No products found
        </h2>
        <p className="text-black/60 mb-6 max-w-md mx-auto">
          Try adjusting your search or browse all products.
        </p>
      </div>
    );
  }

  return <div className={`grid ${gridCols} gap-4 sm:gap-6 md:gap-8`}>{children}</div>;
};

export default ProductGrid;