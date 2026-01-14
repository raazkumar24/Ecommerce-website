// // components/ImageUploader.jsx - COMPLETE FIXED VERSION
// import { useCallback, useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import { ImagePlus, Upload, X, GripVertical, Replace } from "lucide-react";

// export const useImageHandling = (generateId) => {
//   const [images, setImages] = useState([]);
//   const [dragging, setDragging] = useState(false);
//   const [draggedItem, setDraggedItem] = useState(null);
//   const [dragOverItem, setDragOverItem] = useState(null);

//   // Create preview URL for image with error handling
//   const createPreviewUrl = useCallback((file) => {
//     try {
//       if (!file || !file.type || !file.type.startsWith("image/")) {
//         console.error("Invalid file type:", file);
//         return null;
//       }
//       return URL.createObjectURL(file);
//     } catch (error) {
//       console.error("Error creating preview URL:", error, file);
//       return null;
//     }
//   }, []);

//   // ADD NEW IMAGES
//   const handleFiles = useCallback(
//     (files) => {
//       if (!files || files.length === 0) return;

//       const validFiles = Array.from(files).filter((file) => {
//         if (!file || !file.type) {
//           console.error("Invalid file:", file);
//           return false;
//         }
//         return file.type.startsWith("image/") && file.size < 5 * 1024 * 1024;
//       });

//       if (validFiles.length === 0) {
//         toast.error("No valid image files selected (must be image and < 5MB)");
//         return;
//       }

//       const newImagesWithIds = validFiles
//         .map((file) => {
//           const preview = createPreviewUrl(file);
//           if (!preview) {
//             console.error("Failed to create preview for file:", file.name);
//             return null;
//           }
//           return {
//             id: `new-${generateId()}`,
//             file: file,
//             preview: preview,
//             type: "new",
//           };
//         })
//         .filter((img) => img !== null);

//       if (newImagesWithIds.length === 0) {
//         toast.error("Failed to process images");
//         return;
//       }

//       setImages((prev) => [...prev, ...newImagesWithIds]);
//       toast.success(`Added ${newImagesWithIds.length} image(s)`);
//     },
//     [generateId, createPreviewUrl]
//   );

//   // DRAG & DROP HANDLERS for file upload
//   const handleDrop = useCallback(
//     (e) => {
//       e.preventDefault();
//       e.stopPropagation();
//       setDragging(false);
//       const files = e.dataTransfer?.files;
//       if (files && files.length > 0) {
//         handleFiles(files);
//       }
//     },
//     [handleFiles]
//   );

//   const handleDragOver = useCallback((e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragging(true);
//   }, []);

//   const handleDragLeave = useCallback((e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (!e.currentTarget.contains(e.relatedTarget)) {
//       setDragging(false);
//     }
//   }, []);

//   // REMOVE IMAGE - with proper cleanup
//   const removeImage = useCallback((id) => {
//     setImages((prev) => {
//       const imageToRemove = prev.find((img) => img.id === id);
//       if (
//         imageToRemove &&
//         imageToRemove.preview &&
//         imageToRemove.preview.startsWith("blob:")
//       ) {
//         try {
//           URL.revokeObjectURL(imageToRemove.preview);
//         } catch (error) {
//           console.error("Error revoking URL:", error);
//         }
//       }
//       return prev.filter((img) => img.id !== id);
//     });
//   }, []);

//   // REPLACE IMAGE
//   const replaceImage = useCallback(
//     (imageId, file) => {
//       if (
//         !file ||
//         !file.type ||
//         !file.type.startsWith("image/") ||
//         file.size >= 5 * 1024 * 1024
//       ) {
//         toast.error("Please select a valid image file (max 5MB)");
//         return;
//       }

//       const newPreview = createPreviewUrl(file);
//       if (!newPreview) {
//         toast.error("Failed to create preview for the new image");
//         return;
//       }

//       setImages((prev) => {
//         const imageIndex = prev.findIndex((img) => img.id === imageId);
//         if (imageIndex === -1) return prev;

//         const oldImage = prev[imageIndex];

//         // Revoke old preview URL if it exists
//         if (oldImage.preview && oldImage.preview.startsWith("blob:")) {
//           try {
//             URL.revokeObjectURL(oldImage.preview);
//           } catch (error) {
//             console.error("Error revoking old URL:", error);
//           }
//         }

//         const updatedImages = [...prev];
//         updatedImages[imageIndex] = {
//           ...oldImage,
//           type: "new",
//           file: file,
//           url: null,
//           preview: newPreview,
//         };

//         return updatedImages;
//       });

