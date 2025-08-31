import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from './models/product.js';
import Category from './models/category.js';
import { categoriesData, productData } from './seedData.js';

dotenv.config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    // Clear old data
    await Product.deleteMany({});
    await Category.deleteMany({});

    // Insert categories
    const categoryDocs = await Category.insertMany(categoriesData);

    // Map category names to IDs
    const categoryMap = categoryDocs.reduce((map, category) => {
      map[category.name] = category._id;
      return map;
    }, {}); // <-- important

    // Attach category IDs to products
    const productsWithCategoryIds = productData.map(product => ({
      ...product,
      category: categoryMap[product.category],
    }));

    await Product.insertMany(productsWithCategoryIds);

    console.log("✅ DATABASE SEEDED SUCCESSFULLY");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await mongoose.connection.close(); // ✅ proper close
    process.exit(0);
  }
}

seedDatabase();
