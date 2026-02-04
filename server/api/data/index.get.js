import connectDB from '../../utils/db.js'
import Product from '../../models/Product.js'
import Contact from '../../models/Contact.js'

export default defineEventHandler(async (event) => {
  await connectDB()

  const products = await Product.find()
  const contacts = await Contact.find()

  return {
    products: {
      count: products.length,
      data: products
    },
    contacts: {
      count: contacts.length,
      data: contacts
    }
  }
})
