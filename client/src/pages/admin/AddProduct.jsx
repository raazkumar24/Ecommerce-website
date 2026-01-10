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
  ImagePlus,
  Upload,
  X,
  CheckCircle,
  GripVertical,
} from "lucide-react";

const AddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]); // Array of {id, file, preview}
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "",
  });

  // Generate unique ID for images
  const generateId = useCallback(() => {
    return Date.now() + Math.random().toString(36).substr(2, 9);
  }, []);

  // Fetch categories on mount
  useEffect(() => {
    api
      .get("/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch(() => {
        toast.error("Failed to load categories");
      });
  }, []);

  // Handle form field changes
  const handleChange = useCallback(
    (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    },
    [form]
  );

  /* ================= IMAGE HANDLERS ================= */

  // ADD NEW IMAGES
  const handleFiles = useCallback((files) => {
    const validFiles = Array.from(files).filter(
      (file) => file.type.startsWith("image/") && file.size < 5 * 1024 * 1024
    );

    if (validFiles.length === 0) {
      toast.error("No valid image files selected (must be image and < 5MB)");
      return;
    }

    const newImagesWithIds = validFiles.map(file => ({
      id: `new-${generateId()}`,
      file: file,
      preview: URL.createObjectURL(file)
    }));

    setImages((prev) => [...prev, ...newImagesWithIds]);
  }, [generateId]);

  // DRAG & DROP HANDLERS for file upload
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
  }, []);

  const handleFileChange = useCallback(
    (e) => {
      handleFiles(e.target.files);
    },
    [handleFiles]
  );

  // REMOVE IMAGE
  const removeImage = useCallback((id) => {
    // Revoke object URL to prevent memory leaks
    const imageToRemove = images.find(img => img.id === id);
    if (imageToRemove && imageToRemove.preview) {
      URL.revokeObjectURL(imageToRemove.preview);
    }
    
    setImages((prev) => prev.filter((img) => img.id !== id));
  }, [images]);

  /* ================= DRAG & DROP REORDERING ================= */

  // Handle drag start for reordering
  const handleDragStart = useCallback((e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  // Handle drag over for reordering
  const handleDragOverReordering = useCallback((e, index) => {
    e.preventDefault();
    if (draggedItem !== null && draggedItem !== index) {
      setDragOverItem(index);
    }
  }, [draggedItem]);

  // Handle drop for reordering
  const handleDropReordering = useCallback((e, dropIndex) => {
    e.preventDefault();
    
    if (draggedItem === null || draggedItem === dropIndex) return;
    
    setImages((prev) => {
      const items = [...prev];
      const [draggedItemContent] = items.splice(draggedItem, 1);
      items.splice(dropIndex, 0, draggedItemContent);
      return items;
    });
    
    setDraggedItem(null);
    setDragOverItem(null);
  }, [draggedItem]);

  // Handle drag end
  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
    setDragOverItem(null);
  }, []);

  /* ================= FORM SUBMISSION ================= */

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      images.forEach(img => {
        if (img.preview) {
          URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, [images]);

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !form.name ||
      !form.price ||
      !form.category ||
      !form.description ||
      !form.stock ||
      images.length === 0
    ) {
      toast.error("Please fill all fields and add at least one image");
      setLoading(false);
      return;
    }

    // Prepare form data
    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    
    // Add images in their current order
    images.forEach((imgObj) => {
      formData.append("images", imgObj.file);
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
      toast.success("Product added successfully!");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Add product error:", error);
      toast.error(error.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-black/10 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="inline-flex items-center gap-2 text-lg font-semibold text-black hover:text-black/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl lg:text-4xl font-bold text-black">
            Add New Product
          </h1>
        </div>
      </div>

      {/* Main Form */}
      <div className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-black/10 shadow-2xl rounded-3xl p-8 lg:p-12 space-y-8"
          >
            {/* Basic Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-lg font-semibold text-black">
                  <Package className="w-6 h-6" />
                  Product Name
                </label>
                <input
                  name="name"
                  placeholder="Enter product name"
                  className="w-full px-6 py-5 rounded-2xl border-2 border-black/20 bg-white text-xl font-semibold focus:outline-none focus:border-black focus:ring-4 focus:ring-black/10 transition-all duration-200 hover:border-black/40 shadow-lg"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-lg font-semibold text-black">
                  <DollarSign className="w-6 h-6" />
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-semibold text-black">
                    ₹
                  </span>
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full pl-12 pr-6 py-5 rounded-2xl border-2 border-black/20 bg-white text-xl font-bold focus:outline-none focus:border-black focus:ring-4 focus:ring-black/10 transition-all duration-200 hover:border-black/40 shadow-lg"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Category, Stock & Description */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Category */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-lg font-semibold text-black">
                  <Tag className="w-6 h-6" />
                  Category
                </label>
                <select
                  name="category"
                  className="w-full px-6 py-5 rounded-2xl border-2 border-black/20 bg-white text-xl font-semibold focus:outline-none focus:border-black focus:ring-4 focus:ring-black/10 transition-all duration-200 hover:border-black/40 shadow-lg appearance-none"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stock */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-lg font-semibold text-black">
                  <Tag className="w-6 h-6" />
                  Stock
                </label>
                <input
                  name="stock"
                  type="number"
                  min="0"
                  placeholder="0"
                  className="w-full px-6 py-5 rounded-2xl border-2 border-black/20 bg-white text-xl font-semibold focus:outline-none focus:border-black focus:ring-4 focus:ring-black/10 transition-all duration-200 hover:border-black/40 shadow-lg"
                  value={form.stock}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Description */}
              <div className="lg:col-span-2 space-y-2">
                <label className="flex items-center gap-2 text-lg font-semibold text-black">
                  <FileText className="w-6 h-6" />
                  Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  placeholder="Enter product description"
                  className="w-full px-6 py-5 rounded-2xl border-2 border-black/20 bg-white text-lg resize-vertical focus:outline-none focus:border-black focus:ring-4 focus:ring-black/10 transition-all duration-200 hover:border-black/40 shadow-lg"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-6">
              <label className="flex items-center gap-2 text-lg font-semibold text-black">
                <ImagePlus className="w-6 h-6" />
                Product Images (Max 5MB each)
              </label>

              {/* Images Counter */}
              {images.length > 0 && (
                <div className="flex items-center gap-4 text-sm font-semibold">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-black">Images: {images.length}</span>
                  </div>
                </div>
              )}

              {/* Images Grid */}
              {images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {images.map((img, index) => (
                    <div
                      key={img.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={(e) => handleDragOverReordering(e, index)}
                      onDrop={(e) => handleDropReordering(e, index)}
                      onDragEnd={handleDragEnd}
                      className={`relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-move ${
                        dragOverItem === index 
                          ? 'ring-2 ring-blue-500 ring-offset-2' 
                          : ''
                      }`}
                    >
                      {/* Drag Handle */}
                      <div className="absolute top-2 left-2 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-move z-10">
                        <GripVertical className="w-3.5 h-3.5 text-black/70" />
                      </div>

                      {/* Image Preview */}
                      <img
                        src={img.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover"
                      />

                      {/* File Name */}
                      <div className="absolute bottom-2 left-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all truncate">
                        {img.file.name}
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeImage(img.id)}
                        className="absolute top-2 right-2 bg-red-500/90 hover:bg-red-600 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
                        title="Remove image"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-black/50 py-4 text-lg italic">
                  No images selected yet
                </p>
              )}

              {/* Drag & Drop Area */}
              <div
                className={`relative border-4 border-dashed rounded-3xl p-12 text-center transition-all duration-300 shadow-xl group hover:shadow-2xl hover:scale-[1.01] cursor-pointer ${
                  dragging
                    ? "border-black bg-black/5 scale-105 shadow-black/20"
                    : "border-black/20 hover:border-black/40 bg-white/50"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("fileInput").click()}
              >
                <div className="space-y-4">
                  <Upload
                    className={`w-16 h-16 mx-auto ${
                      dragging
                        ? "text-black scale-110"
                        : "text-black/40 group-hover:text-black"
                    } transition-all duration-300`}
                  />
                  <div>
                    <p className="text-2xl font-bold text-black mb-2 group-hover:text-black/90">
                      {dragging
                        ? "Drop images here"
                        : "Drag & drop images here"}
                    </p>
                    <p className="text-lg text-black/60">
                      or click to browse (PNG, JPG, GIF up to 5MB)
                    </p>
                  </div>
                </div>
                <input
                  id="fileInput"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

              {images.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Tips:</span>
                  </p>
                  <ul className="text-sm text-gray-500 space-y-1 pl-4 list-disc">
                    <li>Drag images to reorder. The order will be preserved when saved</li>
                    <li>First image will be used as the main product image</li>
                    <li>Images will be uploaded in the order shown above</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-8 border-t border-black/10 flex gap-4">
              <button
                type="button"
                onClick={() => navigate("/admin/dashboard")}
                className="flex-1 bg-black/10 hover:bg-black/20 text-black border border-black/20 px-12 py-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 flex items-center justify-center gap-3 px-12 py-6 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 ${
                  loading
                    ? "bg-black/50 text-black/50 cursor-not-allowed"
                    : "bg-black hover:bg-black/90 text-white hover:shadow-black/40 hover:scale-[1.02] active:scale-[0.98]"
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    Creating Product...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    Create Product
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

export default AddProduct;