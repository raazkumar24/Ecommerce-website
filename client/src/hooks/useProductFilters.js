import { useMemo } from "react";

const useProductFilters = (products, filters) => {
  return useMemo(() => {
    let result = [...products];

    const { keyword, category, sortBy } = filters;

    // 🔍 Search
    if (keyword) {
      const term = keyword.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(term) ||
          p.description?.toLowerCase().includes(term) ||
          p.brand?.toLowerCase().includes(term)
      );
    }

    // 🗂 Category
    if (category) {
      result = result.filter(
        (p) =>
          p.category?._id === category ||
          p.category === category
      );
    }

    // ↕ Sort
    if (sortBy) {
      result.sort((a, b) => {
        switch (sortBy) {
          case "price":
            return (a.price || 0) - (b.price || 0);
          case "-price":
            return (b.price || 0) - (a.price || 0);
          case "name":
            return a.name.localeCompare(b.name);
          case "-name":
            return b.name.localeCompare(a.name);
          case "-createdAt":
            return new Date(b.createdAt) - new Date(a.createdAt);
          default:
            return 0;
        }
      });
    }

    return result;
  }, [products, filters]);
};

export default useProductFilters;
