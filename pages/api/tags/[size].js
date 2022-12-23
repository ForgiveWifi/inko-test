import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import dbConnect from "../../../lib/dbConnect"
import errorMessage from "../../../lib/errorMesage"
import getStripeID from "../../../lib/getStripeID"
import Tag from "../../../models/Tag"

async function handler(req,res) {

  await dbConnect()

  const { method } = req
  const stripe_id = await getStripeID(req,res)

  switch (method) {
    case "DELETE":
      try {
        const { size } = req.query
        const tag = await Tag.updateOne({_id: stripe_id}, { $pull: { tags: { size: size }}})
        res.status(200).json(tag)
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

export default withApiAuthRequired(handler);