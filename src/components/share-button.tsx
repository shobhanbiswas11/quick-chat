import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

export default function ShareButton({ link }: { link: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <Button
        color="secondary"
        fullWidth
        className="mb-4 ring-0"
        onPress={onOpen}
      >
        Add People
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Share the Link
              </ModalHeader>
              <ModalBody>
                <Button
                  onPress={async () => {
                    await navigator.clipboard.writeText(link);
                  }}
                >
                  Copy
                </Button>
                <Button as="a" href={`whatsapp://send?text=${link}`}>
                  Share to Whatsapp
                </Button>
                <Button as="a" href={`fb-messenger://share/?link=${link}`}>
                  Share to Messenger
                </Button>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
