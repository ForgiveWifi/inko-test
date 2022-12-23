import { useState, useEffect } from "react"
import axios from "axios"
import { showError } from "../ui/alerts"
import ProductSkeleton from "./ProductSkeleton"
import ProductBox from "./ProductBox"

function ProductList({lines}) {

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
      <ProductSkeleton count={lines.total_count} />
    )
  } else
  return (
    <>
      <div className="flexbox-column full-width" style={{ gap: 10, marginTop: 10 }}>
      {
        products.map( (product,i) => {
          return <ProductBox key={i} product={product} />
        })
      }
      </div>
    </>
  );
}

export default ProductList;