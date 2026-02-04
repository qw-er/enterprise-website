import connectDB from '../../utils/db.js'
import Product from '../../models/Product.js'

export default defineEventHandler(async (event) => {
  await connectDB()

  const id = getRouterParam(event, 'id')
  const body = await readBody(event)
  const product = await Product.findByIdAndUpdate(id, body, { new: true })
  
  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found'
    })
  }
  return product
})
