import { useEffect, useRef, useState } from "react"
import { Rnd } from "react-rnd"
import { scale } from "../../lib/functions"
import ResizeBox from "./ResizeBox"


function CurrentImage({ currentImage, setCurrentImage, pallet, dark }) {

  const ref = useRef(0)
  const [dragOutline, setDragOutline] = useState(false)
  const [loaded, setLoaded] = useState(false)
  
  const {art_file, width, height, x_offset, y_offset, placement } = currentImage

  const pallet_width = pallet.width * 20
  const pallet_height = pallet.height * 20

  useEffect(() => {
    if (currentImage && ref.current) {
      if (!currentImage.width) {
        console.log(ref.current)
        const w = ref.current.width
        const h = ref.current.height

        console.log(w)
        console.log(h)
        const ratio = scale(w, h, { width: 160, height: 200 })

        setCurrentImage({
          ...currentImage,
          width: (w * ratio), 
          height: (h * ratio),
          x_offset: (pallet_width - w * ratio ) / 2
        })
      }
    }
  }, [loaded])

  useEffect(() => {
    function handleArrows(event) {
      switch (event.keyCode) {
        case 37: // left
          if (x_offset > 0) {
            if (x_offset <= 1) {
              setCurrentImage({ ...currentImage, x_offset: 0 })
            } else
            setCurrentImage({ ...currentImage, x_offset: x_offset - 1 })
          }
          break;
        case 38: // up 
          event.preventDefault()
          if (y_offset > 0) {
            if (y_offset <= 1) {
              setCurrentImage({ ...currentImage, y_offset: 0 })
            } else
            setCurrentImage({ ...currentImage, y_offset: y_offset + 1 })
          }
          break;
        case 39: // right
          if (x_offset < pallet_width - width ) {
            if (x_offset >= (pallet_width - 1) - width) {
              setCurrentImage({ ...currentImage, x_offset: pallet_width - width })
            } else
            setCurrentImage({ ...currentImage, x_offset: x_offset + 1 })
          }
          break;
        case 40: // down
          event.preventDefault()
          if (y_offset < pallet_height - height) {
            if (y_offset >= (pallet_height - 1) - height) {
              setCurrentImage({ ...currentImage, y_offset: pallet_height - height })
            } else
            setCurrentImage({ ...currentImage, y_offset: y_offset - 1 })
          }
          break;
      }
    }
    if (art_file) {
      document.addEventListener('keydown', handleArrows);
    }
    else {
      return () => {
        document.removeEventListener('keydown', handleArrows);
      };
    }
  },[art_file])

  return (
    <>
      <div 
        className="flexbox radius5"
        style={{ 
          position: "relative", 
          bottom: pallet.offset[placement],
          outline: dragOutline ? `2px dotted ${dark ? "white": "black" }` : null, 
          width: pallet.width * 20, 
          height: pallet.height * 20, 
          zIndex: 40
        }}
      >
        <Rnd
          size={{ width: width, height: height }}
          position={{ x: x_offset, y: -(y_offset) }}
          onDragStop={(e, d) => {
            setCurrentImage({ ...currentImage, x_offset: d.x, y_offset: -(d.y) })
            setDragOutline(false)
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            setCurrentImage({
              ...currentImage,
              width: parseInt(ref.style.width, 10),
              height: parseInt(ref.style.height, 10),
              x_offset: position.x,
              y_offset: -(position.y)
            });
            setDragOutline(false)
          }}
          lockAspectRatio={true}
          bounds="parent"
          minWidth={20}
          enableResizing={{ top: false, bottom: false, left: false, right: false, topRight: true, topLeft: true, bottomRight: true, bottomLeft: true }}
          resizeHandleComponent={{
            topRight: <ResizeBox dark={dark}/>,
            topLeft: <ResizeBox dark={dark} />,
            bottomRight: <ResizeBox dark={dark}/>,
            bottomLeft: <ResizeBox dark={dark}/>
          }}
          onDragStart={() => {
            setDragOutline(true)
          }}
          onResizeStart={() => {
            setDragOutline(true)
          }}
          style={{
            outline: art_file ? `2px solid ${dark ? "white" : "black"}` : null,
          }}
        >
          <img
            ref={ref}
            draggable="false"
            src={URL.createObjectURL(art_file)}
            alt={art_file.name}
            className="full-width"
            onLoad={() => setLoaded(true)}
            style={{ display: !loaded ? "none" : null}}
          />
        </Rnd>
      </div>
    </>
  )
}

  export default CurrentImage