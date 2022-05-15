import { Box, Button, HStack, VStack } from "@chakra-ui/react";
import { useReactMediaRecorder } from "react-media-recorder";

const Recorder = () => {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ video: false });

  return (
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
  );
};

export default Recorder;
