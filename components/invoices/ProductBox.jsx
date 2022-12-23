import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import toDollars from "../../lib/toDollars";
import Divider from "../ui/Divider";
import { CgClose } from "react-icons/cg"
import Link from "next/link";

function ProductBox({product}) {
  
  const [loaded, setLoaded] = useState(false)
  
  const {name, quantity, amount, images, metadata} = product
  const { size, style, color} = metadata
  // const {style, size, color } = design.attributess
  return (
    <>
      <Link href={`/account/products/${metadata.design_id}`} className="link flexbox-row flex-wrap full-width background1 radius15 shadow2" style={{ padding: "15px", gap: 10, border: "3px solid white"}}>
        {
          loaded ? null : <div className="flexbox"><Skeleton style={{ width: "150px", height: "150px", marginRight: "10px"}} /></div>
        }
        {
          images.map((image,i) => {
            return(
              <img 
                key={i}
                src={image} 
                alt={name} 
                onLoad={() => setLoaded(true)}
                className="radius10" 
                style={loaded ? { marginRight: "10px", height: "150px"} : { display: "none"}} 
              /> 
            )
          })
        }

        <div className="flexbox-start">

          <h4>{name}</h4>
          <div className="flexbox-row">
              <div>{size} </div>
            <Divider />
              <div>{color}</div>
            <Divider />
              <div>{style}</div>
          </div>
          <div>Qty: </div>
        </div>
        
        <div className="flexbox-row no-wrap" style={{ marginLeft: "auto", marginTop: "auto", marginRight: "5px" }}>
        <h5 style={{ marginRight: 30}}>{quantity}</h5>
        <CgClose style={{ fontSize: 20}}/>
          <div className="flexbox-column-end" style={{ width: 70 }}>
            <h5 style={{ marginLeft: "auto"}}>{toDollars(amount)}</h5>
          </div>
        </div>
      </Link>
    </>
  );
}

export default ProductBox;