//       toast.success("Image replaced successfully");
//     },
//     [createPreviewUrl]
//   );

//   /* ================= DRAG & DROP REORDERING ================= */
//   const handleDragStart = useCallback((e, index) => {
//     setDraggedItem(index);
//     e.dataTransfer.effectAllowed = "move";
//     e.dataTransfer.setData("text/plain", index.toString());
//   }, []);

//   const handleDragOverReordering = useCallback(
//     (e, index) => {
//       e.preventDefault();
//       if (draggedItem !== null && draggedItem !== index) {
//         setDragOverItem(index);
//       }
//     },
//     [draggedItem]
//   );

//   const handleDropReordering = useCallback(
//     (e, dropIndex) => {
//       e.preventDefault();
//       e.stopPropagation();

//       if (draggedItem === null || draggedItem === dropIndex) return;

//       setImages((prev) => {
//         const items = [...prev];
//         const [draggedItemContent] = items.splice(draggedItem, 1);
//         items.splice(dropIndex, 0, draggedItemContent);
//         return items;
//       });

//       setDraggedItem(null);
//       setDragOverItem(null);
//     },
//     [draggedItem]
//   );

//   const handleDragEnd = useCallback(() => {
//     setDraggedItem(null);
//     setDragOverItem(null);
//   }, []);

//   // Cleanup function to revoke all object URLs
//   useEffect(() => {
//     return () => {
//       images.forEach((img) => {
//         if (img.preview && img.preview.startsWith("blob:")) {
//           try {
//             URL.revokeObjectURL(img.preview);
//           } catch (error) {
//             console.error("Error in cleanup:", error);
//           }
//         }
//       });
//     };
//   }, [images]);

//   return {
//     images,
//     setImages,
//     dragging,
//     draggedItem,
//     dragOverItem,
//     handleFiles,
//     handleDrop,
//     handleDragOver,
//     handleDragLeave,
//     removeImage,
//     replaceImage,
//     handleDragStart,
//     handleDragOverReordering,
//     handleDropReordering,
//     handleDragEnd,
//   };
// };

// // Common Image Uploader Component
// export const ImageUploader = ({
//   images,
//   dragging,
//   onDrop,
//   onDragOver,
//   onDragLeave,
//   onFileChange,
//   onImageClick,
//   onReplaceImage,
//   onRemoveImage,
//   onDragStart,
//   onDragOverReordering,
//   onDropReordering,
//   onDragEnd,
//   draggedItem,
//   dragOverItem,
//   showReplace = false,
// }) => {
//   const [imageErrors, setImageErrors] = useState({});

//   const oldImagesCount = images.filter((img) => img.type === "old").length;
//   const newImagesCount = images.filter((img) => img.type === "new").length;

//   // Get image source URL safely
//   const getImageSrc = useCallback((img) => {
//     // OLD image from DB (Cloudinary)
//     if (img.type === "old" && img.url) {
//       return img.url;
//     }

//     // NEW image preview
//     if (img.preview && img.preview.startsWith("blob:")) {
//       return img.preview;
//     }

//     // Fallback (rare case)
//     if (img.file) {
//       try {
//         return URL.createObjectURL(img.file);
//       } catch (error) {
//         console.error("Error creating object URL:", error);
//       }
//     }

//     // Placeholder
//     return "/placeholder-image.jpg";
//   }, []);

//   // Handle image loading error
//   const handleImageError = useCallback((e, imgId) => {
//     console.error(`Image failed to load: ${imgId}`, e);
//     setImageErrors((prev) => ({ ...prev, [imgId]: true }));
//     e.target.src = "/placeholder-image.jpg";
//     // Prevent infinite loop
//     e.target.onerror = null;
//   }, []);

//   return (
//     <div className="space-y-4 sm:space-y-6">
//       <label className="flex items-center gap-2 text-base sm:text-lg font-semibold text-black">
//         <ImagePlus className="w-5 h-5 sm:w-6 sm:h-6" />
//         Product Images (Max 5MB each)
//       </label>

//       {/* Images Counter */}
//       {showReplace && images.length > 0 && (
//         <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm font-semibold">
//           <div className="flex items-center gap-1 sm:gap-2">
//             <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-blue-500"></div>
//             <span className="text-black">Current: {oldImagesCount}</span>
//           </div>
//           <div className="flex items-center gap-1 sm:gap-2">
//             <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
//             <span className="text-black">New/Replaced: {newImagesCount}</span>
//           </div>
//           <div className="flex items-center gap-1 sm:gap-2">
//             <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-black/20"></div>
//             <span className="text-black">Total: {images.length}</span>
//           </div>
//         </div>
//       )}

