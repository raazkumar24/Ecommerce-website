import { useState } from "react";

export const useProductImages = () => {
  const [images, setImages] = useState([]);

  const initFromUrls = (urls = []) => {
    setImages(
      urls.map((url) => ({
        id: crypto.randomUUID(),
        url,
        isNew: false,
      }))
    );
  };

  const addFiles = (files) => {
    const valid = Array.from(files).filter(
      (f) => f.type.startsWith("image/") && f.size < 5 * 1024 * 1024
    );

    const mapped = valid.map((file) => ({
      id: crypto.randomUUID(),
      file,
      isNew: true,
    }));

    setImages((prev) => [...prev, ...mapped]);
  };

  const replaceAt = (index, file) => {
    if (!file || !file.type.startsWith("image/")) return;

    setImages((prev) => {
      const copy = [...prev];
      copy[index] = {
        id: copy[index].id,
        file,
        isNew: true,
      };
      return copy;
    });
  };

  const removeAt = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const reorder = (from, to) => {
    setImages((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(from, 1);
      copy.splice(to, 0, moved);
      return copy;
    });
  };

  return {
    images,
    setImages,
    initFromUrls,
    addFiles,
    replaceAt,
    removeAt,
    reorder,
  };
};
