import fs from "fs";
import path from "path";
import Product from "../models/Product.js";

const uploadsDir = path.join(process.cwd(), "uploads");

export const cleanupOrphanImages = async () => {
  try {
    // 1️⃣ Get all images used in DB
    const products = await Product.find({}, "images");

    const usedImages = new Set();
    products.forEach((p) => {
      (p.images || []).forEach((img) => {
        usedImages.add(path.basename(img));
      });
    });

    // 2️⃣ Read files in uploads folder
    const files = fs.readdirSync(uploadsDir);

    let deletedCount = 0;

    // 3️⃣ Delete orphan files
    files.forEach((file) => {
      if (!usedImages.has(file)) {
        const filePath = path.join(uploadsDir, file);
        fs.unlinkSync(filePath);
        deletedCount++;
        console.log("🗑 Deleted orphan image:", file);
      }
    });

    console.log(`✅ Cleanup complete. Removed ${deletedCount} files.`);
  } catch (error) {
    console.error("❌ Image cleanup failed:", error);
  }
};
