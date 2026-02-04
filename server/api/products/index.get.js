import connectDB from '../../utils/db.js'
import Product from '../../models/Product.js'

export default defineEventHandler(async (event) => {
  await connectDB()

  const products = await Product.find().sort({ createdAt: -1 })
  return products
})
