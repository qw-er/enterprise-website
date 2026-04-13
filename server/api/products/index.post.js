import connectDB from '../../utils/db.js'
import { createProduct } from '../../services/productService.js'

export default defineEventHandler(async (event) => {
  await connectDB()

  try {
    const body = await readBody(event)
    return await createProduct(body)
  } catch (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message || 'Failed to create product'
    })
  }
})
