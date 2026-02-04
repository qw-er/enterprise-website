import connectDB from '../../utils/db.js'
import Contact from '../../models/Contact.js'

export default defineEventHandler(async (event) => {
  await connectDB()

  const body = await readBody(event)
  const contact = await Contact.create(body)
  return contact
})
