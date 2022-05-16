import React, { Component } from "react";
import { ResultReason } from "microsoft-cognitiveservices-speech-sdk";
import { Container, Icon } from "@chakra-ui/react";
import { BsFillMicFill } from "react-icons/bs";
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
    const speechConfig = sdk.SpeechConfig.fromSubscription(
      "fa51b3880f7f420186edf5028e01603c",
      "eastus"
    );
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
        displayText = `RECOGNIZED: Text=${result.text}`;
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
    const { displayText } = this.state;
    return (
      <Container className="app-container">
        <div className="row main-container">
          <div className="col-6">
            <Icon as={BsFillMicFill} onClick={() => this.sttFromMic()} />
            Convert speech to text from your mic.
          </div>
          <div className="col-6 output-display rounded">
            <code>{displayText}</code>
          </div>
        </div>
      </Container>
    );
  }
}
