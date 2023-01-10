import SingleImage from "./SingleImage";

function FrontPreview({currentImage, makeCurrentImage, color, zIndex, frontImages}) {
  return (
    <>
      <div id="front-preview" className="flexbox" style={{ position: "absolute", zIndex: zIndex, width: 650, height: 650}}>
        <div className="radius15" style={{ position: "absolute", backgroundColor: color.hex, width: "650px", height: "650px"}}></div>
        <img 
          src={"/front-blank-tee.png"} 
          alt="front-blank-tee" className="radius15" 
          style={{ position: "absolute", width: 650, height: 650, filter: color.light ? null : "brightness(200%)"}}
          draggable="false" 
        />
        <div 
          className="flexbox radius5"
          style={{ 
          position: "relative", 
          bottom: 12,
          width: 320, 
          height: 395, 
          zIndex: 40
        }}>
          {
            frontImages.map((design, i) => {
              return(
                <SingleImage key={i} design={design} isImage={currentImage.art_file} selectImage={() => makeCurrentImage(design)} light={color.light} />
              )
            })
          }
        </div>
      </div> 
    </>
  );
}

export default FrontPreview;