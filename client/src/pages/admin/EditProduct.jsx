// // EditProduct.jsx - COMPLETE FIXED VERSION
// import { useEffect, useState, useCallback } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import api from "../../services/api";
// import toast from "react-hot-toast";
// import {
//   ArrowLeft,
//   Package,
//   DollarSign,
//   Tag,
//   FileText,
//   CheckCircle,
// } from "lucide-react";
// import { useImageHandling, ImageUploader } from "../../components/ImageUploader";

// const EditProduct = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     category: "",
//     description: "",
//     stock: "",
//     brand: "",
//   });

//   // Generate unique ID for images
//   const generateId = useCallback(() => {
//     return Date.now() + Math.random().toString(36).substr(2, 9);
//   }, []);

//   // Use custom image handling hook
//   const {
//     images,
//     setImages,
//     dragging,
//     handleDrop,
//     handleDragOver,
//     handleDragLeave,
//     removeImage,
//     replaceImage,
//     handleDragStart,
//     handleDragOverReordering,
//     handleDropReordering,
//     handleDragEnd,
//     draggedItem,
//     dragOverItem
//   } = useImageHandling(generateId);

//   // FETCH PRODUCT & CATEGORIES
//   useEffect(() => {
//     fetchProduct();
//     fetchCategories();
//   }, [id]);

//   // FETCH PRODUCT
//   const fetchProduct = async () => {
//     try {
//       const { data } = await api.get(`/products/${id}`);
//       console.log("Product data:", data);
//       console.log("Product images:", data.images);

//       setForm({
//         name: data.name || "",
//         price: data.price || "",
//         category: data.category?._id || data.category || "",
//         description: data.description || "",
//         stock: data.stock || "",
//         brand: data.brand || "",
//       });

//       // Initialize images with unique IDs and track original order
//       const initialImages = (data.images || []).map((img, index) => {
//         console.log(`Image ${index}:`, img);
//         return {
//           id: `old-${index}-${Date.now()}`,
//           url: img,
//           type: 'old',
//           originalIndex: index,
//           file: null
//         };
//       });
//       console.log("Initial images:", initialImages);
//       setImages(initialImages);
//     } catch (error) {
//       console.error("Failed to load product:", error);
//       toast.error("Failed to load product");
//       navigate("/admin/dashboard");
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const { data } = await api.get("/categories");
//       setCategories(data);
//     } catch (error) {
//       toast.error("Failed to load categories");
//     }
//   };

//   const handleChange = useCallback(
//     (e) => {
//       setForm({ ...form, [e.target.name]: e.target.value });
//     },
//     [form]
//   );

//   // Handle file change - ADDED THIS FUNCTION
//   const handleFileChange = useCallback(
//     (e) => {
//       if (e.target.files && e.target.files.length > 0) {
//         const validFiles = Array.from(e.target.files).filter(
//           (file) => file.type.startsWith("image/") && file.size < 5 * 1024 * 1024
//         );

//         if (validFiles.length === 0) {
//           toast.error("No valid image files selected (must be image and < 5MB)");
//           return;
//         }

//         const newImagesWithIds = validFiles.map((file) => ({
//           id: `new-${generateId()}`,
//           file: file,
//           preview: URL.createObjectURL(file),
//           type: 'new'
//         }));

//         setImages((prev) => [...prev, ...newImagesWithIds]);
//       }
//     },
//     [generateId, setImages]
//   );

