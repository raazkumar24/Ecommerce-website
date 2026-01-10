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
  ImagePlus,
  Upload,
  X,
  CheckCircle,
  Edit3,
  GripVertical,
  Replace
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // IMAGE STATES - Unified array for all images
  const [images, setImages] = useState([]); // Array of {id, type: 'old'|'new', url/file, originalIndex}
  const [dragging, setDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);

  // FORM STATE
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

  // FETCH PRODUCT & CATEGORIES
  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [id]);

  // FETCH PRODUCT
  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);

      setForm({
        name: data.name || "",
        price: data.price || "",
        category: data.category?._id || data.category || "",
        description: data.description || "",
        stock: data.stock || "",
      });

      // Initialize images with unique IDs and track original order
      const initialImages = (data.images || []).map((img, index) => ({
        id: `old-${index}-${Date.now()}`,
        url: img,
        type: 'old',
        originalIndex: index,
        file: null
      }));
      setImages(initialImages);
    } catch (error) {
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

  /* ================= IMAGE HANDLERS ================= */

  // REPLACE IMAGE - Keeps the same position
  const replaceImage = useCallback((imageId, file) => {
    if (!file || !file.type.startsWith("image/") || file.size >= 5 * 1024 * 1024) {
      toast.error("Please select a valid image file (max 5MB)");
      return;
    }

    setImages((prev) => {
      const imageIndex = prev.findIndex((img) => img.id === imageId);
      if (imageIndex === -1) return prev;

      const oldImage = prev[imageIndex];
      
      // Replace the image but keep its position
      const updatedImages = [...prev];
      updatedImages[imageIndex] = {
        ...oldImage,
        type: 'new',
        file: file,
        url: null // Clear the old URL since we're replacing it
      };
      
      return updatedImages;
    });
    
    toast.success("Image replaced successfully");
  }, []);

  // REMOVE IMAGE
  const removeImage = useCallback((id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }, []);

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
      type: 'new',
      url: null
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

    // Append images in their current order
    images.forEach((img) => {
      if (img.type === 'old' && img.url) {
        // Keep old images that weren't replaced
        formData.append("existingImages", img.url);
      } else if (img.type === 'new' && img.file) {
        // Add new or replaced images
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

  // Counters for display
  const oldImagesCount = images.filter(img => img.type === 'old').length;
  const newImagesCount = images.filter(img => img.type === 'new').length;

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
            Edit Product
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

            {/* Category , Stock & Description */}
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
                  <option value="">Select category</option>
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
                />
              </div>
            </div>

            {/* Image Management */}
            <div className="space-y-6">
              <label className="flex items-center gap-2 text-lg font-semibold text-black">
                <ImagePlus className="w-6 h-6" />
                Product Images
              </label>

              {/* Images Counter */}
              <div className="flex items-center gap-4 text-sm font-semibold">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-black">Current: {oldImagesCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-black">New/Replaced: {newImagesCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-black/20"></div>
                  <span className="text-black">Total: {images.length}</span>
                </div>
              </div>

              {/* All Images Grid */}
              {images.length === 0 ? (
                <p className="text-gray-500 italic">No images added</p>
              ) : (
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

                      {/* Image */}
                      <img
                        src={img.type === 'old' ? `${API_URL}${img.url}` : URL.createObjectURL(img.file)}
                        alt={`Image ${index + 1}`}
                        className="w-full h-32 object-cover"
                      />

                      {/* Image Type Badge */}
                      <div className={`absolute top-2 right-10 px-2 py-1 rounded-full text-xs font-semibold ${
                        img.type === 'old' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
                      }`}>
                        {img.type === 'old' ? 'Current' : 'New'}
                      </div>

                      {/* Replace Button (only for old images) */}
                      {img.type === 'old' && (
                        <label className="absolute top-15 right-0 left-0 bg-white/90 hover:bg-white text-black text-xs p-2 m-1 rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer z-10">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                replaceImage(img.id, file);
                              }
                              e.target.value = ''; // Reset input
                            }}
                            className="hidden"
                          />
                          <div className="flex items-center justify-center gap-1">
                            <Replace className="w-3 h-3" />
                            Replace
                          </div>
                        </label>
                      )}

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
              )}

              {/* Dropzone for adding new images */}
              <div
                className={`relative border-4 border-dashed rounded-3xl p-12 text-center transition-all duration-300 shadow-xl group hover:shadow-2xl hover:scale-[1.01] cursor-pointer ${
                  dragging
                    ? "border-black bg-black/5 scale-105 shadow-black/20"
                    : "border-black/20 hover:border-black/40 bg-white/50"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() =>
                  document.getElementById("newFileInput")?.click()
                }
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
                        : "Drag & drop new images"}
                    </p>
                    <p className="text-lg text-black/60">
                      or click to browse (PNG, JPG, GIF up to 5MB)
                    </p>
                  </div>
                </div>
                <input
                  id="newFileInput"
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
                    <li>Click "Replace" on current images to update them while keeping the same position</li>
                    <li>New images will be added at the end</li>
                    <li>Blue badge = Current image, Green badge = New/Replaced image</li>
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
                    Updating...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-6 h-6" />
                    Update Product
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