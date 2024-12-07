import { Button } from "@/components/ui/button";
import {
  AudioLines,
  PauseCircle,
  StopCircle,
  AlertCircle,
  ShieldOff,
} from "lucide-react";
import React, { useState, useRef } from "react";
import AlertModal from "@/components/ui/altermodal";
import axios from "axios";

const RecordAudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const mediaRecorderRef = useRef(null);
  const intervalRef = useRef(null);
  const audioStreamRef = useRef(null);
  const audioUrlRef = useRef(null);

  const startRecording = async () => {
    try {
      setAudioBlob(null);
      audioUrlRef.current = null;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      setError(null);
      setRecordingTime(0);

      intervalRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);

      mediaRecorder.ondataavailable = (event) => {
        setAudioBlob(event.data);
        audioUrlRef.current = URL.createObjectURL(event.data);
      };

      mediaRecorder.onerror = (err) => {
        console.error("Recording error:", err);
        setError("An error occurred while recording. Please try again.");
      };
    } catch (err) {
      console.error("Failed to start recording:", err);
      setError(
        "Microphone access denied. Please check your browser settings and allow microphone access."
      );
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && !isPaused) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    } else if (mediaRecorderRef.current && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      clearInterval(intervalRef.current);
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    }
  };

  const handleCloseModal = () => {
    setApiResponse(null);
  };

  const handleApiCall = async () => {
    if (!audioBlob) return;

    setIsUploading(true);

    try {
      const arrayBuffer = await audioBlob.arrayBuffer();

      // Decode the audio file similar to the reference component
      const audioContext = new AudioContext();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      const wavData = audioBufferToWav(audioBuffer);

      // Convert WAV data to base64
      const base64String = arrayBufferToBase64(wavData);

      // Call the API with Axios
      const response = await axios.post(
        `https://abdullahsajid-antispoofing-test.hf.space/api/voice?binary=false`,
        { base64: base64String }
      );

      setApiResponse(response.data);
    } catch (error) {
      setApiResponse(
        error.response?.data || {
          error: "An error occurred. Please try again.",
        }
      );
      console.error("API Error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const audioBufferToWav = (buffer) => {
    const numOfChannels = buffer.numberOfChannels;
    const length = buffer.length * numOfChannels * 2 + 44;
    const arrayBuffer = new ArrayBuffer(length);
    const view = new DataView(arrayBuffer);
    let offset = 0;

    writeString(view, offset, "RIFF");
    offset += 4;
    view.setUint32(offset, length - 8, true);
    offset += 4;
    writeString(view, offset, "WAVE");
    offset += 4;

    writeString(view, offset, "fmt ");
    offset += 4;
    view.setUint32(offset, 16, true);
    offset += 4;
    view.setUint16(offset, 1, true);
    offset += 2;
    view.setUint16(offset, numOfChannels, true);
    offset += 2;
    view.setUint32(offset, buffer.sampleRate, true);
    offset += 4;
    view.setUint32(offset, buffer.sampleRate * numOfChannels * 2, true);
    offset += 4;
    view.setUint16(offset, numOfChannels * 2, true);
    offset += 2;
    view.setUint16(offset, 16, true);
    offset += 2;

    writeString(view, offset, "data");
    offset += 4;
    view.setUint32(offset, length - offset - 4, true);
    offset += 4;

    for (let i = 0; i < buffer.length; i++) {
      for (let channel = 0; channel < numOfChannels; channel++) {
        const sample = buffer.getChannelData(channel)[i];
        const clamped = Math.max(-1, Math.min(1, sample));
        view.setInt16(
          offset,
          clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff,
          true
        );
        offset += 2;
      }
    }

    return arrayBuffer;
  };

  const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col p-3 gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Record Audio
        </h2>
        <p className="mt-2 text-muted-foreground sm:w-[400px]">
          Record audio and let our AI-powered system detect and analyze it for
          voice spoofing.
        </p>
      </div>
      <div className="flex items-center justify-center my-20">
        {!isRecording ? (
          <Button
            onClick={startRecording}
            className="flex items-center justify-center"
          >
            Record Audio
            <AudioLines className="w-6 h-6 ml-2" />
          </Button>
        ) : (
          <div className="flex gap-4">
            <Button
              onClick={pauseRecording}
              className="flex items-center justify-center"
            >
              {isPaused ? "Resume" : "Pause"}
              <PauseCircle className="w-6 h-6 ml-2" />
            </Button>
            <Button
              onClick={stopRecording}
              className="flex items-center justify-center"
            >
              Stop
              <StopCircle className="w-6 h-6 ml-2" />
            </Button>
          </div>
        )}
      </div>
      {isRecording && !isPaused && (
        <div className="text-center">
          <p className="text-xl">Recording Time: {formatTime(recordingTime)}</p>
        </div>
      )}
      {audioBlob && audioUrlRef.current && (
        <div className="flex items-center justify-center mt-4">
          <audio controls>
            <source src={audioUrlRef.current} type="audio/webm" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
      {audioBlob && (
        <div className="flex justify-center mt-4">
          <Button
            onClick={handleApiCall}
            className="flex items-center justify-center"
            disabled={isUploading}
          >
            Verify Spoofing
            {isUploading ? "..." : ""}
          </Button>
        </div>
      )}
      {apiResponse && (
        <AlertModal isOpen={!!apiResponse} onClose={handleCloseModal}>
          {apiResponse && apiResponse?.class && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-center">
                <span className="w-20 h-20 rounded-full bg-green-300/10 flex items-center justify-center">
                  <AudioLines className="w-12 h-12 text-green-500" />
                </span>
              </div>
              <div className=" p-6  space-y-4">
                <h4 className="text-lg font-semibold">
                  {apiResponse.class} Detected -{" "}
                  <span className="text-green-600">
                    {apiResponse.probs[apiResponse.class].toFixed(2)}%
                  </span>
                </h4>

                <div>
                  <h4 className="text-md font-bold">Classification Details:</h4>
                  <ul className="list-disc pl-5">
                    {Object.entries(apiResponse.probs).map(([key, value]) => (
                      <li key={key}>
                        {key}: {value.toFixed(2)}%
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {apiResponse && apiResponse?.error && (
            <div className="flex flex-col gap-4 items-center">
              <span className="w-20 h-20 rounded-full bg-red-300/10 flex items-center justify-center">
                <ShieldOff className="w-12 h-12 text-red-500" />
              </span>
              <div className=" p-6 ">
                <h4 className="text-red-600 font-semibold">
                  {apiResponse.error}
                </h4>
              </div>
            </div>
          )}
        </AlertModal>
      )}
      {error && (
        <div className="flex items-center justify-center mt-4 text-red-500">
          <AlertCircle className="w-6 h-6 mr-2" />
          {error}
        </div>
      )}
    </div>
  );
};

export default RecordAudio;
