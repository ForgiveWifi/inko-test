import { useState } from "react"
import { useUser } from '@auth0/nextjs-auth0/client'
import axios from "axios";
import { Button } from "@mantine/core";
import { useMediaQuery } from '@mantine/hooks';
import formatDesign from "../../../lib/formatDesign";
import AttributesSelect from "../../../components/new-product/AttributesSelect";
import ProductDetails from "../../../components/new-product/ProductDetails";
import { showError, showLoading, updateSuccess, updateError } from '../../../components/ui/alerts'
import NoBox from "../../../components/ui/NoBox.jsx";
import ProductPreview from "../../../components/new-product/ProductPreview";
import AddIcon from '@mui/icons-material/Add';
// import ConfirmModal from "../../../components/new-product/ConfirmModal.jsx";
import { uploadFirebase, screenshot } from "../../../lib/firebaseFunctions";
import { deleteObject } from "firebase/storage";

function NewProduct() {

  const { user } = useUser()
  const mobile = useMediaQuery('(min-width: 670px)')

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
      const {previews, design_data, refs} = await uploadAllFirebase()
      await postProduct(previews, design_data, refs)
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
      const previews = await uploadPreviews()
      const { design_data, refs } = await uploadImages(previews)
      updateSuccess("firebase", null, "Uploaded images!")
      return({ previews, design_data, refs })
    }
    catch (err) {
      updateError("firebase", "Server Error: firebase", "Contact us!")
    }
  }
  async function uploadPreviews() {
    const previews = []
    if (frontImages.length !== 0) {
      const front = await screenshot(user, "front-preview", details.name)
      previews.push({
        ...front,
        position: "front",
      })
    } 
    if (backImages.length !== 0) {
      const back = await screenshot(user, "back-preview", details.name)
      previews.push({
        ...back,
        position: "back"
      })
    }
    return(previews)
  }

  async function uploadImages(previews) {
    const front = previews[0]
    const back = previews[1]
    const art_list = await Promise.all(imageList.map( design => uploadImage(design)))
    const refs = previews.map(preview => preview.ref).concat(art_list.map(art => art.ref))
    const design_data = art_list.map(art => art.design)
    return({design_data, refs})

    async function uploadImage(design) {
      const { art_file } = design
      const art = await uploadFirebase(user, "art", art_file.name, art_file)
      const { name, url, ref } = art
      return({
        design: {
          ...design,
          art_file: name,
          art_url: url,
          thumbnail_url: design.placement === "front" ? front : back,
        },
        ref: ref
      })
    }
  }

  

  async function postProduct(previews, design_data, refs) { 
    const {name, description} = details
    try {
      showLoading(name, "Uploading...", name)
      const formatted_design = design_data.map((design) => formatDesign(design))
      const product = {
        name: name, 
        description: description,
        sizes: sizes,
        images: previews.map(preview => preview.url),
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
      updateError(name, "Server Error: post new product", "Contact us!") 
      refs.map(ref=> deleteObject(ref))
    }
  }

  return (
    <>
      {
        !mobile ? 
        <div style={{ marginTop: 30, padding: 20}}><NoBox text="Use a computer to create designs" /></div> :
        <div className="flexbox flex-wrap full-width radius10" style={{ margin: "30px 0px 15px", alignItems: "flex-start", gap: 15}}>
          <div className="flexbox-column background3 full-width full-height radius15" style={{ maxWidth: "300px", padding: "5px 15px 15px"}}>
            <h2>New Product</h2>
            <ProductDetails details={details} setDetails={setDetails} error={error} />
            <AttributesSelect attributes={attributes} setAttributes={setAttributes} sizes={sizes} setSizes={setSizes} error={error}/>
          </div>
          <div className="flexbox-column">
            <ProductPreview frontImages={frontImages} backImages={backImages} color={attributes.color} currentImage={currentImage} setCurrentImage={setCurrentImage} imageList={imageList} setImageList={setImageList}/>
            <Button onClick={openConfirmModal} className="orange-button" style={{ margin: "10px 3px 5px auto"}} leftIcon={<AddIcon />} uppercase>submit</Button>
          </div>
          {/* <ConfirmModal openConfirm={openConfirm} close={() => setOpenConfirm(false)} details={details} attributes={attributes} sizes={sizes}/> */}
        </div>
      }
    </>
  );
}

export default NewProduct;