//   // Clean up object URLs on unmount
//   useEffect(() => {
//     return () => {
//       images.forEach((img) => {
//         if (img.preview) {
//           URL.revokeObjectURL(img.preview);
//         }
//       });
//     };
//   }, [images]);

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!form.name || !form.price || !form.category) {
//       toast.error("Please fill all required fields");
//       setLoading(false);
//       return;
//     }

//     const formData = new FormData();

//     // Form fields
//     formData.append("name", form.name);
//     formData.append("price", form.price);
//     formData.append("category", form.category);
//     formData.append("description", form.description);
//     formData.append("stock", form.stock);
//     formData.append("brand", form.brand);

//     // Append images in their current order
//     images.forEach((img) => {
//       if (img.type === 'old' && img.url) {
//         formData.append("existingImages", img.url);
//       } else if (img.type === 'new' && img.file) {
//         formData.append("images", img.file);
//       }
//     });

//     formData.append(
//       "imageOrder",
//       JSON.stringify(
//         images.map((img) => ({
//           type: img.type,
//           url: img.url || null,
//         }))
//       )
//     );

//     try {
//       await api.put(`/products/${id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       toast.success("Product updated successfully!");
//       navigate("/admin/dashboard");
//     } catch (error) {
//       console.error("Update error:", error);
//       toast.error(error.response?.data?.message || "Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Header */}
//       <div className="border-b border-black/10 px-4 sm:px-6 py-6 sm:py-8">
//         <div className="max-w-4xl mx-auto">
//           <button
//             onClick={() => navigate("/admin/dashboard")}
//             className="inline-flex items-center gap-2 text-base sm:text-lg font-semibold text-black hover:text-black/80 transition-colors mb-4 sm:mb-6"
//           >
//             <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
//             Back to Dashboard
//           </button>
//           <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">
//             Edit Product
//           </h1>
//         </div>
//       </div>

//       {/* Main Form */}
//       <div className="px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
//         <div className="max-w-4xl mx-auto">
//           <form
//             onSubmit={handleSubmit}
//             className="bg-white border border-black/10 shadow-lg sm:shadow-xl md:shadow-2xl rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 space-y-6 sm:space-y-8"
//           >
//             {/* Basic Info */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
//               {/* Product Name */}
//               <div className="space-y-1 sm:space-y-2">
//                 <label className="flex items-center gap-2 text-sm sm:text-base lg:text-lg font-semibold text-black">
//                   <Package className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
//                   Product Name
//                 </label>
//                 <input
//                   name="name"
//                   placeholder="Enter product name"
//                   className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-black/20 bg-white text-base sm:text-lg md:text-xl font-semibold focus:outline-none focus:border-black focus:ring-2 sm:focus:ring-4 focus:ring-black/10 transition-all duration-200 hover:border-black/30 sm:hover:border-black/40 shadow-md sm:shadow-lg"
//                   value={form.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Price */}
//               <div className="space-y-1 sm:space-y-2">
//                 <label className="flex items-center gap-2 text-sm sm:text-base lg:text-lg font-semibold text-black">
//                   <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
//                   Price
//                 </label>
//                 <div className="relative">
//                   <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-base sm:text-lg md:text-xl font-semibold text-black">
//                     ₹
//                   </span>
//                   <input
//                     name="price"
//                     type="number"
//                     min="0"
//                     step="0.01"
//                     placeholder="0.00"
//                     className="w-full pl-10 sm:pl-12 pr-4 sm:pr-6 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-black/20 bg-white text-base sm:text-lg md:text-xl font-bold focus:outline-none focus:border-black focus:ring-2 sm:focus:ring-4 focus:ring-black/10 transition-all duration-200 hover:border-black/30 sm:hover:border-black/40 shadow-md sm:shadow-lg"
//                     value={form.price}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Category, Stock & Description */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
//               {/* Category */}
//               <div className="space-y-1 sm:space-y-2">
//                 <label className="flex items-center gap-2 text-sm sm:text-base lg:text-lg font-semibold text-black">
//                   <Tag className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
//                   Category
//                 </label>
//                 <select
//                   name="category"
//                   className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-black/20 bg-white text-base sm:text-lg md:text-xl font-semibold focus:outline-none focus:border-black focus:ring-2 sm:focus:ring-4 focus:ring-black/10 transition-all duration-200 hover:border-black/30 sm:hover:border-black/40 shadow-md sm:shadow-lg appearance-none"
//                   value={form.category}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">Select category</option>
//                   {categories.map((category) => (
//                     <option key={category._id} value={category._id}>
//                       {category.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Brand */}
//               <div className="space-y-1 sm:space-y-2">
//                 <label className="flex items-center gap-2 text-sm sm:text-base lg:text-lg font-semibold text-black">
//                   <Tag className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
//                   Brand
//                 </label>
//                 <input
//                   name="brand"
//                   type="text"
//                   placeholder="Enter brand name"
//                   className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-black/20 bg-white text-base sm:text-lg md:text-xl font-semibold focus:outline-none focus:border-black focus:ring-2 sm:focus:ring-4 focus:ring-black/10 transition-all duration-200 hover:border-black/30 sm:hover:border-black/40 shadow-md sm:shadow-lg"
//                   value={form.brand}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Stock */}
//               <div className="space-y-1 sm:space-y-2">
//                 <label className="flex items-center gap-2 text-sm sm:text-base lg:text-lg font-semibold text-black">
//                   <Tag className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
//                   Stock
//                 </label>
//                 <input
//                   name="stock"
//                   type="number"
//                   min="0"
//                   placeholder="0"
//                   className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-black/20 bg-white text-base sm:text-lg md:text-xl font-semibold focus:outline-none focus:border-black focus:ring-2 sm:focus:ring-4 focus:ring-black/10 transition-all duration-200 hover:border-black/30 sm:hover:border-black/40 shadow-md sm:shadow-lg"
//                   value={form.stock}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Description */}
//               <div className="lg:col-span-2 space-y-1 sm:space-y-2">
//                 <label className="flex items-center gap-2 text-sm sm:text-base lg:text-lg font-semibold text-black">
//                   <FileText className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   rows={3}
//                   placeholder="Enter product description"
//                   className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 rounded-lg sm:rounded-xl md:rounded-2xl border-2 border-black/20 bg-white text-sm sm:text-base md:text-lg resize-vertical focus:outline-none focus:border-black focus:ring-2 sm:focus:ring-4 focus:ring-black/10 transition-all duration-200 hover:border-black/30 sm:hover:border-black/40 shadow-md sm:shadow-lg"
//                   value={form.description}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* Image Upload */}
//             <ImageUploader
//               images={images}
//               dragging={dragging}
//               onDrop={handleDrop}
//               onDragOver={handleDragOver}
//               onDragLeave={handleDragLeave}
//               onFileChange={handleFileChange} // Added this prop
//               onReplaceImage={replaceImage}
//               onRemoveImage={removeImage}
//               onDragStart={handleDragStart}
//               onDragOverReordering={handleDragOverReordering}
//               onDropReordering={handleDropReordering}
//               onDragEnd={handleDragEnd}
//               draggedItem={draggedItem}
//               dragOverItem={dragOverItem}
//               showReplace={true}
//             />

// {/* Submit Button */}
// <div className="pt-4 sm:pt-6 md:pt-8 border-t border-black/10 flex flex-col sm:flex-row gap-3 sm:gap-4">
//   <button
//     type="button"
//     onClick={() => navigate("/admin/dashboard")}
//     className="flex-1 bg-black/10 hover:bg-black/20 text-black border border-black/20 px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 md:py-5 lg:py-6 rounded-lg sm:rounded-xl md:rounded-2xl font-bold text-sm sm:text-base md:text-lg shadow-md hover:shadow-lg transition-all duration-300"
//   >
//     Cancel
//   </button>
//   <button
//     type="submit"
//     disabled={loading}
//     className={`flex-1 flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 md:py-5 lg:py-6 rounded-lg sm:rounded-xl md:rounded-2xl font-bold text-sm sm:text-base md:text-lg shadow-lg sm:shadow-xl transition-all duration-300 ${
//       loading
//         ? "bg-black/50 text-black/50 cursor-not-allowed"
//         : "bg-black hover:bg-black/90 text-white hover:shadow-black/40 hover:scale-[1.02] active:scale-[0.98]"
//     }`}
//   >
//     {loading ? (
//       <>
//         <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 border-b-2 border-white"></div>
//         <span className="text-sm sm:text-base">Updating...</span>
//       </>
//     ) : (
//       <>
//         <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
//         <span className="text-sm sm:text-base">Update Product</span>
//       </>
//     )}
//   </button>
// </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProduct;
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
  ChevronDown
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
      });

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
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
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
            className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest hover:translate-x-[-4px] transition-transform"
          >
            <ArrowLeft size={16} /> Back to Assets
          </button>
          <div className="hidden md:flex items-center gap-2 text-gray-600">
             <Layers size={14} />
             <span className="text-[10px] font-black uppercase tracking-[0.2em]">Product Configuration</span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6">
        <header className="mb-12">
          <h1 className="text-5xl font-bold tracking-tighter uppercase leading-none mb-2">Edit Record</h1>
          <p className="text-gray-600 font-medium">Modifying Asset ID: <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{id?.slice(-8)}</span></p>
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
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">Registry Name</label>
                <div className="relative">
                  <Package className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter product title..."
                    className="w-full bg-gray-50 border-none py-5 pl-14 pr-6 rounded-[1.5rem] outline-none focus:bg-white focus:ring-2 ring-black/5 transition-all font-bold text-lg"
                    required
                  />
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">Market Value (INR)</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-gray-500 italic">₹</span>
                  <input
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full bg-gray-50 border-none py-5 pl-12 pr-6 rounded-[1.5rem] outline-none focus:bg-white focus:ring-2 ring-black/5 transition-all font-black text-xl"
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2 text-black">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">Category Node</label>
                <div className="relative">
                  <Tag className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-none py-5 pl-14 pr-12 rounded-[1.5rem] outline-none focus:bg-white focus:ring-2 ring-black/5 transition-all font-bold appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select structure...</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                </div>
              </div>

              {/* Brand */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">Manufacturer Label</label>
                <input
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  placeholder="e.g. Apple, Sony..."
                  className="w-full bg-gray-50 border-none py-5 px-8 rounded-[1.5rem] outline-none focus:bg-white focus:ring-2 ring-black/5 transition-all font-bold"
                  required
                />
              </div>

              {/* Stock */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">Stock Quantum</label>
                <div className="relative">
                  <Archive className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    name="stock"
                    type="number"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full bg-gray-50 border-none py-5 pl-14 pr-6 rounded-[1.5rem] outline-none focus:bg-white focus:ring-2 ring-black/5 transition-all font-black text-xl"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">Manifest Description</label>
                <div className="relative">
                  <FileText className="absolute left-5 top-6 text-gray-500" size={18} />
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe the asset properties..."
                    className="w-full bg-gray-50 border-none py-6 pl-14 pr-6 rounded-[2rem] outline-none focus:bg-white focus:ring-2 ring-black/5 transition-all font-medium leading-relaxed resize-none"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* --- MEDIA MANAGEMENT CARD --- */}
          <section className="bg-white rounded-[2.5rem] p-8 lg:p-12 border border-gray-50 shadow-sm transition-all hover:shadow-xl hover:shadow-gray-200/40">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-8">Asset Visualization</h3>
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
              className="flex-1 bg-gray-100 text-gray-500 py-5 rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.2em] hover:bg-gray-200 transition-all active:scale-95"
            >
              Discard Changes
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] bg-black text-white py-5 rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl shadow-black/20 hover:bg-zinc-800 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white" />
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