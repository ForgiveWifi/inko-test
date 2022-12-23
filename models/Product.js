import mongoose from "mongoose"
const { Schema, model } = mongoose 
import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('1234567890', 10)

const PlacementSchema = Schema({
  placement: {  
    type: String,
    required: true,
    enum: {
      values: ['Front Center', 'Back Center', 'Front Left Chest', 'Front Right Chest', 'Neck'],
      message: '{VALUE} is not supported placement'
    }
  },
  art_file: {
    type: String,
    required: true,
  },
  art_url: {
    type: String,
    required: true,
  },
  underbase: {
    type: Boolean,
    required: true,
    default: true
  },
  x_offset: {
    type: Number,
    required: true,
  },
  y_offset: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
    min: 1
  },
  height: {
    type: Number,
    required: true,
    min: 1
  }
})

const ProductSchema = Schema({
  _id: {
    type: String,
    required: true,
    default: () => nanoid(),
  },
  name: {
    type: String,
    required: true
  },
  account: {
    type: String,
    required: true
  },
  sizes: {
    type: [String],
    required: true
  },
  color: {
    type: String,
    required: true
  },
  style: {
    type: String,
    required: true
  },
  designs: {
    _id: false,
    type: [PlacementSchema], 
    required: true
  },
  images: {
    type: [String],
    required: true 
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
    immutable: true
  }
})

export default mongoose.models.Product || model("Product", ProductSchema)