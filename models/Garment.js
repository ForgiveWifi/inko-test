const mongoose = require("mongoose")
const { Schema } = mongoose 

const garmentSchema = Schema({
  _id: false,
  sku: { 
    type: Number,
    required: true
  }, 
  attibutes: {
    _id: false,
    type: {
      style: {
      type: String,
      required: true
      },
    color: {
      type: String,
      required: true,
      uppercase: true
      },
    size: {
      type: String,
      required: true,
      uppercase: true
      }
    },
    required: true
  }
})

module.exports = mongoose.model("Garment", garmentSchema)