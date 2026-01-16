// import { useMemo } from "react";

// const useProductFilters = (products, filters) => {
//   return useMemo(() => {
//     // Safety check for empty products
//     if (!products) return [];
    
//     let result = [...products];
//     const { keyword, category, sortBy } = filters;

//     // 1. 🔍 Keyword Search
//     if (keyword) {
//       const term = keyword.toLowerCase().trim();
//       result = result.filter(
//         (p) =>
//           p.name?.toLowerCase().includes(term) ||
//           p.description?.toLowerCase().includes(term) ||
//           p.brand?.toLowerCase().includes(term)
//       );
//     }

//     // 2. 🗂 Category Filter (Matching by ID)
//     if (category) {
//       result = result.filter(
//         (p) => {
//           // Checks if p.category is an object with _id or just a string ID
//           const productCategoryId = typeof p.category === 'object' ? p.category?._id : p.category;
//           return productCategoryId === category;
//         }
//       );
//     }

//     // 3. ↕ Sort Logic
//     if (sortBy) {
//       result.sort((a, b) => {
//         switch (sortBy) {
//           case "price": // Low to High
//             return (a.price || 0) - (b.price || 0);
//           case "-price": // High to Low
//             return (b.price || 0) - (a.price || 0);
//           case "name": // A to Z
//             return (a.name || "").localeCompare(b.name || "");
//           case "newest": // Latest Arrivals
//           case "-createdAt":
//             return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
//           default:
//             return 0;
//         }
//       });
//     }

//     return result;
//   }, [products, filters]);
// };

// export default useProductFilters;


import { useMemo } from "react";

const useProductFilters = (products, filters) => {
  // Filters se variables nikalna zaroori hai
  const { keyword, category, sortBy } = filters;

  return useMemo(() => {
    if (!products) return [];
    
    let result = [...products];

    // 1. 🔍 Keyword Search
    if (keyword) {
      const term = keyword.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(term) ||
          p.description?.toLowerCase().includes(term) ||
          p.brand?.toLowerCase().includes(term) ||
          (p.keywords && p.keywords.some(k => k.toLowerCase().includes(term)))
      );
    }

    // 2. 🗂 Category Filter
 // 2. 🗂 Category Filter (Updated Logic)
if (category) {
  result = result.filter((p) => {
    // 1. Check direct match (Agar product usi category mein hai)
    const isDirectMatch = p.category?._id === category || p.category === category;

    // 2. Check parent match (Agar product ki category ka parent selected category hai)
    // Iske liye aapka product data populated hona chahiye backend se
    const isSubCategoryMatch = 
      p.category?.parent === category || 
      p.category?.parent?._id === category;

    return isDirectMatch || isSubCategoryMatch;
  });
}

    // 3. ↕ Sort Logic
    if (sortBy) {
      result.sort((a, b) => {
        switch (sortBy) {
          case "price": return (a.price || 0) - (b.price || 0);
          case "-price": return (b.price || 0) - (a.price || 0);
          case "name": return (a.name || "").localeCompare(b.name || "");
          case "newest":
          case "-createdAt":
            return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
          default: return 0;
        }
      });
    }

    return result;
    // FIX: Dependency array mein 'filters' ka use karein ya keyword, category, sortBy ko define karein
  }, [products, keyword, category, sortBy]); 
};

export default useProductFilters;