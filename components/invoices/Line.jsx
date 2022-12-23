import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import toDollars from "../../lib/toDollars";
import Divider from "../ui/Divider";
import { CgClose } from "react-icons/cg"
import Link from "next/link";
import AttributeDisplay from "../ui/AttributeDisplay";
import LineCarousel from "./LineCarousel";

function Line({product}) {
  
  const [loaded, setLoaded] = useState(false)
  
  const {name, quantity, amount, images, metadata} = product
  const { size, style, color } = metadata
  return (
    <>
      <div className="link flexbox-row flex-wrap full-width background1 radius15 white-border shadow2" style={{ padding: "15px", gap: 15}}>
        {
          loaded ? null : <div className="flexbox"><Skeleton style={{ width: "150px", height: "150px"}} /></div>
        }
        {/* {
          images.map((image,i) => {
            return(
              <img 
                key={i}
                src={image} 
                alt={name} 
                onLoad={() => setLoaded(true)}
                className="radius10" 
                style={loaded ? { height: "150px"} : { display: "none"}} 
              /> 
            )
          })
        } */}
        <img 
          src={images[0]} 
          alt={name} 
          onLoad={() => setLoaded(true)}
          className="radius10" 
          style={loaded ? { height: "150px"} : { display: "none"}} 
        /> 

        <div className="flexbox-start">
          <h3 >{name}</h3>
          <div>
            <AttributeDisplay size={size} color={color} style={style}/>
          </div>
          <h5>price:</h5>
        </div>
        
        <div className="flexbox-row no-wrap" style={{ marginLeft: "auto", marginTop: "auto", marginRight: "5px" }}>
          <h5 style={{ marginRight: 30}}>{quantity}</h5>
          <CgClose style={{ fontSize: 20}}/>
          <div className="flexbox-column-end" style={{ width: 70 }}>
            <h5 style={{ marginLeft: "auto"}}>{toDollars(amount)}</h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default Line;