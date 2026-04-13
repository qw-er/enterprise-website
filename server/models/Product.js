import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name is too long']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
    maxlength: [1000, 'Product description is too long']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Product price must be greater than or equal to 0']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    trim: true,
    maxlength: [50, 'Product category is too long']
  },
  image: {
    type: String,
    default: '',
    trim: true
  },
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  versionKey: false
})

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)
