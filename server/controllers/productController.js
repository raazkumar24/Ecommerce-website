import Product from "../models/Product.js";

/* ===============================
   CREATE PRODUCT (ADMIN)
================================ */
export const createProduct = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const { name, price, category, description, stock, brand } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const images = req.files.map(
      (file) => `/uploads/${file.filename}`
    );

    const product = await Product.create({
      name,
      price,
      category,
      description,
      stock,
      brand,
      images,
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
    const { keyword, category } = req.query;
    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (keyword) {
      filter.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { brand: { $regex: keyword, $options: "i" } },
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
      "name"
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
      name,
      price,
      category,
      description,
      stock,
      brand,
      imageOrder,
      existingImages
    } = req.body;

    // Update fields
    product.name = name ?? product.name;
    product.price = price ?? product.price;
    product.category = category ?? product.category;
    product.description = description ?? product.description;
    product.stock = stock ?? product.stock;
    product.brand = brand ?? product.brand;

    // New uploaded images
    const newImages = (req.files || []).map(
      (file) => `/uploads/${file.filename}`
    );

    // Existing images (keep)
    let oldImages = [];
    if (existingImages) {
      oldImages = Array.isArray(existingImages)
        ? existingImages
        : [existingImages];
    }

    // Apply ordering
    if (imageOrder) {
      const order = JSON.parse(imageOrder);

      const finalImages = [];

      order.forEach((item) => {
        if (item.type === "old" && oldImages.includes(item.url)) {
          finalImages.push(item.url);
        }
        if (item.type === "new" && newImages.length > 0) {
          finalImages.push(newImages.shift());
        }
      });

      product.images = finalImages;
    } else {
      // fallback (safe)
      product.images = [...oldImages, ...newImages];
    }

    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
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


