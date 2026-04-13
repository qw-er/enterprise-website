import connectDB from '../../utils/db.js'
import { updateProductById } from '../../services/productService.js'

export default defineEventHandler(async (event) => {
  await connectDB()

  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)
    const product = await updateProductById(id, body)

    if (!product) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Product not found'
      })
    }

    return product
  } catch (error) {
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 400,
      statusMessage: error.message || 'Failed to update product'
    })
  }
})
