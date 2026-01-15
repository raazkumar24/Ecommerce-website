// // AddProduct.jsx - COMPLETE FIXED VERSION
// import { useState, useEffect, useCallback } from "react";
// import api from "../../services/api";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import {
//   ArrowLeft,
//   Package,
//   DollarSign,
//   Tag,
//   FileText,
//   CheckCircle,
// } from "lucide-react";
// import { useImageHandling, ImageUploader } from "../../components/ImageUploader";

// const AddProduct = () => {
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
//     handleDragStart,
//     handleDragOverReordering,
//     handleDropReordering,
//     handleDragEnd,
//     draggedItem,
//     dragOverItem
//   } = useImageHandling(generateId);

//   // Fetch categories on mount
//   useEffect(() => {
//     api
//       .get("/categories")
//       .then((res) => {
//         setCategories(res.data);
//       })
//       .catch(() => {
//         toast.error("Failed to load categories");
//       });
//   }, []);

//   // Handle form field changes
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

//   // Form Submit Handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (
//       !form.name ||
//       !form.price ||
//       !form.category ||
//       !form.brand ||
//       !form.description ||
//       images.length === 0
//     ) {
//       toast.error("Please fill all fields and add at least one image");
//       setLoading(false);
//       return;
//     }

//     // Prepare form data
//     const formData = new FormData();
//     Object.keys(form).forEach((key) => formData.append(key, form[key]));

//     // Add images in their current order
//     images.forEach((imgObj) => {
//       formData.append("images", imgObj.file);
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
//       await api.post("/products", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       toast.success("Product added successfully!");
//       navigate("/admin/dashboard");
//     } catch (error) {
//       console.error("Add product error:", error);
//       toast.error(error.response?.data?.message || "Failed to add product");
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
//             Add New Product
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

//             {/* Category, brand, Stock & Description */}
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
//                   <option value="">Select a category</option>
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
//                   required
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
//               onRemoveImage={removeImage}
//               onDragStart={handleDragStart}
//               onDragOverReordering={handleDragOverReordering}
//               onDropReordering={handleDropReordering}
//               onDragEnd={handleDragEnd}
//               draggedItem={draggedItem}
//               dragOverItem={dragOverItem}
//               showReplace={false}
//             />

//             {/* Submit Button */}
//             <div className="pt-4 sm:pt-6 md:pt-8 border-t border-black/10 flex flex-col sm:flex-row gap-3 sm:gap-4">
//               <button
//                 type="button"
//                 onClick={() => navigate("/admin/dashboard")}
//                 className="flex-1 bg-black/10 hover:bg-black/20 text-black border border-black/20 px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 md:py-5 lg:py-6 rounded-lg sm:rounded-xl md:rounded-2xl font-bold text-sm sm:text-base md:text-lg shadow-md hover:shadow-lg transition-all duration-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`flex-1 flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 md:py-5 lg:py-6 rounded-lg sm:rounded-xl md:rounded-2xl font-bold text-sm sm:text-base md:text-lg shadow-lg sm:shadow-xl transition-all duration-300 ${
//                   loading
//                     ? "bg-black/50 text-black/50 cursor-not-allowed"
//                     : "bg-black hover:bg-black/90 text-white hover:shadow-black/40 hover:scale-[1.02] active:scale-[0.98]"
//                 }`}
//               >
//                 {loading ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 border-b-2 border-white"></div>
//                     <span className="text-sm sm:text-base">Creating Product...</span>
//                   </>
//                 ) : (
//                   <>
//                     <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
//                     <span className="text-sm sm:text-base">Create Product</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;
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
  Info
} from "lucide-react";

import { useImageHandling } from "../../hooks/useImageHandling";
import ImageUploader from "../../components/ImageUploader";

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
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
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
             <span className="text-[10px] font-black uppercase tracking-[0.2em]">Inventory Creation</span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6">
        <header className="mb-12">
          <h1 className="text-5xl font-bold tracking-tighter uppercase leading-none mb-2">New Product</h1>
          <p className="text-gray-600 font-medium">Add a new entry to your digital catalog.</p>
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
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">Full Product Title</label>
                <div className="relative">
                  <Package className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
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
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">Pricing (INR)</label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-gray-500 italic">₹</span>
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
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">Category Node</label>
                <div className="relative">
                  <Tag className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full bg-gray-50 border-none py-5 pl-14 pr-12 rounded-3xl outline-none focus:bg-white focus:ring-2 ring-black/5 transition-all font-bold appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select Structure...</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                </div>
              </div>

              {/* Brand */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">Manufacturer</label>
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
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">Initial Stock</label>
                <div className="relative">
                  <Archive className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
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

              {/* Description */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-600 ml-4">Product Narrative</label>
                <div className="relative">
                  <FileText className="absolute left-5 top-6 text-gray-500" size={18} />
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
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-8">Visual Assets</h3>
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