import { useState } from 'react';
import { useHover } from '@mantine/hooks';
import EditIcon from '@mui/icons-material/Edit';

function SingleImage({ design, isImage, selectImage, light }) {

  const { hovered, ref } = useHover()

  const border = hovered && !isImage
  const { art_file, width, x_offset, y_offset } = design

  return (
    <>
      <div
        ref={ref}
        className="flexbox"
        style={{
          cursor: "pointer",
          outline: border ? `1px dashed ${light ? "black" : "white"}` : null,
          position: "absolute",
          left: x_offset,
          top: -(y_offset),
        }}>
        <img 
          draggable="false"
          src={URL.createObjectURL(art_file)} 
          alt={art_file.name}
          style={{
            width: width,
          }}
        />
        {
          border && 
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