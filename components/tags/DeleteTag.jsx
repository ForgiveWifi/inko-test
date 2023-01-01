import { useUser } from '@auth0/nextjs-auth0/client'
import axios from "axios";
import { showLoading, updateError, updateSuccess } from "../ui/alerts";
import { deleteFirebase } from "../../lib/firebaseFunctions"
import DeleteButton from "../ui/DeleteButton";
import TagDisplay from "./TagDisplay";
import HorzDivider from "../ui/HorzDivider";

function DeleteTag({modal, tag, setSelected, toggleChange}) {

  const { user } = useUser()

  async function deleteTag() {
    try {
      const { size, design } = tag
      showLoading(size, null, `Deleting ${size} tag...`)
      await deleteFirebase(user, "tags", design.art_file)
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tags/${size}`)
      setSelected(null)
      updateSuccess(size, null, `Deleted ${size} tag!`)
      toggleChange()
    }
    catch (err) {
      updateError(size, `Server error: delete ${size} tag`, "Contact Us!")
    }
  }
  if (!modal) {
    return null
  }
  return (
    <>
      <div className="flexbox-column">
        <h3 style={{ marginBottom: 10 }}>{`Delete ${tag.size} tag?`}</h3>
        <TagDisplay design={tag.design} /> 
        <HorzDivider margin="10px 0px"/>
        <div className="flexbox-row margin-left" style={{ gap: 5, marginTop: 5}}>
          <button onClick={() => setSelected(null)} style={{ padding: "2px 6px" }}>cancel</button>
          <DeleteButton onClick={() => deleteTag()} />
        </div>
      </div> 
    </>
  );
}

export default DeleteTag;