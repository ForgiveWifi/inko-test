import SingleImage from "./SingleImage";

function BackPreview({currentImage, makeCurrentImage, color, zIndex, backImages}) {
  return (
    <>  
      <div id="back-preview" className="flexbox" style={{ position: "absolute", zIndex: zIndex, width: 650, height: 650}}>
        <div className="radius15" style={{ position: "absolute", backgroundColor: color.hex, width: "650px", height: "650px"}}></div>
        <img src={"/back-blank-tee.png"} 
            alt="back-blank-tee" className="radius15" 
            style={{ position: "absolute", width: 650, height: 650, filter: color.light ? null : "brightness(200%)"}} 
            draggable="false" 
        />
        <div 
            className="flexbox radius5"
            style={{ 
            position: "relative", 
            bottom: 38,
            width: 320, 
            height: 395, 
            zIndex: 40
          }}>
            {
              backImages.map((design, i) => {
                return(
                  <SingleImage key={i} design={design} isImage={currentImage.image} selectImage={() => makeCurrentImage(design)} light={color.light} />
                )
              })
            }
          </div>
      </div> 
    </>
  );
}

export default BackPreview;