// const ProductGrid = ({ children, loading, empty, gridCols = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" }) => {
//   if (loading) {
//     return (
//       <div className={`grid ${gridCols} gap-4 sm:gap-6 md:gap-8`}>
//         {[...Array(8)].map((_, i) => (
//           <div key={i} className="animate-pulse">
//             <div className="bg-linear-to-br from-black/5 to-black/10 rounded-2xl h-100"></div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   if (empty) {
//     return (
//       <div className="text-center py-12 md:py-20">
//         <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 rounded-full bg-linear-to-br from-black/5 to-black/10 flex items-center justify-center">
//           <svg
//             className="w-10 h-10 md:w-12 md:h-12 text-black/30"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={1.5}
//               d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//             />
//           </svg>
//         </div>
//         <h2 className="text-2xl md:text-3xl font-semibold text-black mb-2">
//           No products found
//         </h2>
//         <p className="text-black/60 mb-6 max-w-md mx-auto">
//           Try adjusting your search or browse all products.
//         </p>
//       </div>
//     );
//   }

//   return <div className={`grid ${gridCols} gap-4 sm:gap-6 md:gap-8`}>{children}</div>;
// };

// export default ProductGrid;

import { ShoppingBag } from "lucide-react";

const ProductGrid = ({ children, loading, empty, gridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" }) => {
  
  if (loading) {
    return (
      <div className={`grid ${gridCols} gap-10`}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-[3rem] p-4 border border-gray-50 animate-pulse">
            <div className="aspect-4/5 bg-gray-100 rounded-[2.5rem] mb-6" />
            <div className="h-3 bg-gray-100 rounded-full w-1/4 mb-4" />
            <div className="h-6 bg-gray-100 rounded-full w-3/4 mb-4" />
            <div className="h-10 bg-gray-100 rounded-full w-1/2 mt-auto" />
          </div>
        ))}
      </div>
    );
  }

  if (empty) {
    return (
      <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[4rem] border border-gray-100">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8">
          <ShoppingBag className="w-10 h-10 text-gray-200" />
        </div>
        <h2 className="text-3xl font-bold text-black tracking-tighter">No items found</h2>
        <p className="text-gray-600 mt-2 text-center max-w-xs">
          Try refining your search or explore our latest arrivals.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols} gap-x-8 gap-y-12`}>
      {children}
    </div>
  );
};

export default ProductGrid;