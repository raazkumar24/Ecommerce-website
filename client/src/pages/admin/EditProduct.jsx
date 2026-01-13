// EditProduct.jsx - COMPLETE FIXED VERSION
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
} from "lucide-react";
import { useImageHandling, ImageUploader } from "../../components/ImageUploader";

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

  // Generate unique ID for images
  const generateId = useCallback(() => {
    return Date.now() + Math.random().toString(36).substr(2, 9);
  }, []);

  // Use custom image handling hook
  const {
    images,
    setImages,
    dragging,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    removeImage,
    replaceImage,
    handleDragStart,
    handleDragOverReordering,
    handleDropReordering,
    handleDragEnd,
    draggedItem,
    dragOverItem
  } = useImageHandling(generateId);

  // FETCH PRODUCT & CATEGORIES
  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [id]);

  // FETCH PRODUCT
  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);
      console.log("Product data:", data);
      console.log("Product images:", data.images);

      setForm({
        name: data.name || "",
        price: data.price || "",
        category: data.category?._id || data.category || "",
        description: data.description || "",
        stock: data.stock || "",
        brand: data.brand || "",
      });

      // Initialize images with unique IDs and track original order
      const initialImages = (data.images || []).map((img, index) => {
        console.log(`Image ${index}:`, img);
        return {
          id: `old-${index}-${Date.now()}`,
          url: img,
          type: 'old',
          originalIndex: index,
          file: null
        };
      });
      console.log("Initial images:", initialImages);
      setImages(initialImages);
    } catch (error) {
      console.error("Failed to load product:", error);
      toast.error("Failed to load product");
      navigate("/admin/dashboard");
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  const handleChange = useCallback(
    (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    },
    [form]
  );

  // Handle file change - ADDED THIS FUNCTION
  const handleFileChange = useCallback(
    (e) => {
      if (e.target.files && e.target.files.length > 0) {
        const validFiles = Array.from(e.target.files).filter(
          (file) => file.type.startsWith("image/") && file.size < 5 * 1024 * 1024
        );

        if (validFiles.length === 0) {
          toast.error("No valid image files selected (must be image and < 5MB)");
          return;
        }

        const newImagesWithIds = validFiles.map((file) => ({
          id: `new-${generateId()}`,
          file: file,
          preview: URL.createObjectURL(file),
          type: 'new'
        }));

        setImages((prev) => [...prev, ...newImagesWithIds]);
      }
    },
    [generateId, setImages]
  );

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img.preview) {
          URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, [images]);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.name || !form.price || !form.category) {
      toast.error("Please fill all required fields");
      setLoading(false);
      return;
    }

    const formData = new FormData();

    // Form fields
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("description", form.description);
    formData.append("stock", form.stock);
    formData.append("brand", form.brand);

    // Append images in their current order
    images.forEach((img) => {
      if (img.type === 'old' && img.url) {
        formData.append("existingImages", img.url);
      } else if (img.type === 'new' && img.file) {
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
      toast.success("Product updated successfully!");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-black/10 px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="inline-flex items-center gap-2 text-base sm:text-lg font-semibold text-black hover:text-black/80 transition-colors mb-4 sm:mb-6"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Back to Dashboard
          </button>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
            Edit Product
          </h1>
        </div>
      </div>

      {/* Main Form */}
      <div className="px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-black/10 shadow-lg sm:shadow-xl md:shadow-2xl rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 space-y-6 sm:space-y-8"
          >
            {/* Basic Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {/* Product Name */}
              <div className="space-y-1 sm:space-y-2">
                <label className="flex items-center gap-2 text-sm sm:text-base lg:text-lg font-semibold text-black">
                  <Package className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  Product Name
                </label>
                <input
                  name="name"
                  placeholder="Enter product name"
                  className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-black/20 bg-white text-base sm:text-lg md:text-xl font-semibold focus:outline-none focus:border-black focus:ring-2 sm:focus:ring-4 focus:ring-black/10 transition-all duration-200 hover:border-black/30 sm:hover:border-black/40 shadow-md sm:shadow-lg"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Price */}
              <div className="space-y-1 sm:space-y-2">
                <label className="flex items-center gap-2 text-sm sm:text-base lg:text-lg font-semibold text-black">
                  <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-base sm:text-lg md:text-xl font-semibold text-black">
                    ₹
                  </span>
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-black/20 bg-white text-base sm:text-lg md:text-xl font-bold focus:outline-none focus:border-black focus:ring-2 sm:focus:ring-4 focus:ring-black/10 transition-all duration-200 hover:border-black/30 sm:hover:border-black/40 shadow-md sm:shadow-lg"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Category, Stock & Description */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {/* Category */}
              <div className="space-y-1 sm:space-y-2">
                <label className="flex items-center gap-2 text-sm sm:text-base lg:text-lg font-semibold text-black">
                  <Tag className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  Category
                </label>
                <select
                  name="category"
                  className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-black/20 bg-white text-base sm:text-lg md:text-xl font-semibold focus:outline-none focus:border-black focus:ring-2 sm:focus:ring-4 focus:ring-black/10 transition-all duration-200 hover:border-black/30 sm:hover:border-black/40 shadow-md sm:shadow-lg appearance-none"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div className="space-y-1 sm:space-y-2">
                <label className="flex items-center gap-2 text-sm sm:text-base lg:text-lg font-semibold text-black">
                  <Tag className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  Brand
                </label>
                <input
                  name="brand"
                  type="text"
                  placeholder="Enter brand name"
                  className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-black/20 bg-white text-base sm:text-lg md:text-xl font-semibold focus:outline-none focus:border-black focus:ring-2 sm:focus:ring-4 focus:ring-black/10 transition-all duration-200 hover:border-black/30 sm:hover:border-black/40 shadow-md sm:shadow-lg"
                  value={form.brand}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Stock */}
              <div className="space-y-1 sm:space-y-2">
                <label className="flex items-center gap-2 text-sm sm:text-base lg:text-lg font-semibold text-black">
                  <Tag className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  Stock
                </label>
                <input
                  name="stock"
                  type="number"
                  min="0"
                  placeholder="0"
                  className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-black/20 bg-white text-base sm:text-lg md:text-xl font-semibold focus:outline-none focus:border-black focus:ring-2 sm:focus:ring-4 focus:ring-black/10 transition-all duration-200 hover:border-black/30 sm:hover:border-black/40 shadow-md sm:shadow-lg"
                  value={form.stock}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Description */}
              <div className="lg:col-span-2 space-y-1 sm:space-y-2">
                <label className="flex items-center gap-2 text-sm sm:text-base lg:text-lg font-semibold text-black">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  placeholder="Enter product description"
                  className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-black/20 bg-white text-sm sm:text-base md:text-lg resize-vertical focus:outline-none focus:border-black focus:ring-2 sm:focus:ring-4 focus:ring-black/10 transition-all duration-200 hover:border-black/30 sm:hover:border-black/40 shadow-md sm:shadow-lg"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Image Upload */}
            <ImageUploader
              images={images}
              dragging={dragging}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onFileChange={handleFileChange} // Added this prop
              onReplaceImage={replaceImage}
              onRemoveImage={removeImage}
              onDragStart={handleDragStart}
              onDragOverReordering={handleDragOverReordering}
              onDropReordering={handleDropReordering}
              onDragEnd={handleDragEnd}
              draggedItem={draggedItem}
              dragOverItem={dragOverItem}
              showReplace={true}
            />

            {/* Submit Button */}
            <div className="pt-4 sm:pt-6 md:pt-8 border-t border-black/10 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => navigate("/admin/dashboard")}
                className="flex-1 bg-black/10 hover:bg-black/20 text-black border border-black/20 px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 md:py-5 lg:py-6 rounded-lg sm:rounded-xl md:rounded-2xl font-bold text-sm sm:text-base md:text-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 md:py-5 lg:py-6 rounded-lg sm:rounded-xl md:rounded-2xl font-bold text-sm sm:text-base md:text-lg shadow-lg sm:shadow-xl transition-all duration-300 ${
                  loading
                    ? "bg-black/50 text-black/50 cursor-not-allowed"
                    : "bg-black hover:bg-black/90 text-white hover:shadow-black/40 hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 border-b-2 border-white"></div>
                    <span className="text-sm sm:text-base">Updating...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    <span className="text-sm sm:text-base">Update Product</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;