import connectDB from '../../utils/db.js'
import Contact from '../../models/Contact.js'

export default defineEventHandler(async (event) => {
  await connectDB()

  const id = getRouterParam(event, 'id')
  const contact = await Contact.findByIdAndDelete(id)
  
  if (!contact) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Contact not found'
    })
  }
  return { message: 'Contact deleted successfully' }
})
