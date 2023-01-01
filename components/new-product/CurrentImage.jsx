import { useEffect, useRef, useState } from "react"
import { Rnd } from "react-rnd"
import ResizeBox from "./ResizeBox"


function CurrentImage({ currentImage, setCurrentImage, light }) {

  const front = currentImage.placement === "front"
  
  const [dragOutline, setDragOutline] = useState(false)
  const {art_file, width, height, x_offset, y_offset } = currentImage
  const [loaded, setLoaded] = useState(false)
  const ref = useRef(0)

  useEffect(() => {
    const h = ref.current.height
    const w = Math.round(currentImage.width * (395 / h))

    if (h > 395) {
      setCurrentImage({ ...currentImage, width: w, height: 395, x_offset: (320 - w ) / 2 })
    } else {
      setCurrentImage({ ...currentImage, height: h })
    }
  }, [loaded])

  // document.onkeydown = (e) => {
  //   if (currentImage.image) {
  //     e.preventDefault()
  //   switch (e.keyCode) {
  //     case 37:
  //       if (x_offset > 0) {
  //         if (x_offset <= 1) {
  //           setCurrentImage({ ...currentImage, x_offset: 0 })
  //         } else
  //         setCurrentImage({ ...currentImage, x_offset: x_offset - 1 })
  //       }
  //       break;
  //     case 38:
  //       if (y_offset > 0) {
  //         if (y_offset <= 1) {
  //           setCurrentImage({ ...currentImage, y_offset: 0 })
  //         } else
  //         setCurrentImage({ ...currentImage, y_offset: y_offset + 1 })
  //       }
  //       break;
  //     case 39:
  //       if (x_offset < 320 - width ) {
  //         if (x_offset >= 319 - width) {
  //           setCurrentImage({ ...currentImage, x_offset: 320 - width })
  //         } else
  //         setCurrentImage({ ...currentImage, x_offset: x_offset + 1 })
  //       }
  //       break;
  //     case 40:
  //       if (y_offset < 395 - height) {
  //         if (y_offset >= 394 - height) {
  //           setCurrentImage({ ...currentImage, y_offset: 395 - height })
  //         } else
  //         setCurrentImage({ ...currentImage, y_offset: y_offset - 1 })
  //       }
  //       break;
  //   }
  //   }
  // }
  

  return (
    <>
      <div 
        className="flexbox radius5"
        style={{ 
          position: "relative", 
          bottom: front ? 12 : 38,
          outline: dragOutline ? `1px dotted ${light ? "black" : "white"}` : null, 
          width: 320, 
          height: 395, 
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
            topRight: <ResizeBox light={light}/>,
            topLeft: <ResizeBox light={light} />,
            bottomRight: <ResizeBox light={light}/>,
            bottomLeft: <ResizeBox light={light}/>
          }}
          onDragStart={() => {
            setDragOutline(true)
          }}
          onResizeStart={() => {
            setDragOutline(true)
          }}
          style={{
            outline: art_file ? `1px solid ${light ? "black" : "white"}` : null,
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