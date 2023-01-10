const { default: axios } = require("axios")
const dotenv = require("dotenv")

dotenv.config() 

module.exports = async function sendOrderDJ({invoice_id, ship_to, ship_provider, items}) {
  const order = {
    "type": "order",
    "account_id": process.env.DREAM_JUNCTION_API_ACCOUNT_ID,
    "account_zip": process.env.DREAM_JUNCTION_API_ACCOUNT_ZIP,
    "purchase_order": invoice_id,
    "garments_provided": false,
    "ship_provider": ship_provider,
    "ship_to": ship_to,
    "ship_from": {
      "company_name": "inkhouse",
      "address": "15708 San Solano Ct",
      "address_2": "",
      "city": "Austin",
      "state": "TX",
      "zip_code": "78738",
      "country": "US"
    },
    "production_priority": "normal",
    "items": items
  }
  // const res = await axios.post("https://api.dreamjunction", order, {
  //   headers: {
  //     authorization: process.env.DREAM_JUNCTION_API_KEY
  //   }
  // })
  return res
}