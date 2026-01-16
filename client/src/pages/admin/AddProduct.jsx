import { useState, useEffect, useCallback } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  DollarSign,
  Tag,
  FileText,
  CheckCircle,
  Layers,
  Archive,
  ChevronDown,
  Info,
  Percent,
  Check,
} from "lucide-react";

import { useImageHandling } from "../../hooks/useImageHandling";
import ImageUploader from "../../components/ImageUploader";

const mainCategories = categories.filter(c => !c.parent);
const getSubCategories = (parentId) => categories.filter(c => c.parent?._id === parentId || c.parent === parentId);

const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "",
    brand: "",
    discount: 0,
    isNew: false,
  });

  /* ========== IMAGE HANDLING ========== */
  const generateId = useCallback(
    () => Date.now() + Math.random().toString(36).slice(2),
    []
  );

  const {
    images,
    handleFiles,
    removeImage,
    handleDragStart,
    handleDragOverReordering,
    handleDropReordering,
    draggedItem,
    dragOverItem,
  } = useImageHandling(generateId);

  /* ========== FETCH CATEGORIES ========== */
  useEffect(() => {
    api
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch(() => toast.error("Failed to load categories"));
  }, []);

  /* ========== FORM HANDLER ========== */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      // Agar type checkbox hai toh boolean (true/false) lo, warna string value
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ========== SUBMIT ========== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !form.name ||
      !form.price ||
      !form.category ||
      !form.brand ||
      !form.description ||
      images.length === 0
    ) {
      toast.error("Please fill all fields and add at least one image");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));
    images.forEach((img) => {
      if (img.file) {
        formData.append("images", img.file);
      }
    });

    formData.append(
      "imageOrder",
      JSON.stringify(
        images.map((img) => ({
          type: img.type,
          url: img.url || null,
        }))
      )
    );

    try {
      await api.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Product created successfully!");
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black antialiased pb-20">
      {/* --- STICKY TOP NAV --- */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 flex items-center px-6 mb-8">
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest hover:-translate-x-1 transition-transform"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          <div className="hidden md:flex items-center gap-2 text-gray-600">
            <Layers size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Inventory Creation
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6">
        <header className="mb-12">
          <h1 className="text-5xl font-bold tracking-tighter uppercase leading-none mb-2">
            New Product
          </h1>
          <p className="text-gray-600 font-medium">
            Add a new entry to your digital catalog.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* --- CORE DETAILS CARD --- */}
          <section className="bg-white rounded-[2.5rem] p-8 lg:p-12 border border-gray-50 shadow-sm transition-all hover:shadow-xl hover:shadow-gray-200/50">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-10 flex items-center gap-3">
              <Info size={14} /> Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Name */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">
                  Full Product Title
                </label>
                <div className="relative">
                  <Package
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. MacBook Pro M3 Max"
                    className="w-full bg-gray-50 border-none py-5 pl-14 pr-6 rounded-3xl outline-none focus:bg-white focus:ring-2 ring-black/5 transition-all font-bold text-lg"
                    required
                  />
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">
                  Pricing (INR)
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-gray-500 italic">
                    ₹
                  </span>
                  <input
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full bg-gray-50 border-none py-5 pl-12 pr-6 rounded-3xl outline-none focus:bg-white focus:ring-2 ring-black/5 transition-all font-black text-xl"
                    required
                  />
                </div>
              </div>

              {/* Category */}
              {/* Category Section Update */}
              <div className="space-y-2 text-black">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">
                  Category Node
                </label>
                <div className="relative">
                  <Tag
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-none py-5 pl-14 pr-12 rounded-3xl outline-none focus:bg-white focus:ring-2 ring-black/5 transition-all font-bold appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select structure...</option>

                    {mainCategories.map((main) => (
                      <optgroup key={main._id} label={main.name.toUpperCase()}>
                        {/* Main category ko select karne ka option */}
                        <option value={main._id}>{main.name} (Main)</option>

                        {/* Uske andar ki Sub-categories */}
                        {getSubCategories(main._id).map((sub) => (
                          <option key={sub._id} value={sub._id}>
                            &nbsp;&nbsp;&nbsp;↳ {sub.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                </div>
              </div>

              {/* Brand */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">
                  Manufacturer
                </label>
                <input
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  placeholder="Brand Label"
                  className="w-full bg-gray-50 border-none py-5 px-8 rounded-3xl outline-none focus:bg-white focus:ring-2 ring-black/5 transition-all font-bold"
                  required
                />
              </div>

              {/* Stock */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">
                  Initial Stock
                </label>
                <div className="relative">
                  <Archive
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  <input
                    name="stock"
                    type="number"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full bg-gray-50 border-none py-5 pl-14 pr-6 rounded-3xl outline-none focus:bg-white focus:ring-2 ring-black/5 transition-all font-black text-xl"
                    required
                  />
                </div>
              </div>

              {/* Descount */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">
                  Discount Percentage
                </label>
                <div className="relative">
                  <Percent
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
                    size={18}
                  />
                  <input
                    name="discount"
                    type="number"
                    value={form.discount}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full bg-gray-50 border-none py-5 pl-14 pr-6 rounded-3xl outline-none focus:bg-white focus:ring-2 ring-black/5 transition-all font-black text-xl"
                    required
                  />
                </div>
              </div>

              {/* isNew */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">
                  New Collection Status
                </label>
                <div className="flex items-center justify-between bg-gray-50 p-5 rounded-3xl border border-transparent transition-all hover:bg-white hover:border-gray-100 group shadow-sm">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-xl transition-all ${
                        form.isNew
                          ? "bg-black text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      <CheckCircle size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-black uppercase tracking-tight">
                        Set as New Arrival
                      </p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                        Display "New" badge on product
                      </p>
                    </div>
                  </div>

                  {/* Custom Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      name="isNew"
                      type="checkbox"
                      className="sr-only peer"
                      checked={form.isNew}
                      onChange={handleChange}
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:start-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-6 after:transition-all peer-checked:bg-black"></div>
                  </label>
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">
                  Product Narrative
                </label>
                <div className="relative">
                  <FileText
                    className="absolute left-5 top-6 text-gray-500"
                    size={18}
                  />
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe the unique features..."
                    className="w-full bg-gray-50 border-none py-6 pl-14 pr-6 rounded-4xl outline-none focus:bg-white focus:ring-2 ring-black/5 transition-all font-medium leading-relaxed resize-none"
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          {/* --- MEDIA UPLOAD CARD --- */}
          <section className="bg-white rounded-[2.5rem] p-8 lg:p-12 border border-gray-50 shadow-sm transition-all hover:shadow-xl hover:shadow-gray-200/50">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-8">
              Visual Assets
            </h3>
            <ImageUploader
              images={images}
              onFiles={handleFiles}
              onRemoveImage={removeImage}
              onDragStart={handleDragStart}
              onDragOverReordering={handleDragOverReordering}
              onDropReordering={handleDropReordering}
              draggedItem={draggedItem}
              dragOverItem={dragOverItem}
              showReplace={false}
            />
          </section>

          {/* --- ACTION BAR --- */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              className="flex-1 bg-gray-100 text-gray-500 py-5 rounded-3xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-gray-200 transition-all active:scale-95"
            >
              Cancel Entry
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-2 bg-black text-white py-5 rounded-3xl font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl shadow-black/20 hover:bg-zinc-800 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white/20 border-t-white" />
              ) : (
                <>
                  <CheckCircle size={16} />
                  Validate & Publish
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddProduct;
