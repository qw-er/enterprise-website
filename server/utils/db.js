import mongoose from 'mongoose'

function getMongoUri() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/enterprise'

  if (!mongoUri) {
    throw new Error('Please define MONGODB_URI environment variable')
  }

  return mongoUri
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(getMongoUri(), opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default connectDB
