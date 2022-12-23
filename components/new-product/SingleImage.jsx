import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';

function SingleImage({ design, isImage, selectImage, light }) {

  const [hover, setHover] = useState(false)

  const hovered = hover && !isImage
  const { image, width, x_offset, y_offset } = design

  return (
    <>
      <div
        className="flexbox"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          cursor: "pointer",
          outline: hovered ? `1px dashed ${light ? "black" : "white"}` : null,
          position: "absolute",
          left: x_offset,
          top: -(y_offset),
        }}>
      <img 
        draggable="false"
        src={URL.createObjectURL(image)} 
        style={{
          width: width,
        }}
      />
        {
          hovered && 
          <div style={{ position: "absolute", top: 0, right: 0}}>
            <button 
              onClick={selectImage}
              className="flexbox max-radius" style={{ position: "relative", bottom: 10, left: 10, backgroundColor: light ? "black" : "white", width: 20, height: 20}}>
              <EditIcon style={{ fill: light ? "white" : "black", fontSize: 14}} />
            </button>
          </div>
        }
      </div>
    </>
  );
}

export default SingleImage;