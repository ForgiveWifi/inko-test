import mongoose from "mongoose"
const { Schema, model } = mongoose 

const addressSchema = Schema({
  first_name: String,
  last_name: String,
  company_name: String,
  address: String,
  address_2: String,
  city: String,
  state: String,
  zip_code: String,
  country: String
})

const singleOrderSchema = Schema({
  ship_provider: {
    type: String,
    required: true
  },
  ship_method: {
    type: String,
  },
  ship_to: {
    _id: false,
    type: addressSchema,
    required: true
  },
  ship_from: {
    _id: false,
    type: addressSchema,
    required: true
  },
  order_notes: { 
    type: String,
  }, 
  production_priority: {
    type: String,
    required: true,
  },
  items: {
    _id: false,
    type: [
      {
      _id: false,
      quantity: {
        type: Number,
        required: true,
      },
      design_id: {
        type: String,
        required: true
      }
      }
    ],
    required: true

  }
})

const orderSchema = Schema({
  _id: {
    type: Number,
    required: true,
    immutable: true
  },
  order_id: {
    type: String,
    required: true,
  },
  account: {
    _id: false,
    type: {
      account_id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      }
    },
    required: true,
    immutable: true
  },
  order: {
    _id: false,
    type: singleOrderSchema,
    required: true
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
    immutable: true
  }
})

export default model("Order", orderSchema)