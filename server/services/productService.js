import Product from '../models/Product.js'

function normalizeProductPayload(payload = {}) {
  return {
    name: String(payload.name || '').trim(),
    description: String(payload.description || '').trim(),
    price: Number(payload.price),
    category: String(payload.category || '').trim(),
    image: String(payload.image || '').trim(),
    isPublished: payload.isPublished ?? true
  }
}

export async function listProducts() {
  return Product.find().sort({ createdAt: -1 })
}

export async function getProductById(id) {
  return Product.findById(id)
}

export async function createProduct(payload) {
  return Product.create(normalizeProductPayload(payload))
}

export async function updateProductById(id, payload) {
  return Product.findByIdAndUpdate(
    id,
    normalizeProductPayload(payload),
    {
      new: true,
      runValidators: true
    }
  )
}

export async function deleteProductById(id) {
  return Product.findByIdAndDelete(id)
}
