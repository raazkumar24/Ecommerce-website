import Category from "../models/Category.js";
import slugify from "slugify";

// CREATE CATEGORY (ADMIN)
export const createCategory = async (req, res) => {
  try {
    const { name, parent } = req.body; // parent field add kiya

    if (!name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const exists = await Category.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({
      name,
      slug: slugify(name),
      parent: parent || null, // Agar parent ID di hai toh save hogi, varna null
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL CATEGORIES (Hierarchical fetch)
export const getAllCategories = async (req, res) => {
  try {
    // populate('parent')
    const categories = await Category.find()
      .populate("parent", "name")
      .sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE CATEGORY (ADMIN)
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.deleteOne();
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
