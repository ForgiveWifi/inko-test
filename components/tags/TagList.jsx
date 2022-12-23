import { Modal } from "@mantine/core";
import NoBox from "../ui/NoBox";
import TagCard from "./TagCard";
import { useState } from "react";
import axios from "axios";
import { showLoading, updateError, updateSuccess } from "../ui/alerts";
import { deleteFirebase } from "../../lib/firebaseFunctions"
import DesignBox from "../products/DesignBox";

function TagList({tags, toggleChange}) {

  const [modal, setModal] = useState(false)
  const [tag, setTag] = useState(null)

  async function deleteTag(tag) {
    try {
      const { size, design } = tag
      showLoading("delete-tag", null, "Deleting tag...")
      await deleteFirebase("tags", design.art_file)
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tags/${size}`)
      setModal(false)
      updateSuccess("delete-tag", null, "Deleted tag!")
      toggleChange()
    }
    catch (err) {
      updateError("delete-tag", "Server error: delete tag", "Contact Us!")
    }
  }

  function deleteSize(tag) {
    setModal(true)
    setTag(tag)
  }

  if (!tags) {
    return null
  }
  if (tags.length === 0) {
    return <NoBox text="No tags"/>
  }
  return (
    <>
      <div className="full-width" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginTop: 15}}>
        {
          tags.map((tag,i) => {
            return(
              <TagCard key={i} tag={tag} toggleChange={toggleChange} deleteSize={deleteSize}/>
            )
          })
        }
        { 
          tags.length < 3 ?
          Array(3 - tags.length).fill(0).map((_, i) => {
            return <div key={i}></div>
          }) :
          null
        }
      </div>
      <Modal 
        opened={modal} 
        centered 
        size="sm"
        closeOnClickOutside={false}
        withCloseButton={false}
        exitTransitionDuration={800}>
        <div className="flexbox-column">
          <div>Delete this tag?</div>
          {
            tag && 
            <div style={{padding: "15px 0px"}}>
            <DesignBox design={tag.design} />
            </div>
            
          }
          <div className="flexbox-row margin-left" style={{ gap: 5}}>
            <button onClick={() => setModal(false)}>cancel</button>
            <button className="red-background radius5" onClick={() => deleteTag(tag)}>delete</button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default TagList;