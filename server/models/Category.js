import mongoose from "mongoose";
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    // Naya field: Agar ye null hai toh ye main category hai (e.g., Electronics)
    // Agar isme kisi ki ID hai toh ye sub-category hai (e.g., Laptops)
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  { timestamps: true }
);
const Category = mongoose.model("Category", categorySchema);
export default Category;
