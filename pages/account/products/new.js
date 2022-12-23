import { useState } from "react"
import axios from "axios";
import { Button } from "@mantine/core";
import AttributesSelect from "../../../components/new-product/AttributesSelect";
import ProductDetails from "../../../components/new-product/ProductDetails";
import { showError, showLoading, updateSuccess, updateError } from '../../../components/ui/alerts'
import BackButton from "../../../components/ui/BackButton";
import ProductPreview from "../../../components/new-product/ProductPreview";
import AddIcon from '@mui/icons-material/Add';
import ConfirmModal from "../../../components/new-product/ConfirmModal.jsx";
import formatDesign from "../../../lib/formatDesign";
import html2canvas from "html2canvas";
import { useMediaQuery } from '@mantine/hooks';
import NoBox from "../../../components/ui/NoBox.jsx";
import { uploadFirebase } from "../../../lib/firebaseFunctions";

function NewProduct() {

  const mobile = useMediaQuery('(min-width: 890px)')

  const [currentImage, setCurrentImage] = useState({ placement: "front", width: 200, x_offset: 60, y_offset:0})
  const [sizes, setSizes] = useState([])
  const [attributes, setAttributes] = useState({style: "3001", color: { value: "White", hex: "white", light: true }})
  const [details, setDetails] = useState({name: "", description: ""})
  const [imageList, setImageList] = useState([])
  const [error, setError] = useState(false)
  // const [openConfirm, setOpenConfirm] = useState(false)
  
  const frontImages = imageList.filter((image) => image.placement === "front")
  const backImages = imageList.filter((image) => image.placement === "back")

  function openConfirmModal() {
    setError(true)
    if (!details.name) {
      showError("name-error", null, `No product name!`)
    } else
    if (!attributes.style) {
      showError("style-error", null, `No style selected!`)
    } else
    if (sizes.length === 0) {
      showError("size-error", null, `No size selected`)
    } else
    if (imageList.length === 0) {
      showError("design-error", null, `Add at least 1 design!`)
    } else 
    if (currentImage.image) {
      showError("image-error", null, `Place current image!`)
    } else
    // setOpenConfirm(true)
    submitProduct()
  }

  async function submitProduct() {
    try {
      const {previews, design_data} = await uploadAllFirebase()
      await postProduct(previews, design_data)
      setError(false)
      setSizes([])
      setAttributes({style: "3001", color: { value: "White", hex: "white", light: true }})
      setDetails({name: "", description: ""})
      setImageList([])
    }
    catch (err) {
    }
  }
  async function uploadAllFirebase() {
    try {
      showLoading("firebase", null, "Uploading images...")
      const previews = await uploadProductImages()
      const design_data = await uploadImageList(imageList)
      updateSuccess("firebase", null, "Uploaded images!")
      return({ previews, design_data })
    }
    catch (err) {
      updateError("firebase", "Server Error: firebase", "Contact us!")
    }
  }

  async function screenshot(id) {
    const canvas = await html2canvas(document.getElementById(id))
    const screenshot = await new Promise((resolve) => canvas.toBlob(async function(blob) {
      const image = new Image()
      image.src = blob
      const name = `${details.name}-${id}`
      const res = await uploadFirebase(id, name, image)
      resolve(res)
    })); 
    return(screenshot)
  }

  async function uploadProductImages() {
    const previews = []
    if (frontImages.length !== 0) {
      const front = await screenshot("front-preview")
      previews.push({
        position: "front",
        image: front
      })
    } 
    if (backImages.length !== 0) {
      const back = await screenshot("back-preview")
      previews.push({
        position: "back",
        image: back
      })
    }
    console.log("uploaded previews")
    return(previews)
  }

  async function uploadImageList() {
    const design_data = await Promise.all(imageList.map( design => uploadImage(design)))
    return (design_data)
  }

  async function uploadImage(design) {
    const art = await uploadFirebase("art", design.image.name, design.image)
    return({
      ...design,
      image: null,
      art_file: art.name,
      art_url: art.url,
      thumbnail_url: undefined // add 
    })
  }

  async function postProduct(previews, design_data) { 
    const {name, description} = details
    try {
      showLoading(name, "Uploading...", name)
      const formatted_design = design_data.map((design) => formatDesign(design))
      const product = {
        name: name, 
        description: description,
        sizes: sizes,
        images: previews,
        attributes: {
          ...attributes,
          color: attributes.color.value.toUpperCase()
        },
        designs: formatted_design 
      }
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/products`, product)
      updateSuccess(name, "Product has been uploaded!", name) 
    }
    catch (err) {
      updateError(name, "Problem uploading shirt.", "Contact us!") 
    }
  }

  return (
    <>
      {
        !mobile ? 
        <div style={{ marginTop: 30, padding: 20}}><NoBox text="Use a computer to create designs" /></div> :
        <div className="flexbox flex-wrap background3 full-width radius10" style={{ margin: "50px 0px 15px", padding: 20, alignItems: "flex-start", gap: 15}}>
          <div className="flexbox-column full-width radius15" style={{ maxWidth: "300px", padding: "5px 15px 15px"}}>
            <h2>New Product</h2>
            <ProductDetails details={details} setDetails={setDetails} error={error} />
            <AttributesSelect attributes={attributes} setAttributes={setAttributes} sizes={sizes} setSizes={setSizes} error={error}/>
          </div>
          <div className="flexbox-column">
            <ProductPreview frontImages={frontImages} backImages={backImages} color={attributes.color} currentImage={currentImage} setCurrentImage={setCurrentImage} imageList={imageList} setImageList={setImageList}/>
            <Button onClick={openConfirmModal} className="form-button" style={{ margin: "10px 3px 5px auto"}}  leftIcon={<AddIcon />} uppercase>submit</Button>
          </div>
          {/* <ConfirmModal openConfirm={openConfirm} close={() => setOpenConfirm(false)} details={details} attributes={attributes} sizes={sizes}/> */}
        </div>
      }
    </>
  );
}

export default NewProduct;