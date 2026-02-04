import connectDB from '../../utils/db.js'
import Product from '../../models/Product.js'

export default defineEventHandler(async (event) => {
  await connectDB()

  const body = await readBody(event)
  const product = await Product.create(body)
  return product
})
