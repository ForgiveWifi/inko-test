import { useState, useEffect } from "react"
import axios from "axios"
import { showError } from "../ui/alerts"
import LineSkeleton from "./LineSkeleton"
import Line from "./Line"

function Lines({lines}) {

  const [products, setProducts] = useState([])
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if (lines) {
      fetchProducts()
    }
    
    async function fetchProducts() {
      try {
        setLoad(true)
        const product_list = await Promise.all(lines.data.map(async ({quantity, price, amount, description}) => {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/stripe/${price.product}`)
          const { data } = res
          const { _id, name, images, metadata} = data
          return({
            name: name,
            quantity: quantity,
            amount: amount,
            images: images,
            metadata: metadata
          })
        }))
        setProducts(product_list)
        setLoad(false)
      }
      catch (err) {
        showError("products", "Server error - products", "Contact Us!")
      }
    }
    
  },[])

  if (!lines) {
    return null
  }
  if (load) {
    return(
      <div className="flexbox-column full-width" style={{ gap: 10, marginTop: 10 }}>
        <LineSkeleton count={lines.total_count} />
      </div>
    )
  }
  return (
    <>
      <div className="flexbox-column full-width" style={{ gap: 10, marginTop: 10 }}>
      {/* <LineSkeleton count={1} /> */}
      {
        products.map( (product,i) => {
          return <Line key={i} product={product} />
        })
      }
      </div>
    </>
  );
}

export default Lines;