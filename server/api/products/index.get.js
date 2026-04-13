import connectDB from '../../utils/db.js'
import { listProducts } from '../../services/productService.js'

export default defineEventHandler(async (event) => {
  await connectDB()

  return listProducts()
})
