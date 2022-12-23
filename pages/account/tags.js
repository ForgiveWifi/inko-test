import { withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import { Button, Modal } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import AddTag from "../../components/tags/AddTag";
import TagList from "../../components/tags/TagList";
import CloseButton from "../../components/ui/CloseButton";
import Loading from "../../components/ui/Loading";
import { showError } from "../../components/ui/alerts";
import AddIcon from '@mui/icons-material/Add';
import Heading from '../../components/ui/Heading';

function Tags() { 

  const [tags, setTags] = useState([])
  const [open, setOpen] = useState(false)
  const [change, setChange] = useState(false)
  const [loading, setLoading] = useState(false)

  const available_sizes = ["S", "M", "L", "XL"]
  const sizes = tags.map((tag) => tag.size)
  const missingTags = available_sizes.filter((size) => !sizes.includes(size))

  useEffect(() => {
    fetchTags()
    async function fetchTags() {
      try {
        setLoading(true)
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tags`)
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
        <TagList tags={tags} toggleChange={toggleChange}/>
        <Modal
          opened={open}
          closeOnClickOutside={false}
          withCloseButton={false} 
          size="auto" 
          centered 
          overlayBlur={3} 
          transitionDuration={300}
        >
          <CloseButton onClick={() => setOpen(false)}/>
          <AddTag tags={tags} missingTags={missingTags} toggleChange={toggleChange} close={() => setOpen(false)}/> 
        </Modal>
      </div>
    </>
  );
}

export default withPageAuthRequired(Tags)
