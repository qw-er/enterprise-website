import connectDB from '../../utils/db.js'
import { getProductById } from '../../services/productService.js'

export default defineEventHandler(async (event) => {
  await connectDB()

  const id = getRouterParam(event, 'id')
  const product = await getProductById(id)
  
  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found'
    })
  }
  return product
})
