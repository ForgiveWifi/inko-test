import ProductButtons from "./ProductButtons";
import CurrentImage from "./CurrentImage";
import BackPreview from "./BackPreview";
import FrontPreview from "./FrontPreview";

function ProductPreview({frontImages, backImages, color, currentImage, setCurrentImage, imageList, setImageList}) {

  function makeCurrentImage(item) {
    setCurrentImage(item)
    setImageList(imageList.filter((image) => image !== item))
  }
  const { placement, width, height } = currentImage
  const front = placement === "front"

  
  const { light } = color

  return (
    <>
      <div className="flexbox" style={{position: "relative", width: 650, height: 650}}>
        <FrontPreview currentImage={currentImage} makeCurrentImage={makeCurrentImage} zIndex={front ? 20 : 1} color={color} frontImages={frontImages}/>
        <BackPreview currentImage={currentImage} makeCurrentImage={makeCurrentImage} zIndex={front ? 1 : 20 } color={color} backImages={backImages}/>
        { currentImage.image && <CurrentImage currentImage={currentImage} setCurrentImage={setCurrentImage} light={light} /> }
        <ProductButtons currentImage={currentImage} setCurrentImage={setCurrentImage} imageList={imageList} setImageList={setImageList}/>
        <div style={{ position: "absolute", top: 0, right: 0, zIndex: 20}}>
          <button onClick={front ? () => setCurrentImage({...currentImage, placement: "back"}) : () => setCurrentImage({...currentImage, placement: "front"})} className="form-button full-width " style={{ width: 110, fontSize: 20, margin: 10, padding: "4px 10px", borderRadius: 10 }}>{currentImage.placement.toUpperCase()}</button>
        </div>
        {
          currentImage?.image &&
          <div className="flexbox-column" style={{ position: "absolute", bottom: 0, left: 0, width: 150, height: 360,  zIndex: 20}}>
            <div className="orange-text" style={{ marginTop: "auto"}}>width: {width / 20} in.</div>
            <div className="orange-text">height: {height / 20} in.</div>
            <div className="flexbox-column" style={{gap: 5, marginTop: 10}}>
              <button onClick={() => setCurrentImage({...currentImage, y_offset: 0})} className="position-button full-width max-radius">TOP</button>
              <button onClick={() => setCurrentImage({...currentImage, x_offset: (320 - width) / 2})} className="position-button full-width max-radius">CENTER</button>
              <button onClick={() => setCurrentImage({...currentImage, x_offset: 0})} className="position-button full-width max-radius">LEFT</button>
              <button onClick={() => setCurrentImage({...currentImage, x_offset: 320 - width})} className="position-button full-width max-radius" style={{ marginBottom: 55}} >RIGHT</button>
            </div>
          </div>
        }
      </div>
    </>
  );
}


  export default ProductPreview;