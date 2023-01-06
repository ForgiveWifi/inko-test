
import { useRef } from 'react';
import { Text, Group}  from '@mantine/core';
import { Modal } from "@mantine/core";
import { Dropzone } from '@mantine/dropzone';
import { cleanNotifications } from "@mantine/notifications";
import BackupIcon from '@mui/icons-material/Backup';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import { showError } from '../ui/alerts';


export function ImageUpload({currentImage, setCurrentImage, open, close}) {

  const openRef = useRef(null);

  return (
    <Modal
      opened={open}
      onClose={close}
      overflow="outside"
      withCloseButton={false}
      radius={15}
      centered
      overlayBlur={3} 
      transitionDuration={300}
    >
      <Dropzone
        name='File Upload'
        openRef={openRef}
        onDrop={(file) => {
          setCurrentImage({...currentImage, art_file: file[0]})
          cleanNotifications()
          close()
        }}
        onReject={(file) => showError("file-error", `File is too large or not a png / jpeg`)}
        radius="md"
        accept={['image/png', 'image/jpeg']}
        maxFiles={1}
        maxSize={10 * 1024 ** 2}
        style={{ marginBottom: "20px"}}
      >
        <div style={{ pointerEvents: 'none', padding: 15 }}>
          <Group position="center">
            <Dropzone.Accept>
              <DownloadIcon style={{fontSize: "80px", fill: "rgb(88, 169, 255)"}}/>
            </Dropzone.Accept>
            <Dropzone.Reject>
              <CloseIcon style={{fontSize: "80px", fill: "rgb(255, 81, 81)"}}/>
            </Dropzone.Reject>
            <Dropzone.Idle>
              <WallpaperIcon style={{fontSize: "80px", fill: "rgb(107, 116, 130)"}}/>
            </Dropzone.Idle>
          </Group>

            <Dropzone.Accept>
              <h3 className="grey-text text-center" style={{ marginTop: 15}}>Drop Image</h3>
            </Dropzone.Accept>
            <Dropzone.Reject>
              <h3 className="grey-text text-center" style={{ marginTop: 15}}>Image file less than 10mb</h3>
            </Dropzone.Reject>
            <Dropzone.Idle>
              <h3 className="grey-text text-center" style={{ marginTop: 15}}>Upload Image</h3>
            </Dropzone.Idle>

          <div className='flexbox-column' style={{ margin: "10px 0px 10"}}>
          <div className='text-center light-grey-text' style={{ fontSize: 16, fontWeight: 500 }}>
             We reccomend .png and .jpeg @300dpi.  You must own rights to images.
          </div>
          </div>
        </div>
      </Dropzone>

      <div className="flexbox full-width">
        <button className="max-radius" style={{ backgroundColor: "rgb(107, 116, 130)", position: "absolute", bottom: "18px", padding: "8px 25px"}} onClick={() => openRef.current?.()}>
          <div>Select file</div>
        </button>
      </div>
    </Modal>
  );
}