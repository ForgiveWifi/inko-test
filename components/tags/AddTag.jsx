import { Button, Select, FileInput } from "@mantine/core";
import { useState } from "react";
// import { ImageUpload } from "../new-product/ImageUpload";
import { HiSelector } from "react-icons/hi"
import axios from "axios";
import { deleteObject } from "firebase/storage";
import { uploadFirebase } from "../../lib/firebaseFunctions";
import { showError, showLoading, updateError, updateSuccess } from "../ui/alerts";

function AddTag({tags, missingTags, toggleChange, close}) {
  
  const [image, setImage] = useState(null)
  const [size, setSize] = useState(null)

  async function submitTag() {
    if (!size) {
      showError("no_size", null, "No size selected!")
    } else 
    if (!image) {
      showError("no-tag", null, "No image!")
    } else {
    showLoading("tag", null, "Uploading tag...")
    try {
      const tag = await uploadFirebase("tags", image.name, image)
      const design = {
        placement: "Neck",
        art_file: tag.name,
        art_url: tag.url,
        underbase: true,
        x_offset: 0,
        y_offset: 0,
        width: 14.0, // add width
        height: 17.0 // add height
      }
      await postTag(design, tag.ref)
      updateSuccess("tag", null, "Uploaded!")
      close()
      toggleChange()
      
    }
    catch (err) {
      updateError("tag", "Server error: firebase", "Contact us!")
    }}
  }

  async function postTag(design, ref) {
    try {
      const post = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tags`, {
        size: size, 
        design: design
      })
      return(post)
    }
    catch {
      deleteObject(ref)
    }
  }

  const small = size === "S"

  return (
    <>
      <div className="flexbox-column" style={{ padding: 20 }}>
        <h1>Add Tag</h1>
        <div className="label" style={{ marginTop: 20}}>Select Size</div>
        <Select
          value={size}
          onChange={(v) => setSize(v)}
          data={missingTags}
          style={{ width: 75}}
          icon={<HiSelector style={{ fill: "rgb(107, 116, 130)"}}/>}
          iconWidth={30}
        />
        <div className="flexbox-column">
          <div className="label">Image</div>
          <div className="flexbox" style={{height: 40}}>
            { 
              image ?
              <button onClick={() => setImage(null)} className="red-background flexbox-row" style={{ height: 30, borderRadius: 10, gap: 5}}>
                <div style={{ fontSize: 14}}>delete</div>
              </button> :
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
      {/* <ImageUpload /> */}
        
        
        {small ? <div>3in x 3in</div> : <div>4in x 3in</div> }
        <div id="neck-preview" className="flexbox full-width" style={{ position: "relative", gap:10 }}>
          <div className="white-border radius10" style={{ overflow: "hidden", width: small ? 240 : 320 , height: 240}}>
            {image && <img src={URL.createObjectURL(image)} className="full-width" draggable={false}/> }
          </div>
        </div>
        <Button className="margin-left" onClick={() => submitTag()}>submit</Button>
      </div>
    </>
  );
}

export default AddTag;