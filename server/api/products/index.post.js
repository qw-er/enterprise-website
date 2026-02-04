import { connectDB, Product } from '../../utils/db.js'

export default defineEventHandler(async (event) => {
  await connectDB()

  const body = await readBody(event)
  const product = await Product.create(body)
  return product
})
