import { connectDB, Product } from '../../utils/db.js'

export default defineEventHandler(async (event) => {
  await connectDB()

  const products = await Product.find()
  return products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})
