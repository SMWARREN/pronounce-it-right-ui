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
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import useFetch from "../hooks/useFetch";
import { Phoneme } from "../state/types/Phoneme";

const Recorder = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [base64, setBase64] = useState<any>("");
  const {
    state: { data, error },
    fetchData,
  } = useFetch<Phoneme>(
    `https://wearegroot.eastus.cloudapp.azure.com:5000/pronounce-it-right/phonemes`,
    {
      method: "POST",
      body: JSON.stringify({
        payload: base64.replace("data:audio/wav;base64,", ""),
      }),
    }
  );
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: false });

  const generatePhonemes = async () => {
    if (mediaBlobUrl) {
      const blob = await fetch(mediaBlobUrl).then((r) => r.blob());
      const convertedBase64 = await blobToBase64(blob);
      setBase64(convertedBase64);
      console.log(convertedBase64);
      fetchData(true);
    }
  };
  const blobToBase64 = (blob: Blob) => {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  return (
    <>
      <Button colorScheme="green" onClick={onOpen}>
        Generate Phonemes
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Generate Phonemes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Box>
                <Center>{status}</Center>
              </Box>
              <HStack>
                <Box>
                  <Button
                    onClick={() => {
                      startRecording();
                    }}
                  >
                    Start Recording
                  </Button>
                </Box>
                <Box>
                  <Button colorScheme="red" onClick={stopRecording}>
                    Stop Recording
                  </Button>
                </Box>
              </HStack>
              <audio src={mediaBlobUrl} controls />
            </VStack>
            <Center> {data && <>Generated Phonemes: {data.phonemes}</>}</Center>
          </ModalBody>

          <ModalFooter>
            <Button
              disabled={!mediaBlobUrl}
              colorScheme="green"
              mr={3}
              onClick={generatePhonemes}
            >
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
