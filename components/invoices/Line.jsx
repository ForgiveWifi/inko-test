import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import toDollars from "../../lib/toDollars";
import Divider from "../ui/Divider";
import { CgClose } from "react-icons/cg"
import AttributeDisplay from "./AttributeDisplay";
import LineCarousel from "./LineCarousel";
import HorzDivider from "../ui/HorzDivider";

function Line({product}) {
  
  const [loaded, setLoaded] = useState(false)
  
  const {name, quantity, unit_price, amount, images, metadata} = product
  const { size, style, color } = metadata

  return (
    <>
      <div className="link flexbox-row flex-wrap full-width background1 radius15 white-border shadow2" style={{ padding: "15px", gap: 15}}>
        {
          loaded ? 
          null : 
          <div className="flexbox radius10 background2" style={{ width: 150, height: 150}}>
          </div>
        }
        <img 
          src={images[0]} 
          alt={name} 
          onLoad={() => setLoaded(true)}
          className="radius10" 
          style={loaded ? { height: "150px"} : { display: "none"}} 
        /> 

        <div className="flexbox-start">
          <h3 >{name}</h3>
          <h5>{toDollars(unit_price)}</h5>
          <div>
            <AttributeDisplay size={size} color={color} style={style}/>
          </div>
        </div>
        
        <div className="flexbox-column" style={{ margin: "auto 5px 0px auto" }}>
          <h5 className="margin-left">{toDollars(unit_price)}</h5>
          <h5 className="margin-left">x {quantity}</h5>
          <HorzDivider/>
          <h5 >{toDollars(amount)}</h5>
        </div>
      </div>
    </>
  );
}

export default Line;