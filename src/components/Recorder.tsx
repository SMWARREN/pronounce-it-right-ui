import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useReactMediaRecorder } from "react-media-recorder";

const Recorder = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: false });

  return (
    <>
      <Button colorScheme="green" onClick={onOpen}>
        Generate Phoneme
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Generate Phoneme</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <HStack>
                <Box>
                  <Button colorScheme="green" onClick={startRecording}>
                    Stop Recording
                  </Button>
                </Box>
                <Box>
                  <Button colorScheme="red" onClick={stopRecording}>
                    Stop Recording
                  </Button>
                </Box>
              </HStack>
              <audio src={mediaBlobUrl} controls autoPlay loop />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Generate
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Recorder;
