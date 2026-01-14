// src/hooks/useImageHandling.js
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useImageHandling = (generateId) => {
  const [images, setImages] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);

  /* ========== ADD FILES ========== */
  const handleFiles = useCallback(
    (files) => {
      if (!files || files.length === 0) return;

      const validFiles = Array.from(files).filter(
        (file) =>
          file.type.startsWith("image/") && file.size < 5 * 1024 * 1024
      );

      if (validFiles.length === 0) {
        toast.error("Invalid images (max 5MB)");
        return;
      }

      const newImages = validFiles.map((file) => ({
        id: `new-${generateId()}`,
        type: "new",
        file,
        url: null,
        preview: URL.createObjectURL(file),
      }));

      setImages((prev) => [...prev, ...newImages]);
    },
    [generateId]
  );

  /* ========== REMOVE ========== */
  const removeImage = useCallback((id) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img?.preview?.startsWith("blob:")) {
        URL.revokeObjectURL(img.preview);
      }
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  /* ========== REPLACE (edit) ========== */
  const replaceImage = useCallback((id, file) => {
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Invalid image");
      return;
    }

    const preview = URL.createObjectURL(file);

    setImages((prev) =>
      prev.map((img) => {
        if (img.id !== id) return img;

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

  const handleDragOverReordering = (_, index) => {
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

  /* ========== CLEANUP ========== */
  useEffect(() => {
    return () => {
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
