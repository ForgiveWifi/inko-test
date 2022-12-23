import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import dbConnect from "../../../lib/dbConnect"
import errorMessage from "../../../lib/errorMesage"
import getStripeID from "../../../lib/getStripeID"
import stripe from "../../../lib/stripe"

async function handler(req,res) {

  await dbConnect()

  const { method } = req
  const stripe_id = await getStripeID(req,res)

  switch (method) {
    case 'GET':
      try {
        // const page  = parseInt(req.query.page)
        // const limit = parseInt(req.query.limit)
        
        const invoice = await stripe.invoices.list({
          customer: stripe_id,
          limit: 10
        })
        res.status(200).json(invoice)
      }
      catch (err) {
        res.status(500).json(errorMessage(err.message))
      }
      break
    case 'POST':
      try {
        const { description } = req.body
        const customer_id = req.auth.stripe_id
        const invoice = {
          customer: customer_id,
        }
        const res = await stripe.invoices.create(invoice)
        res.status(200).json(res)
      }
      catch (err) {
        res.status(500).json(errorMessage(err.message))
      }
      break
    default:
      res.status(400).json(errorMessage("Invalid request"))
      break
  }
}

export default withApiAuthRequired(handler)
