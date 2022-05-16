import React, { Component } from "react";
import { ResultReason } from "microsoft-cognitiveservices-speech-sdk";
import { Box, Container, Icon, VStack } from "@chakra-ui/react";
import { BsFillMicFill } from "react-icons/bs";
import { SUB_KEY } from "../state/shared/constants";
const speechsdk = require("microsoft-cognitiveservices-speech-sdk");

export default class SpeechToText extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      displayText: "INITIALIZED: ready to test speech...",
    };
  }

  async sttFromMic() {
    const sdk = require("microsoft-cognitiveservices-speech-sdk");
    const speechConfig = sdk.SpeechConfig.fromSubscription(SUB_KEY, "eastus");
    speechConfig.speechRecognitionLanguage = "en-US";

    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new speechsdk.SpeechRecognizer(
      speechConfig,
      audioConfig
    );

    this.setState({
      displayText: "speak into your microphone...",
    });

    recognizer.recognizeOnceAsync((result: any) => {
      let displayText;
      if (result.reason === ResultReason.RecognizedSpeech) {
        displayText = `${result.text}`;
      } else {
        displayText =
          "ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.";
      }

      this.setState({
        displayText: displayText,
      });
    });
  }

  render() {
    return (
      <Container className="app-container">
        <div className="row main-container">
          <VStack>
            <Box>
              <Icon as={BsFillMicFill} onClick={() => this.sttFromMic()} />
            </Box>
            <Box> Convert speech to text from your mic.</Box>
            <Box>
              <code>{this.state.displayText}</code>
            </Box>
          </VStack>
        </div>
      </Container>
    );
  }
}
