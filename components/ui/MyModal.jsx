import { Modal } from "@mantine/core";

function MyModal({children, open}) {
  return (
    <Modal
      opened={open}
      closeOnClickOutside={false}
      withCloseButton={false} 
      onClose={() => null}
      size="auto" 
      centered 
      overlayBlur={3} 
      transitionDuration={300}
    >
      {children}
    </Modal>
  );
}

export default MyModal;