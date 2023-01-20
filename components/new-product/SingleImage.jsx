import { useState } from 'react';
import { useHover } from '@mantine/hooks';
import EditIcon from '@mui/icons-material/Edit';

function SingleImage({ image, onClick, noImage, dark }) {

  const { hovered, ref } = useHover()

  const border = hovered && noImage
  const { art_file, width, x_offset, y_offset } = image

  return (
    <>
      <button
        ref={ref}
        onClick={onClick}
        className="flexbox"
        style={{
          cursor: "pointer",
          outline: "2px solid red", // border ? `2px dashed ${dark ? "white" : "black" }` : null,
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
      </button>
    </>
  );
}

export default SingleImage;