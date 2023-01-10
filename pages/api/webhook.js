import stripe from "stripe"
const sendOrderDJ = require("../db-functions/sendOrderDJ")


process.env.ENDPOINT_SECRET
async function handler(req,res) {

  const { method } = req

  switch (method) {
    case "POST":
      try {
        const sig = req.headers['stripe-signature'];
        let event;
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        switch (event.type) {
          case 'invoice.paid':
            const invoice = event.data.object;
            console.log("invoice", invoice)
            const { customer, customer_shipping, lines } = invoice 
            const order = await sendOrderDJ()
            
            break;
          default:
            console.log(`Unhandled event type ${event.type}`);
        }
      }
      catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      break
    default: 
      res.status(400).json(errorMessage("Invalid request"))
      break
  }
}

export default handler