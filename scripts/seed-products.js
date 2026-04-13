import mongoose from 'mongoose'
import connectDB from '../server/utils/db.js'
import { defaultProducts } from '../server/data/products.js'
import { createProduct } from '../server/services/productService.js'

async function seedProducts() {
  process.loadEnvFile('.env')
  await connectDB()

  const productCount = await mongoose.models.Product.countDocuments()

  if (productCount > 0) {
    console.log(`Skipped: database already contains ${productCount} products.`)
    process.exit(0)
  }

  const createdProducts = await Promise.all(defaultProducts.map((product) => createProduct(product)))
  console.log(`Seeded ${createdProducts.length} products.`)
  process.exit(0)
}

seedProducts().catch((error) => {
  console.error('Failed to seed products:', error)
  process.exit(1)
})
