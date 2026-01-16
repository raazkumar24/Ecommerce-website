import Product from "../models/Product.js";
import Category from "../models/Category.js";

/* ===============================
   CREATE PRODUCT (ADMIN)
================================ */
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      description,
      stock,
      brand,
      discount,
      isNew,
      keywords
    } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const images = (req.files || []).map((file) => file.path);
    if (images.length === 0) {
      return res.status(400).json({ message: "At least one image required" });
    }

    // Parsing keywords string back to array
    const parsedKeywords = keywords ? JSON.parse(keywords) : [];

    const product = await Product.create({
      name,
      price,
      category,
      description,
      stock,
      brand,
      images,
      discount,
      isNew,
      keywords: parsedKeywords
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET ALL PRODUCTS (PUBLIC)
================================ */
export const getAllProducts = async (req, res) => {
  try {
    const { keyword, categoryId } = req.query;
    let filter = {};

    // --- 1. Category Filter Logic ---
    if (categoryId) {
      const subCategories = await Category.find({ parent: categoryId }).select("_id");
      if (subCategories.length > 0) {
        const ids = subCategories.map(cat => cat._id);
        ids.push(categoryId);
        filter.category = { $in: ids };
      } else {
        filter.category = categoryId;
      }
    }

    // --- 2. Keyword Search Logic (Fixed) ---
    if (keyword) {
      const matchingCategories = await Category.find({
        name: { $regex: keyword, $options: "i" }
      }).select("_id");

      const categoryIds = matchingCategories.map(c => c._id);

      filter.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { brand: { $regex: keyword, $options: "i" } },
        // FIX: Search inside keywords array correctly
        { keywords: { $regex: keyword, $options: "i" } }, 
        { category: { $in: categoryIds } }
      ];
    }

    const products = await Product.find(filter)
      .populate("category", "name")
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   GET SINGLE PRODUCT
================================ */
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name",
      "slug",
      "parent",
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =============================== 
   UPDATE PRODUCT (ADMIN)
================================ */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const {
      name, price, category, description,
      stock, brand, discount, isNew, keywords, imageOrder, existingImages
    } = req.body;

    // Basic fields update
    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.category = category ?? product.category;
    product.description = description ?? product.description;
    product.stock = stock ?? product.stock;
    product.brand = brand ?? product.brand;
    product.discount = discount ?? product.discount;
    product.isNew = isNew ?? product.isNew;

    // FIX: Keywords update logic (Frontend sends JSON string)
    if (keywords) {
      try {
        product.keywords = JSON.parse(keywords);
      } catch (e) {
        // Agar pehle se array hai toh directly assign karein
        product.keywords = Array.isArray(keywords) ? keywords : [keywords];
      }
    }

    // --- Image Handling Logic (Wahi purana wala hi rahega) ---
    const newImages = (req.files || []).map((file) => file.path);
    let oldImages = existingImages ? (Array.isArray(existingImages) ? existingImages : [existingImages]) : [];

    if (imageOrder) {
      const order = JSON.parse(imageOrder);
      const finalImages = [];
      order.forEach((item) => {
        if (item.type === "old" && oldImages.includes(item.url)) finalImages.push(item.url);
        if (item.type === "new" && newImages.length > 0) finalImages.push(newImages.shift());
      });
      product.images = finalImages;
    } else {
      product.images = [...oldImages, ...newImages];
    }

    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   DELETE PRODUCT (ADMIN)
================================ */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();
    res.json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


