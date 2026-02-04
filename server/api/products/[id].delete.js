import connectDB from '../../utils/db.js'
import Product from '../../models/Product.js'

export default defineEventHandler(async (event) => {
  await connectDB()

  const id = getRouterParam(event, 'id')
  const product = await Product.findByIdAndDelete(id)
  
  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found'
    })
  }
  return { message: 'Product deleted successfully' }
})
