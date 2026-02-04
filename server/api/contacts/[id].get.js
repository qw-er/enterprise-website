import { connectDB, Contact } from '../../utils/db.js'

export default defineEventHandler(async (event) => {
  await connectDB()

  const id = getRouterParam(event, 'id')
  const contact = await Contact.findById(id)
  
  if (!contact) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Contact not found'
    })
  }
  return contact
})
