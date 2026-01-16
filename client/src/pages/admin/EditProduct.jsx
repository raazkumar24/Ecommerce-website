import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Package,
  DollarSign,
  Tag,
  FileText,
  CheckCircle,
  Layers,
  Archive,
  Info,
  ChevronDown,
  Percent,
  Check,
  X,
} from "lucide-react";

import { useImageHandling } from "../../hooks/useImageHandling";
import ImageUploader from "../../components/ImageUploader";

const EditProduct = () => {
  const { id } = useParams();
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
  });

  // Keywords
  const [keywordInput, setKeywordInput] = useState(""); // Jo type ho raha hai
  const [keywords, setKeywords] = useState([]); // Jo tags ban chuke hain

  // Tag add karne ka logic
  const addTag = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tag = keywordInput.trim().replace(",", "");
      if (tag && !keywords.includes(tag)) {
        setKeywords([...keywords, tag]);
      }
      setKeywordInput("");
    }
  };

  // Tag remove karne ka logic
  const removeTag = (tagToRemove) => {
    setKeywords(keywords.filter((t) => t !== tagToRemove));
  };

  /* ========== IMAGE HANDLING ========== */
  const generateId = useCallback(
    () => Date.now() + Math.random().toString(36).slice(2),
    []
  );

  const {
    images,
    setImages,
    handleFiles,
    removeImage,
    replaceImage,
    handleDragStart,
    handleDragOverReordering,
    handleDropReordering,
    draggedItem,
    dragOverItem,
  } = useImageHandling(generateId);

  /* ========== FETCH DATA ========== */
  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [id]);

  const mainCategories = categories.filter((c) => !c.parent);
  const getSubCategories = (parentId) =>
    categories.filter(
      (c) => c.parent?._id === parentId || c.parent === parentId
    );

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);

      setForm({
        name: data.name || "",
        price: data.price || "",
        category: data.category?._id || data.category || "",
        description: data.description || "",
        stock: data.stock || "",
        brand: data.brand || "",
        discount: data.discount || 0,
        isNew: data.isNew || false,
      });

      setKeywords(data.keywords || []);

      const existingImages = (data.images || []).map((url, index) => ({
        id: `old-${index}-${Date.now()}`,
        type: "old",
        url,
        file: null,
        preview: null,
      }));

      setImages(existingImages);
    } catch (err) {
      toast.error("Failed to load product");
      navigate("/admin/dashboard");
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      // Agar type checkbox hai toh boolean (true/false) lo, warna string value
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.name || !form.price || !form.category) {
      toast.error("Please fill all required fields");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));

    images.forEach((img) => {
      if (img.type === "old" && img.url) {
        formData.append("existingImages", img.url);
      }
      if (img.type === "new" && img.file) {
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
      await api.put(`/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Inventory updated");
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black antialiased pb-20">
      {/* --- STICKY SUB-NAV --- */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 flex items-center px-6 mb-8">
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest hover:-translate-x-1 transition-transform"
          >
            <ArrowLeft size={16} /> Back to Assets
          </button>
          <div className="hidden md:flex items-center gap-2 text-gray-600">
            <Layers size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Product Configuration
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6">
        <header className="mb-12">
          <h1 className="text-5xl font-bold tracking-tighter uppercase leading-none mb-2">
            Edit Record
          </h1>
          <p className="text-gray-600 font-medium">
            Modifying Asset ID:{" "}
            <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
              {id?.slice(-8)}
            </span>
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* --- MAIN CONFIGURATION CARD --- */}
          <section className="bg-white rounded-[2.5rem] p-8 lg:p-12 border border-gray-50 shadow-sm transition-all hover:shadow-xl hover:shadow-gray-200/50">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-10 flex items-center gap-3">
              <Info size={14} /> Core Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Name */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">
                  Registry Name
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
                    placeholder="Enter product title..."
                    className="w-full bg-gray-50 border-none py-5 pl-14 pr-6 rounded-3xl outline-none focus:bg-white focus:ring-2 ring-black/5 transition-all font-bold text-lg"
                    required
                  />
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">
                  Market Value (INR)
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
                  Manufacturer Label
                </label>
                <input
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  placeholder="e.g. Apple, Sony..."
                  className="w-full bg-gray-50 border-none py-5 px-8 rounded-3xl outline-none focus:bg-white focus:ring-2 ring-black/5 transition-all font-bold"
                  required
                />
              </div>

              {/* Stock */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">
                  Stock Quantum
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
                  Manifest Description
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
                    placeholder="Describe the asset properties..."
                    className="w-full bg-gray-50 border-none py-6 pl-14 pr-6 rounded-4xl outline-none focus:bg-white focus:ring-2 ring-black/5 transition-all font-medium leading-relaxed resize-none"
                  />
                </div>
              </div>
              {/* keyowrd */}
              <div className="md:col-span-2 space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">
                  Search Keywords (Press Enter to add)
                </label>

                <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-3xl border border-transparent focus-within:bg-white focus-within:border-gray-200 transition-all">
                  {/* Displaying Tags */}
                  {keywords.map((tag, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-2xl text-xs font-bold animate-in zoom-in duration-300"
                    >
                      {tag}
                      <button type="button" onClick={() => removeTag(tag)}>
                        <X
                          size={14}
                          className="hover:text-red-400 transition-colors"
                        />
                      </button>
                    </span>
                  ))}

                  {/* Input Field */}
                  <input
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={addTag}
                    placeholder={
                      keywords.length === 0
                        ? "e.g. gaming, wireless, portable..."
                        : "Add more..."
                    }
                    className="flex-1 bg-transparent border-none outline-none py-2 px-2 text-sm font-bold min-w-37.5"
                  />
                </div>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest ml-4">
                  Tip: Add synonyms or related terms to improve search results.
                </p>
              </div>
            </div>
          </section>

          {/* --- MEDIA MANAGEMENT CARD --- */}
          <section className="bg-white rounded-[2.5rem] p-8 lg:p-12 border border-gray-50 shadow-sm transition-all hover:shadow-xl hover:shadow-gray-200/40">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-8">
              Asset Visualization
            </h3>
            <ImageUploader
              images={images}
              onFiles={handleFiles}
              onRemoveImage={removeImage}
              onReplaceImage={replaceImage}
              onDragStart={handleDragStart}
              onDragOverReordering={handleDragOverReordering}
              onDropReordering={handleDropReordering}
              draggedItem={draggedItem}
              dragOverItem={dragOverItem}
              showReplace
            />
          </section>

          {/* --- ACTION BAR --- */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              className="flex-1 bg-gray-100 text-gray-500 py-5 rounded-3xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-gray-200 transition-all active:scale-95"
            >
              Discard Changes
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
                  Push to Production
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditProduct;
