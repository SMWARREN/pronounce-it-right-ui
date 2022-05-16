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
import useFetch from "../hooks/useFetch";
import { Phoneme } from "../state/types/Phoneme";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import { PHONEME_BASE_URL } from "../state/shared/constants";

const Recorder = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [base64, setBase64] = useState<any>("");
  const [recordState, setRecordState] = useState(null);
  const {
    state: { data },
    dispatch,
    fetchData,
  } = useFetch<Phoneme>(`${PHONEME_BASE_URL}/pronounce-it-right/phonemes`, {
    method: "POST",
    body: JSON.stringify({
      payload: base64.replace("data:audio/wav;base64,", ""),
    }),
  });

  const onCloseFn = () => {
    dispatch({ type: "clear" });
    onClose();
  };
  const start = () => {
    setRecordState(RecordState.START);
  };

  const stop = () => {
    setRecordState(RecordState.STOP);
  };

  const onStop = async (audioData: any) => {
    const blob = await blobToBase64(audioData.blob);
    setBase64(blob);
  };

  const generatePhonemes = async () => {
    fetchData(true);
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
      <Modal isOpen={isOpen} onClose={onCloseFn}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Generate Phonemes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Box>
                <Center>{recordState}</Center>
              </Box>
              <HStack>
                <Box>
                  <Button onClick={start}>Start Recording</Button>
                </Box>
                <Box>
                  <Button colorScheme="red" onClick={stop}>
                    Stop Recording
                  </Button>
                </Box>
              </HStack>
              <AudioReactRecorder state={recordState} onStop={onStop} />
            </VStack>
            <Center> {data && <>Generated Phonemes: {data.phonemes}</>}</Center>
          </ModalBody>

          <ModalFooter>
            <Button
              disabled={!base64}
              colorScheme="green"
              mr={3}
              onClick={generatePhonemes}
            >
              Generate
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onCloseFn}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Recorder;
