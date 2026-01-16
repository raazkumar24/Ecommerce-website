import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useImageHandling = (generateId) => {
  const [images, setImages] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);

  /* ========== ADD FILES (Updated with 20 Limit) ========== */
  const handleFiles = useCallback(
    (files) => {
      if (!files || files.length === 0) return;

      // 1. Check karein ki total images (existing + new) 20 se zyada na ho
      if (images.length + files.length > 20) {
        toast.error("Maximum 20 images allowed per product");
        return;
      }

      const validFiles = Array.from(files).filter(
        (file) =>
          file.type.startsWith("image/") && file.size < 10 * 1024 * 1024 // 10MB limit
      );

      if (validFiles.length === 0) {
        toast.error("Invalid images or file size too large (Max 10MB)");
        return;
      }

      const newImages = validFiles.map((file) => ({
        id: `new-${generateId()}`,
        type: "new",
        file,
        url: null,
        preview: URL.createObjectURL(file), // Memory preview create karna
      }));

      setImages((prev) => [...prev, ...newImages]);
    },
    [generateId, images.length]
  );

  /* ========== REMOVE IMAGE ========== */
  const removeImage = useCallback((id) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      // Memory leak se bachne ke liye URL revoke karein
      if (img?.preview?.startsWith("blob:")) {
        URL.revokeObjectURL(img.preview);
      }
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  /* ========== REPLACE (Edit) IMAGE ========== */
  const replaceImage = useCallback((id, file) => {
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Invalid image format");
      return;
    }

    const preview = URL.createObjectURL(file);

    setImages((prev) =>
      prev.map((img) => {
        if (img.id !== id) return img;

        // Purani preview memory se clear karein
        if (img.preview?.startsWith("blob:")) {
          URL.revokeObjectURL(img.preview);
        }

        return {
          ...img,
          type: "new",
          file,
          url: null,
          preview,
        };
      })
    );
  }, []);

  /* ========== DRAG & DROP REORDER ========== */
  const handleDragStart = (_, index) => {
    setDraggedItem(index);
  };

  const handleDragOverReordering = (e, index) => {
    e.preventDefault();
    if (index !== draggedItem) {
      setDragOverItem(index);
    }
  };

  const handleDropReordering = () => {
    if (draggedItem === null || dragOverItem === null) return;

    setImages((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(draggedItem, 1);
      updated.splice(dragOverItem, 0, moved);
      return updated;
    });

    setDraggedItem(null);
    setDragOverItem(null);
  };

  /* ========== CLEANUP ON UNMOUNT ========== */
  useEffect(() => {
    return () => {
      // Jab component band ho, saare blob URLs clear karein taaki RAM free ho jaye
      images.forEach((img) => {
        if (img.preview?.startsWith("blob:")) {
          URL.revokeObjectURL(img.preview);
        }
      });
    };
  }, [images]);

  return {
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
  };
};