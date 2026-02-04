let products = []
let contacts = []

let productIdCounter = 1
let contactIdCounter = 1

export async function connectDB() {
  return { connected: true }
}

export const Product = {
  find: async () => {
    return products
  },
  create: async (data) => {
    const product = {
      _id: String(productIdCounter++),
      ...data,
      createdAt: new Date()
    }
    products.push(product)
    return product
  },
  findById: async (id) => {
    return products.find(p => p._id === id)
  },
  findByIdAndUpdate: async (id, data) => {
    const index = products.findIndex(p => p._id === id)
    if (index !== -1) {
      products[index] = { ...products[index], ...data }
      return products[index]
    }
    return null
  },
  findByIdAndDelete: async (id) => {
    const index = products.findIndex(p => p._id === id)
    if (index !== -1) {
      const deleted = products[index]
      products.splice(index, 1)
      return deleted
    }
    return null
  }
}

export const Contact = {
  find: async () => {
    return contacts
  },
  create: async (data) => {
    const contact = {
      _id: String(contactIdCounter++),
      ...data,
      createdAt: new Date()
    }
    contacts.push(contact)
    return contact
  },
  findById: async (id) => {
    return contacts.find(c => c._id === id)
  },
  findByIdAndUpdate: async (id, data) => {
    const index = contacts.findIndex(c => c._id === id)
    if (index !== -1) {
      contacts[index] = { ...contacts[index], ...data }
      return contacts[index]
    }
    return null
  },
  findByIdAndDelete: async (id) => {
    const index = contacts.findIndex(c => c._id === id)
    if (index !== -1) {
      const deleted = contacts[index]
      contacts.splice(index, 1)
      return deleted
    }
    return null
  }
}
