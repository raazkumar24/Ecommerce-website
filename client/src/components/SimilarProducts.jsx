import { useMemo } from "react";
import ProductCard from "./ProductCard";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const SimilarProducts = ({ allProducts, category, currentProductId }) => {
  // Memoize filtering logic to avoid re-calculating on every render
  const similarItems = useMemo(() => {
    if (!allProducts || !category) return [];

    const categoryId = category._id || category;
    const parentId = category.parent?._id || category.parent;

    // Filter Logic:
    // 1. Same sub-category ke products
    // 2. Same parent category ke products (Hierarchy)
    let filtered = allProducts.filter((p) => {
      if (p._id === currentProductId) return false; // Current item hata do

      const productCatId = p.category?._id || p.category;
      const productParentId = p.category?.parent?._id || p.category?.parent;

      const isSameSub = productCatId === categoryId;
      const isSameParent = parentId && (productCatId === parentId || productParentId === parentId);

      return isSameSub || isSameParent;
    });

    // Randomize results aur top 4 uthao
    return filtered.sort(() => 0.5 - Math.random()).slice(0, 4);
  }, [allProducts, category, currentProductId]);

  if (similarItems.length === 0) return null;

  return (
    <div className="mt-20 lg:mt-32 pt-16 border-t border-gray-100">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-2xl lg:text-3xl font-black tracking-tighter uppercase">
          Similar to {category.name || "this item"}
        </h2>
        <Link
          to="/products"
          className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group border-b-2 border-black pb-1"
        >
          Explore All
          <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {similarItems.map((p, index) => (
          <ProductCard key={p._id} product={p} index={index} />
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;