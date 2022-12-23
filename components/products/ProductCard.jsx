import { useState } from "react"; 
import { motion } from "framer-motion"
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
// import SizeList from "./SizeList";

function ProductCard({product, select}) {

  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <motion.button 
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.1 }}
        onClick={select} 
        className="flexbox-column radius10 shadow2 white-background white-border margin-auto" 
        style={{ width: 250 }}>
        {
          loaded ?
          null :
          <div className="flexbox" style={{ width: 230, height: 230}}>
            <Skeleton className="radius10" style={{ width: "230px", height: "230px", position: "relative", bottom: 2}} />
          </div>
        }
        <img 
          onLoad={() => setLoaded(true)} 
          className="radius10" 
          src={product.images[0]} 
          style={ loaded ? { width: "100%" } : { display: "none"} }
        />
        <h3 className="grey-text text-center" style={{ marginTop: 5}}>{product.name}</h3>
      </motion.button>
    </>
  )
}

export default ProductCard;