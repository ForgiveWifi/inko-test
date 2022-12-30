import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { Button } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import AddTag from "../../components/tags/AddTag";
import TagList from "../../components/tags/TagList";
import CloseButton from "../../components/ui/CloseButton";
import Loading from "../../components/ui/Loading";
import { showError } from "../../components/ui/alerts";
import AddIcon from '@mui/icons-material/Add';
import Heading from '../../components/ui/Heading';
import DeleteTag from '../../components/tags/DeleteTag';
import MyModal from '../../components/ui/MyModal';

function Tags() { 

  const [tags, setTags] = useState(null)
  const [selected, setSelected] = useState(null)
  const [open, setOpen] = useState(false)
  const [change, setChange] = useState(false)
  const [loading, setLoading] = useState(false)

  const available_sizes = ["S", "M", "L", "XL"]
  const sizes = tags?.map((tag) => tag.size)
  const missingTags = available_sizes.filter((size) => !sizes?.includes(size))
  const modal = selected !== null

  useEffect(() => {
    fetchTags()
    async function fetchTags() {
      try {
        setLoading(true)
        const res = await axios.get(`${process.env.API_URL}/tags`)
        setTags(res.data.tags)
        setLoading(false)
      }
      catch (err) {
        showError("server-error", `Server error - tags`, "Contact Us!")
      }
    }
  }, [change])

  function toggleChange() {
    setChange(!change)
  }

  return (
    <>
      {loading && <Loading />}
      <div className='flexbox-column full-width'>
        <Heading text="Neck Tags" />
        <div className='full-width'>
          { missingTags.length !== 0 ? <Button onClick={() => setOpen(true)} leftIcon={<AddIcon/>} uppercase>add tag</Button> : null}
        </div>
        <TagList tags={tags} toggleChange={toggleChange} setSelected={setSelected}/>
        <MyModal open={open}>
          <CloseButton onClick={() => setOpen(false)}/>
          <AddTag missingTags={missingTags} toggleChange={toggleChange} close={() => setOpen(false)}/> 
        </MyModal>
        <MyModal open={modal}>
          <DeleteTag modal={modal} tag={tags ? tags[selected] : null} setSelected={setSelected} toggleChange={toggleChange}/>
        </MyModal>
      </div>
    </>
  );
}

export default withPageAuthRequired(Tags)
