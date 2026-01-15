import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import ProductGrid from "../components/ProductGrid";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Truck,
  Layers,
  ArrowUpRight,
} from "lucide-react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [featuredProduct, setFeaturedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await getProducts("");
      const items = data || [];
      setProducts(items.slice(0, 8));
      // Set the first item as the "Hero" featured product
      setFeaturedProduct(items[0]);
    } catch (err) {
      console.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black antialiased">
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black text-white rounded-full">
                <Sparkles className="w-3 h-3" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                  New Season Drop
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.9] uppercase">
                Premium <br />
                <span className="text-gray-400">Hardware.</span>
              </h1>

              <p className="text-lg text-gray-500 max-w-sm font-medium leading-relaxed">
                Experience the next generation of performance. Our curated
                collection brings your real workflow to life.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="flex items-center justify-center gap-3 bg-black text-white px-10 py-5 rounded-2xl font-bold hover:bg-zinc-800 transition-all active:scale-95 shadow-2xl shadow-black/10"
                >
                  Shop Now <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center md:text-left">
                  <p className="text-2xl font-black">2.4k+</p>
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                    Active Users
                  </p>
                </div>
                <div className="h-10 w-px bg-gray-100" />
                <div className="text-center md:text-left">
                  <p className="text-2xl font-black">Free</p>
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                    Global Ship
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Element using REAL PRODUCT IMAGE */}
            <div className="order-1 lg:order-2 relative group">
              <div className="aspect-square rounded-[3rem] overflow-hidden bg-[#F8F8F8] shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
                {featuredProduct?.images?.[0] ? (
                  <img
                    src={featuredProduct.images[0]}
                    alt={featuredProduct.name}
                    className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-200">
                    <Layers className="w-20 h-20" />
                  </div>
                )}
              </div>

              {/* Floating Badge for Real Product */}
              {featuredProduct && (
                <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-white p-6 rounded-4xl shadow-2xl border border-gray-50 max-w-40 lg:max-w-50 animate-bounce-slow">
                  <p className="text-[9px] font-bold text-gray-600 uppercase mb-1 tracking-widest">
                    Featured Item
                  </p>
                  <p className="text-sm font-black truncate uppercase">
                    {featuredProduct.name}
                  </p>
                  <p className="text-lg font-black text-emerald-600 mt-1">
                    ₹{featuredProduct.price?.toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUSTED SECTION (BLACK BG) ================= */}
      <section className="bg-black py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-10">
            Trusted by Industry Leaders
          </p>
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-10 lg:gap-20 opacity-70">
            <span className="text-2xl lg:text-3xl font-black italic text-white tracking-tighter">
              NIKE
            </span>
            <span className="text-2xl lg:text-3xl font-black italic text-white tracking-tighter">
              ADIDAS
            </span>
            <span className="text-2xl lg:text-3xl font-black italic text-white tracking-tighter">
              APPLE
            </span>
            <span className="text-2xl lg:text-3xl font-black italic text-white tracking-tighter">
              SONY
            </span>
            <span className="text-2xl lg:text-3xl font-black italic text-white tracking-tighter">
              BEATS
            </span>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Layers className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                  Our Store
                </span>
              </div>
              <h2 className="text-5xl font-bold tracking-tighter uppercase">
                Latest Drops
              </h2>
            </div>

            <Link
              to="/products"
              className="group flex items-center gap-3 text-sm font-bold border-2 border-black pb-2 transition-all"
            >
              See All Products{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </header>

          <ProductGrid
            loading={loading}
            empty={products.length === 0 && !loading}
            gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          >
            {products.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
          </ProductGrid>
        </div>
      </section>

      {/* ================= MODERN CTA ================= */}
      <section className="px-4 sm:px-6 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto bg-black rounded-2xl md:rounded-[3rem] lg:rounded-[4rem] p-6 md:p-12 lg:p-24 overflow-hidden relative text-center lg:text-left">
          {/* Responsive Zap icon - scales with screen size */}
          <Zap className="absolute top-4 right-4 w-32 h-32 md:top-8 md:right-8 md:w-48 md:h-48 lg:top-10 lg:right-10 lg:w-64 lg:h-64 text-white/5 -rotate-12" />

          <div className="relative z-10 grid lg:grid-cols-2 items-center gap-6 md:gap-8 lg:gap-12">
            <div>
              {/* Responsive heading - scales from mobile to desktop */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white tracking-tighter leading-tight md:leading-none mb-4 md:mb-6">
                Ready to <br className="hidden sm:block" /> Upgrade?
              </h2>

              {/* Paragraph text with responsive sizing and max-width */}
              <p className="text-white/50 text-base sm:text-lg font-medium max-w-md mx-auto lg:mx-0">
                Join our newsletter and get exclusive access to new drops and
                premium discounts.
              </p>
            </div>

            {/* Form container - stacks vertically on mobile, horizontal on larger screens */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-end">
              {/* Email input - full width on mobile, adaptive width on larger screens */}
              <input
                type="email"
                placeholder="Enter email address"
                className="bg-white/10 border border-white/10 rounded-xl sm:rounded-2xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 text-white outline-none focus:bg-white/20 transition-all w-full sm:w-auto sm:flex-1 lg:w-80"
              />

              {/* Submit button with responsive padding and font weight */}
              <button className="bg-white text-black px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl font-bold sm:font-black hover:bg-gray-200 transition-all whitespace-nowrap">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
