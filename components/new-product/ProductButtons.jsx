import { motion } from "framer-motion"
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { ImageUpload } from "./ImageUpload";


function ProductButtons({currentImage, setCurrentImage, imageList, setImageList}) {

  const [uploadModal, setUploadModal] = useState(false)
  
  const { image, placement } = currentImage

  function addImage() {
    setImageList([...imageList, currentImage])
    setCurrentImage({ placement: placement, width: 200, x_offset: 60, y_offset:0})
  }

  return (
    <>
      <div className="flexbox-row" style={{ position: "absolute", top: "10px", left: "10px", gap: "8px", zIndex: 30 }}>
        <button onClick={image ? () => setCurrentImage({ placement: placement, width: 200, x_offset: 60, y_offset: 0}) : () => setUploadModal(true) } className="form-button flexbox max-radius" style={{  width: "60px", height: "60px"}}>
          <motion.div animate={{ rotate: uploadModal || image ? 45 : 0}} className="flexbox">
            <AddIcon sx={{ fontSize: "45px" }}/>
          </motion.div>
        </button>
        {
          image && 
          <button onClick={addImage} className="confirm-button max-radius flexbox" style={{ width: "60px", height: "60px"}}>
            <DoneOutlineIcon />
          </button>
        }
      </div>
      <ImageUpload currentImage={currentImage} setCurrentImage={setCurrentImage} open={uploadModal} close={() => setUploadModal(false)} />
    </>
  );
}

export default ProductButtons;