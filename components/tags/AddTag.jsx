import { Button, Select, FileInput } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { HiSelector } from "react-icons/hi"
import axios from "axios";
import { deleteObject } from "firebase/compat/storage";
import { uploadFirebase } from "../../lib/firebaseFunctions";
import { showError, showLoading, updateError, updateSuccess } from "../ui/alerts";
import { useUser } from '@auth0/nextjs-auth0/client'
import DeleteButton from "../ui/DeleteButton";

function AddTag({missingTags, toggleChange, close}) {

  const { user } = useUser()
  const ref = useRef(0)

  const [image, setImage] = useState(null)
  const [size, setSize] = useState(null)
  const [dimensions, setDimensions] = useState({})
  const [loaded, setLoaded] = useState(false)

  const small_pallet = size === "S" 

  useEffect(() => {
    if (image) {
      const width = ref.current.width
      const height = ref.current.height

      const width_ratio = ( (small_pallet ? 210 : 280) / width )
      const height_ratio = ( 210 / height)

      const ratio = width_ratio <= height_ratio ? width_ratio : height_ratio

      setDimensions({
        width: width * ratio, 
        height: height * ratio
      })
    }
  }, [loaded, size])

  async function submitTag() {
    if (!size) {
      showError("no_size", null, "No size selected!")
    } else 
    if (!image) {
      showError("no-tag", null, "No image!")
    } else {
    showLoading(size, null, `Uploading ${size} tag...`)
    try {
      const tag = await uploadFirebase(user, "tags", `${size}-Tag-${image.name}`, image)
      const { name, url } = tag
      const { width, height } = dimensions
      const design = {
        placement: "Neck",
        art_file: name,
        art_url: url,
        thumbnail_url: url,
        underbase: true,
        x_offset: 0,
        y_offset: 0,
        width: (width / 70).toFixed(1), 
        height: (height / 70).toFixed(1)
      }
      await postTag(design, tag.ref)
      updateSuccess(size, null, `Uploaded ${size} tag!`)
      close()
      toggleChange()
    }
    catch (err) {
      console.log(err)
      updateError(size, `Server error: post ${size} tag`, "Contact us!")
    }}
  }

  async function postTag(design, ref) {
    try {
      const post = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tags`, {
        size: size, 
        pallet: small_pallet ? "Small" : "Standard",
        design: design
      })
      return(post)
    }
    catch {
      deleteObject(ref)
    }
  }

  function clear() {
    setImage(null)
    setLoaded(false)
    setDimensions({})
  }

  return (
    <>
      <div className="flexbox-column full-width" style={{ maxWidth: 500, padding: 10, marginTop: 15 }} >
        <h1>Add Tag</h1>
        <h5 style={{ marginTop: 20}}>Select Size</h5>
        <Select
          value={size}
          onChange={(v) => setSize(v)}
          data={missingTags}
          style={{ width: 90}}
          icon={<HiSelector style={{ fill: "rgb(107, 116, 130)"}}/>}
          iconWidth={30}
        />
        <div className="flexbox-column">
          <h5 style={{ marginTop: 10}} >Image</h5>
          <div className="flexbox" style={{height: 40}}>
            { 
              image ?
              <DeleteButton onClick={() => clear()} /> :
              <FileInput
                placeholder="+"
                value={image}
                onChange={(e) => setImage(e)}
                accept="image/png,image/jpeg"
                aria-label={`Select file for neck tag`}>
              </FileInput>
            }
          </div>
        </div>
        <div className="flexbox-column full-width" style={{marginTop: 5}}>
          { small_pallet ? <div>3in x 3in</div> : <div>4in x 3in</div> }
            <div id="neck-preview" className="flexbox white-outline radius10" style={{ width: small_pallet ? 210 : 280 , height: 210}}>
              {
                image && 
                <img 
                  ref={ref} 
                  onLoad={() => setLoaded(true)}
                  src={URL.createObjectURL(image)} 
                  alt={image.name}
                  style={loaded ? { width: dimensions.width, height: dimensions.height} : { display: "none"} } 
                  draggable={false}/> 
                }
            </div>
          <Button className="orange-button margin-left" style={{ marginTop: 10}} onClick={() => submitTag()}>submit</Button>
        </div>
      </div>
    </>
  );
}

export default AddTag;