
import { useRef } from 'react';
import { Text, Group}  from '@mantine/core';
import { Modal } from "@mantine/core";
import { Dropzone } from '@mantine/dropzone';
import { cleanNotifications } from "@mantine/notifications";
import BackupIcon from '@mui/icons-material/Backup';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
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
    >
      <Dropzone
        name='File Upload'
        openRef={openRef}
        onDrop={(file) => {
          setCurrentImage({...currentImage, image: file[0]})
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
        <div style={{ pointerEvents: 'none' }}>
          <Group position="center">
            <Dropzone.Accept>
              <DownloadIcon style={{fontSize: "100px", fill: "rgb(88, 169, 255)"}}/>
            </Dropzone.Accept>
            <Dropzone.Reject>
              <CloseIcon style={{fontSize: "100px", fill: "rgb(255, 81, 81)"}}/>
            </Dropzone.Reject>
            <Dropzone.Idle>
              <BackupIcon style={{fontSize: "100px", fill: "rgb(107, 116, 130)"}}/>
            </Dropzone.Idle>
          </Group>

            <Dropzone.Accept>
              <h4 className="orange-text text-center">Drop Image</h4>
            </Dropzone.Accept>
            <Dropzone.Reject>
              <h4 className="orange-text text-center">Image file less than 10mb</h4>
            </Dropzone.Reject>
            <Dropzone.Idle>
              <h4 className="orange-text text-center">Upload Image</h4>
            </Dropzone.Idle>

          <Text align="center" size="sm" mt="xs" color="dimmed" style={{ marginBottom: "20px"}}>
            Select or drop. We reccomend .png and .jpeg @300dpi that
            are less than 10mb.  You must own rights to images.
          </Text>
        </div>
      </Dropzone>

      <div className="flexbox full-width">
        <button className="white-background max-radius" style={{ position: "absolute", bottom: "18px", padding: "8px 25px"}} onClick={() => openRef.current?.()}>
          <div>Select file</div>
        </button>
      </div>
    </Modal>
  );
}