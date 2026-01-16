import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "./ProductCard"; // Ensure path is correct
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const SimilarProducts = ({ categoryId, currentProductId }) => {
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        // Hum getAllProducts wala route hi use karenge with category filter
        const { data } = await api.get(`/products?category=${categoryId}`);
        // Current product ko list se hata denge
        const filtered = data.filter((p) => p._id !== currentProductId);
        setSimilar(filtered.slice(0, 4)); // Sirf 4 products dikhayenge
      } catch (error) {
        console.error("Error fetching similar products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) fetchSimilar();
  }, [categoryId, currentProductId]);

  if (loading || similar.length === 0) return null;

  return (
    <div className="mt-20 lg:mt-32 pt-16 border-t border-gray-100">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-2xl lg:text-3xl font-black tracking-tighter uppercase">
          Similar Assets
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
        {similar.map((p, index) => (
          <ProductCard key={p._id} product={p} index={index} />
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;