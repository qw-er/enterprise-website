import { connectDB, Contact } from '../../utils/db.js'

export default defineEventHandler(async (event) => {
  await connectDB()

  const body = await readBody(event)
  const contact = await Contact.create(body)
  return contact
})