//       {/* Images Grid */}
//       {images.length > 0 ? (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
//           {images.map((img, index) => {
//             const imageSrc = getImageSrc(img);
//             const hasError = imageErrors[img.id];

//             return (
//               <div
//                 key={`${img.id}-${index}`}
//                 draggable
//                 onDragStart={(e) => onDragStart && onDragStart(e, index)}
//                 onDragOver={(e) =>
//                   onDragOverReordering && onDragOverReordering(e, index)
//                 }
//                 onDrop={(e) => onDropReordering && onDropReordering(e, index)}
//                 onDragEnd={() => onDragEnd && onDragEnd()}
//                 className={`relative group rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-move min-h-24 sm:min-h-28 md:min-h-32 ${
//                   dragOverItem === index
//                     ? "ring-2 ring-blue-500 ring-offset-1 sm:ring-offset-2"
//                     : ""
//                 } ${draggedItem === index ? "opacity-50" : ""}`}
//               >
//                 {/* Drag Handle */}
//                 <div className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-white/90 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-sm sm:shadow-md opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 cursor-move z-10">
//                   <GripVertical className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-black/70" />
//                 </div>

//                 {/* Image Container */}
//                 <div className="w-full h-24 sm:h-28 md:h-32 flex items-center justify-center bg-gray-100">
//                   {!hasError && imageSrc ? (
//                     <img
//                       src={imageSrc}
//                       alt={`Preview ${index + 1}`}
//                       className="w-full h-full object-contain bg-white"
//                       onError={(e) => handleImageError(e, img.id)}
//                       loading="lazy"
//                       crossOrigin="anonymous"
//                     />
//                   ) : (
//                     <div className="flex flex-col items-center justify-center w-full h-full bg-gray-200">
//                       <span className="text-gray-400 text-sm mb-1">Image</span>
//                       <span className="text-gray-400 text-xs">
//                         Not available
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Image Type Badge (for edit mode) */}
//                 {showReplace && !hasError && (
//                   <div
//                     className={`absolute top-1 right-1 sm:top-2 sm:right-2 px-2 py-1 rounded-full text-xs font-semibold ${
//                       img.type === "old"
//                         ? "bg-blue-500 text-white"
//                         : "bg-green-500 text-white"
//                     }`}
//                   >
//                     {img.type === "old" ? "Current" : "New"}
//                   </div>
//                 )}

