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
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Phoneme } from "../state/types/Phoneme";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import { PHONEME_BASE_URL } from "../state/shared/constants";

const Recorder = ({ updateData }: { updateData: (_val: string) => void }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [base64, setBase64] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [recordState, setRecordState] = useState(null);
  const {
    state: { data, error },
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
    setLoading(true);
    fetchData(true);
  };

  const blobToBase64 = (blob: Blob) => {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  useEffect(() => {
    if (data?.phonemes && !error) {
      updateData(data?.phonemes);
      setLoading(false);
    }
  }, [data?.phonemes, updateData, error]);

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
              disabled={!base64 || loading}
              colorScheme="green"
              mr={3}
              onClick={generatePhonemes}
            >
              {!loading ? "Generate" : "Loading"}
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
