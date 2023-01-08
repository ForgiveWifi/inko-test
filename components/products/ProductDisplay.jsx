import { toTime, toDate } from "../../lib/time";
import DesignList from "./DesignList";
import Divider from "../ui/Divider";
import CopyID from "./CopyID";
import Loading from "../ui/Loading";
import ProductCarousel from "./ProductCarousel";
import { useState } from "react";
import InfoIcon from "../ui/InfoIcon";
import colors from "../data/colors";
import garments from "../data/garments";

function ProductDisplay({loading, product}) {

  const [currentSlide, setCurrentSlide] = useState(0)

  if (!product) {
    return <Loading />
  } else {
  const { _id, name, color, style, description, sizes, images, created_at,} = product
  return (
    <>
      {loading && <Loading /> }
      <div className="flexbox-column flex-wrap" style={{ width: "100%", maxWidth: 650, gap: 10, marginTop: 20, padding: 30 }}>
        
        <ProductCarousel images={images} name={name} setCurrentSlide={setCurrentSlide}/>
          
        <div className="flexbox-column-start full-width">
          <div className="flexbox-row-start">
            <h2 style={{ fontSize: "45px", marginBottom: 10}}>{name}</h2>
            {/* <button className="flexbox background1 radius5 margin-left" style={{ padding: "5px 12px"}}>
              <TbDownload style={{ fontSize: 25}} />
            </button> */}
          </div>
          <div>{description}</div>
          <h5>style:</h5> 
          <div style={{ marginBottom: 5 }}>{garments[style]}</div>
          <h5>color:</h5> 
          <div className="flexbox-row">
          <div>{color}</div>
          <div className="max-radius" style={{ backgroundColor:colors[color], width: 30, height: 30, marginLeft: 8 }}></div>
          
          </div>
          <h5>sizes:</h5>
          <div className="flexbox-column-start">
          {/* <HorzDivider /> */}
            {sizes.map((size, i) => {
              return(
                <div className="flexbox-row" key={i}>
                  <div>{size}</div>
                    <Divider />
                  <div className="flexbox-row">
                    <h5>$</h5>
                    <h5>---</h5>
                    <InfoIcon />
                  </div>
                </div>
              )
            })}
          {/* <HorzDivider /> */}
          </div>
          <div className="flexbox-row" style={{ marginTop: 5, gap: 10}}>
            <h5 style={{ marginTop: 2}}>ID: {product._id}</h5>
            <CopyID text="Copy ID" value={_id} />
          </div>
          <div style={{ marginTop: 5}}>
            <h5>Created on:</h5>
            <div className="flexbox-row" style={{ marginBottom: "15px"}}>
                <h5>{toDate(created_at, "short")}</h5>
              <Divider />
                <h5>{toTime(created_at)}</h5>
            </div>
          </div>
        </div>
        <DesignList designs={product.designs}/>
      </div>
      
    </>
  )};
}

export default ProductDisplay;