//                 {/* Replace Button (only for old images in edit mode) */}
//                 {showReplace && img.type === "old" && !hasError && (
//                   <label className="absolute bottom-2 left-2 right-2 bg-white/90 hover:bg-white text-black text-xs p-1.5 rounded-lg shadow-md opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 cursor-pointer z-10">
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => {
//                         const file = e.target.files?.[0];
//                         if (file && onReplaceImage) {
//                           onReplaceImage(img.id, file);
//                         }
//                         e.target.value = "";
//                       }}
//                       className="hidden"
//                     />
//                     <div className="flex items-center justify-center gap-1">
//                       <Replace className="w-3 h-3" />
//                       <span className="hidden sm:inline">Replace</span>
//                     </div>
//                   </label>
//                 )}

//                 {/* File Name (always visible on mobile, hover only on desktop) */}
//                 {img.file?.name && !hasError && (
//                   <div className="absolute bottom-1 left-1 right-1 bg-black/60 text-white text-xs px-1.5 py-1 rounded opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-all truncate">
//                     {img.file.name.length > 20
//                       ? `${img.file.name.substring(0, 20)}...`
//                       : img.file.name}
//                   </div>
//                 )}

//                 {/* Remove Button */}
//                 <button
//                   type="button"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     e.preventDefault();
//                     if (onRemoveImage) {
//                       onRemoveImage(img.id);
//                     }
//                   }}
//                   className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-red-500 hover:bg-red-600 p-1.5 sm:p-2 rounded-full shadow-sm sm:shadow-lg opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 z-20"
//                   title="Remove image"
//                 >
//                   <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <p className="text-center text-black/50 py-3 sm:py-4 text-sm sm:text-base italic">
//           No images selected yet
//         </p>
//       )}

//       {/* Dropzone */}
//       <div
//         className={`relative border-2 sm:border-4 border-dashed rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 text-center transition-all duration-300 shadow-md sm:shadow-xl group hover:shadow-lg sm:hover:shadow-2xl hover:scale-[1.01] cursor-pointer ${
//           dragging
//             ? "border-black bg-black/5 scale-105 shadow-black/20"
//             : "border-black/20 hover:border-black/30 sm:hover:border-black/40 bg-white/50"
//         }`}
//         onDragOver={(e) => {
//           e.preventDefault();
//           e.stopPropagation();
//           onDragOver && onDragOver(e);
//         }}
//         onDragLeave={(e) => {
//           e.preventDefault();
//           e.stopPropagation();
//           onDragLeave && onDragLeave(e);
//         }}
//         onDrop={(e) => {
//           e.preventDefault();
//           e.stopPropagation();
//           onDrop && onDrop(e);
//         }}
//         onClick={() => document.getElementById("fileInput")?.click()}
//       >
//         <div className="space-y-2 sm:space-y-4">
//           <Upload
//             className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto ${
//               dragging
//                 ? "text-black scale-110"
//                 : "text-black/40 group-hover:text-black/60 sm:group-hover:text-black"
//             } transition-all duration-300`}
//           />
//           <div>
//             <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-black mb-1 sm:mb-2 group-hover:text-black/90">
//               {dragging ? "Drop images here" : "Drag & drop images here"}
//             </p>
//             <p className="text-xs sm:text-sm md:text-base lg:text-lg text-black/50 sm:text-black/60">
//               or click to browse (PNG, JPG, GIF up to 5MB)
//             </p>
//           </div>
//         </div>
//         <input
//           id="fileInput"
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={(e) => {
//             if (onFileChange) {
//               onFileChange(e);
//             }
//             // Reset input to allow selecting same file again
//             e.target.value = "";
//           }}
//           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//         />
//       </div>

//       {/* Tips */}
//       {images.length > 0 && (
//         <div className="space-y-1 sm:space-y-2">
//           <p className="text-xs sm:text-sm text-gray-500">
//             <span className="font-semibold">Tips:</span>
//           </p>
//           <ul className="text-xs sm:text-sm text-gray-500 space-y-0.5 sm:space-y-1 pl-3 sm:pl-4 list-disc">
//             <li>
//               Drag images to reorder. The order will be preserved when saved
//             </li>
//             <li>First image will be used as the main product image</li>
//             {showReplace && (
//               <li>
//                 Click "Replace" on current images to update them while keeping
//                 the same position
//               </li>
//             )}
//             <li>Tap the X button to remove images on mobile</li>
//             <li>Images will be uploaded in the order shown above</li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };


// src/components/ImageUploader.jsx
// import { ImagePlus, Upload, X, GripVertical, Replace } from "lucide-react";

// const ImageUploader = ({
//   images,
//   onFiles,
//   onRemoveImage,
//   onReplaceImage,
//   onDragStart,
//   onDragOverReordering,
//   onDropReordering,
//   draggedItem,
//   dragOverItem,
//   showReplace = false,
// }) => {
//   return (
//     <div className="space-y-6">
//       <label className="flex items-center gap-2 text-lg font-semibold">
//         <ImagePlus className="w-6 h-6" />
//         Product Images
//       </label>

//       {/* Images Grid */}
//       {images.length > 0 && (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//           {images.map((img, index) => {
//             const src = img.type === "old" ? img.url : img.preview;

//             return (
//               <div
//                 key={img.id}
//                 draggable
//                 onDragStart={(e) => onDragStart(e, index)}
//                 onDragOver={(e) => {
//                   e.preventDefault();
//                   onDragOverReordering(e, index);
//                 }}
//                 onDrop={(e) => {
//                   e.preventDefault();
//                   onDropReordering(e);
//                 }}
//                 className={`relative group rounded-xl overflow-hidden shadow-md bg-white transition ${
//                   dragOverItem === index
//                     ? "ring-2 ring-black"
//                     : "border border-black/10"
//                 } ${draggedItem === index ? "opacity-50" : ""}`}
//               >
//                 <div className="absolute top-2 left-2 bg-white p-1 rounded-full shadow z-10">
//                   <GripVertical className="w-4 h-4 text-black/70" />
//                 </div>

//                 <img
//                   src={src}
//                   alt="preview"
//                   className="w-full h-32 object-contain bg-gray-100"
//                 />

//                 {showReplace && img.type === "old" && (
//                   <label className="absolute bottom-2 left-2 right-2 bg-white/90 text-xs p-2 rounded-lg text-center cursor-pointer opacity-0 group-hover:opacity-100 transition">
//                     <Replace className="inline w-3 h-3 mr-1" />
//                     Replace
//                     <input
//                       type="file"
//                       hidden
//                       accept="image/*"
//                       onChange={(e) =>
//                         e.target.files &&
//                         onReplaceImage(img.id, e.target.files[0])
//                       }
//                     />
//                   </label>
//                 )}

//                 <button
//                   type="button"
//                   onClick={() => onRemoveImage(img.id)}
//                   className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Upload */}
//       <label className="block border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer hover:border-black transition">
//         <Upload className="w-12 h-12 mx-auto text-black/40 mb-3" />
//         <p className="text-lg font-bold">Drag & drop images here</p>
//         <p className="text-sm text-black/60">
//           or click to browse (PNG/JPG, max 5MB)
//         </p>
//         <input
//           type="file"
//           multiple
//           hidden
//           accept="image/*"
//           onChange={(e) => onFiles(e.target.files)}
//         />
//       </label>
//     </div>
//   );
// };

// export default ImageUploader;

import { ImagePlus, Upload, X, GripVertical, Replace, Plus } from "lucide-react";

const ImageUploader = ({
  images,
  onFiles,
  onRemoveImage,
  onReplaceImage,
  onDragStart,
  onDragOverReordering,
  onDropReordering,
  draggedItem,
  dragOverItem,
  showReplace = false,
}) => {
  return (
    <div className="space-y-8">
      {/* Label Section */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
          <ImagePlus className="w-4 h-4" />
          Media Assets
        </label>
        <span className="text-[10px] font-bold text-gray-400 uppercase">
          {images.length} / 10 Gallery Limit
        </span>
      </div>

      {/* Images Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {images.map((img, index) => {
            const src = img.type === "old" ? img.url : img.preview;

            return (
              <div
                key={img.id}
                draggable
                onDragStart={(e) => onDragStart(e, index)}
                onDragOver={(e) => {
                  e.preventDefault();
                  onDragOverReordering(e, index);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  onDropReordering(e);
                }}
                className={`relative group aspect-square rounded-[2rem] overflow-hidden bg-gray-50 transition-all duration-500 shadow-sm border ${
                  dragOverItem === index
                    ? "border-black ring-4 ring-black/5"
                    : "border-gray-100"
                } ${draggedItem === index ? "opacity-20 scale-95" : "opacity-100 scale-100"}`}
              >
                {/* Drag Handle Overlay */}
                <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-lg cursor-grab active:cursor-grabbing">
                    <GripVertical className="w-3.5 h-3.5 text-black" />
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => onRemoveImage(img.id)}
                  className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-md text-red-500 p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all"
                >
                  <X className="w-3.5 h-3.5" />
                </button>

                {/* The Image */}
                <img
                  src={src}
                  alt="preview"
                  className="w-full h-full object-contain p-4 grayscale group-hover:grayscale-0 transition-all duration-700"
                />

                {/* Replace Button Overlay */}
                {showReplace && img.type === "old" && (
                  <label className="absolute inset-x-3 bottom-3 bg-black/80 backdrop-blur-md text-[9px] font-black uppercase tracking-widest py-2 rounded-xl text-white text-center cursor-pointer opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                    <div className="flex items-center justify-center gap-1.5">
                      <Replace className="w-3 h-3" />
                      Replace
                    </div>
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) =>
                        e.target.files &&
                        onReplaceImage(img.id, e.target.files[0])
                      }
                    />
                  </label>
                )}
                
                {/* Badge for Type */}
                <div className="absolute bottom-3 left-3 text-[8px] font-black uppercase text-gray-300 pointer-events-none group-hover:opacity-0 transition-opacity">
                  {img.type === 'old' ? 'Stored' : 'Ready'}
                </div>
              </div>
            );
          })}

          {/* Inline Add Button (Appears if images exist) */}
          <label className="aspect-square rounded-[2rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center cursor-pointer hover:border-black hover:bg-gray-50 transition-all group">
            <Plus className="w-6 h-6 text-gray-300 group-hover:text-black transition-colors" />
            <input
              type="file"
              multiple
              hidden
              accept="image/*"
              onChange={(e) => onFiles(e.target.files)}
            />
          </label>
        </div>
      )}

      {/* Main Upload Zone (Appears when no images or as a full row) */}
      {images.length === 0 && (
        <label className="block bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2.5rem] p-12 lg:p-20 text-center cursor-pointer hover:border-black hover:bg-white transition-all group">
          <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:shadow-xl transition-all">
            <Upload className="w-8 h-8 text-black" />
          </div>
          <p className="text-xl font-bold tracking-tighter uppercase mb-2">Import Discovery Assets</p>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            Drag & Drop or click to browse (PNG, JPG, Max 5MB)
          </p>
          <input
            type="file"
            multiple
            hidden
            accept="image/*"
            onChange={(e) => onFiles(e.target.files)}
          />
        </label>
      )}
    </div>
  );
};

export default ImageUploader;