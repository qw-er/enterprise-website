import connectDB from '../../utils/db.js'
import Contact from '../../models/Contact.js'

export default defineEventHandler(async (event) => {
  await connectDB()

  const contacts = await Contact.find().sort({ createdAt: -1 })
  return contacts
})
