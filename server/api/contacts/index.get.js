import { connectDB, Contact } from '../../utils/db.js'

export default defineEventHandler(async (event) => {
  await connectDB()

  const contacts = await Contact.find()
  return contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})
