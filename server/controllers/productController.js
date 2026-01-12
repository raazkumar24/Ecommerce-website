import Product from "../models/Product.js";

/* ===============================
   CREATE PRODUCT (ADMIN)
================================ */
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, brand } = req.body;

    if (!name || !price || !category || !stock || !brand) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // MULTI IMAGES
    const images = req.files
      ? req.files.map((file) => `/uploads/${file.filename}`)
      : [];

    if (images.length === 0) {
      return res.status(400).json({ message: "At least one image required" });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      images,
      brand,
    });

    res.status(201).json(product);
  } catch (error) {
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

    // if (keyword) {
    //   filter.name = { $regex: keyword, $options: "i" };
    // }

    if (category) {
      filter.category = category;
    }

    if (keyword) {
      filter.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { category: { $regex: keyword, $options: "i" } },
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

    //  IMAGE ORDER FROM FRONTEND
    const imageOrder = req.body.imageOrder
      ? JSON.parse(req.body.imageOrder)
      : [];

    // NEW / REPLACED IMAGES (FILES)
    const uploadedImages = req.files
      ? req.files.map((file) => `/uploads/${file.filename}`)
      : [];

    let uploadIndex = 0;

    //  REBUILD IMAGE ARRAY EXACTLY AS FRONTEND ORDER
    const finalImages = imageOrder.map((item) => {
      if (item.type === "old") {
        return item.url; // keep existing image
      } else {
        return uploadedImages[uploadIndex++]; // replaced or new image
      }
    });

    product.images = finalImages;

    // UPDATE OTHER FIELDS
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.description = req.body.description || product.description;
    product.stock = req.body.stock ?? product.stock;
    product.brand = req.body.brand || product.brand;

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


