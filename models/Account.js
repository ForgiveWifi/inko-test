const mongoose = require("mongoose")
const { Schema } = mongoose 
const { v4: uuidv4 } = require('uuid');
const generate = require("nanoid-esm/generate")

const accountSchema = Schema({
  _id: {
    type: String,
    required: true,
    default: () => generate('1234567890', 8),
    immutable: true
  },
  name: {
    type: String,
    required: true
  },
  api_key: {
    type: String,
    required: true,
    default: () => uuidv4(),
  },
  ship_from: {
    _id: false,
    type: {
      first_name: {
        type: String,
      },
      last_name: {
        type: String,
      },
      company_name: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      address_2: {
        type: String,
      },
      city: {
        type: String,
        required: true
      },
      state: {
        type: String,
        required: true
      },
      zip_code: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      }
    },
    required: true
  },
  joined_at: {
    type: Date,
    required: true,
    default: Date.now,
    immutable: true
  }
})

module.exports = mongoose.model("Account", accountSchema)