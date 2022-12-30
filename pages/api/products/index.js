import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import dbConnect from "../../../lib/dbConnect"
import errorMessage from "../../../lib/errorMesage"
import getStripeID from "../../../lib/getStripeID"
import stripe from "../../../lib/stripe"
import Product from "../../../models/Product"

async function handler(req,res) {

  await dbConnect()

  const { method } = req
  const stripe_id = await getStripeID(req,res)

  switch (method) {
    case 'GET':
      try {
        // const page  = parseInt(req.query.page)
        // const limit = parseInt(req.query.limit)

        // if (!(page && limit)) {
        //   return(res.status(400).json(errorMessage("Missing page index or limit")))
        // }

        // const startIndex = (page - 1) * limit
        const startIndex = 0
        const limit = 10

        const total = await Product.find({ account: stripe_id }).count()
        const results = {}
        // results.pages = Math.ceil(total / limit)  
        results.data = await Product.find({ account: stripe_id}).sort({created_at: -1}).limit(limit).skip(startIndex).exec()
        res.status(200).json(results)
      }
      catch (err) {
        console.log(err)
        res.status(500).json(errorMessage(err.message))
      }
      break
    case 'POST':
      try {
        const {name, description, sizes, attributes, images, designs} = req.body
  
        const product = await Product.create({
          name: name,
          account: stripe_id, 
          sizes: sizes, 
          color: attributes.color,
          style: attributes.style, 
          designs: designs, 
          images: images
        })
  
        const new_product = {
          images: images,
          metadata: {
            stripe_id: stripe_id,
            design_id: product._id,
            ...attributes,
          },
          shippable: true
        }
  
        if (description.length !== 0) {
          new_product.description = description
        }
  
        for (let i = sizes.length - 1; i >= 0; i--) {
          new_product.name = `${name} - ${sizes[i]}`
          new_product.metadata.size = sizes[i]
          await stripe.products.create(new_product)
        }
        res.status(200).json({message: "Success!"}) 
      }
      catch (err) {
        console.log(err)
        res.status(500).json(errorMessage(err.message))
      }
      break
    default:
      res.status(400).json(errorMessage("Invalid request"))
      break
  }
}

export default withApiAuthRequired(handler)
