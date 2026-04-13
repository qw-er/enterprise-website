import connectDB from '../../utils/db.js'
import { deleteProductById } from '../../services/productService.js'

export default defineEventHandler(async (event) => {
  await connectDB()

  const id = getRouterParam(event, 'id')
  const product = await deleteProductById(id)
  
  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found'
    })
  }
  return { message: 'Product deleted successfully' }
})
