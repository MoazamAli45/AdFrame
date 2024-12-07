import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import {
  AudioLines,
  FileMusic,
  MousePointerSquareDashed,
  ShieldOff,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import AlertModal from "@/components/ui/altermodal";

const UploadAudio = () => {
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [binary, setBinary] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState(""); // State for error message

  const onDropRejected = (rejectedFiles) => {
    const [file] = rejectedFiles;
    setIsDragOver(false);
    setFile(null);
    setError(
      "Invalid file format. Only [.mp3, .wav, .flac] files are accepted."
    ); // Set error message
    console.log(file);
  };

  const onDropAccepted = (acceptedFiles) => {
    const newFile = acceptedFiles[0];
    if (
      newFile.name.endsWith(".mp3") ||
      newFile.name.endsWith(".wav") ||
      newFile.name.endsWith(".m4a") ||
      newFile.name.endsWith(".ogg") ||
      newFile.name.endsWith(".flac")
    ) {
      setFile(newFile);
      setIsDragOver(false);
      setError(""); // Clear error message
    } else {
      setError(
        "Invalid file format. Only [.mp3, .wav, .flac .m4a .ogg] files are accepted."
      ); // Set error message for unsupported file
    }
  };

  const handleApiCall = async () => {
    if (!file) return; // Ensure a file is uploaded before calling the API

    setIsUploading(true);

    try {
      const arrayBuffer = await file.arrayBuffer();

      // Decode the audio file
      const audioContext = new AudioContext();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      // Calculate the start and end time for the 10-second mid part
      const duration = audioBuffer.duration;
      const midTime = duration / 2;
      const startTime = Math.max(midTime - 5, 0);
      const endTime = Math.min(midTime + 5, duration);

      // Create a new buffer for the trimmed part
      const trimmedBuffer = audioContext.createBuffer(
        audioBuffer.numberOfChannels,
        (endTime - startTime) * audioBuffer.sampleRate,
        audioBuffer.sampleRate
      );

      for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
        const trimmedChannelData = trimmedBuffer.getChannelData(channel);
        audioBuffer.copyFromChannel(
          trimmedChannelData,
          channel,
          startTime * audioBuffer.sampleRate
        );
      }

      const wavData = audioBufferToWav(trimmedBuffer);

      // Convert WAV data to base64
      const base64String = arrayBufferToBase64(wavData);

      // Call the API with Axios
      const response = await axios.post(
        `https://abdullahsajid-antispoofing-test.hf.space/api/voice?binary=${binary}`,
        { base64: base64String }
      );

      // Set the API response in state
      setApiResponse(response.data);
    } catch (error) {
      // Handle error response
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

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const formatFileSize = (size) => {
    return (size / (1024 * 1024)).toFixed(2); // Convert bytes to MB and format to 2 decimal places
  };

  const handleCloseModal = () => {
    setApiResponse(null);
  };

  return (
    <div className="flex flex-col p-3 gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Upload an Audio
        </h2>
        <p className="mt-2 text-muted-foreground sm:w-[400px]">
          Upload an audio file and let our AI-powered system analyze it for
          voice spoofing.
        </p>
      </div>
      {/* 
      <div className="flex items-center gap-2">
        <label className="font-semibold">Binary Mode:</label>
        <Switch
          checked={binary}
          onCheckedChange={(checked) => setBinary(checked)}
          className="bg-[#007BFF]"
        />
      </div> */}

      <div
        className={cn(
          "relative h-full flex-1 my-16 w-full self-center sm:w-[80%] lg:w-[50%]  rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center",
          {
            "ring-blue-900/25 bg-blue-900/10": isDragOver,
          }
        )}
      >
        <div className="relative flex flex-1 flex-col items-center justify-center w-full py-20">
          <Dropzone
            onDragEnter={() => setIsDragOver(true)}
            onDragLeave={() => setIsDragOver(false)}
            onDropRejected={onDropRejected}
            onDropAccepted={onDropAccepted}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                className="h-full w-full flex-1 flex flex-col items-center justify-center"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                {isDragOver ? (
                  <MousePointerSquareDashed className="h-6 w-6 text-zinc-500 mb-2" />
                ) : file ? (
                  <div className="h-6 w-6 text-zinc-500 mb-2">
                    <FileMusic />
                  </div>
                ) : (
                  <div className="h-6 w-6 text-zinc-500 mb-2">
                    <FileMusic />
                  </div>
                )}
                <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                  {isDragOver ? (
                    <p>
                      <span className="font-semibold">Drop file</span> to upload
                    </p>
                  ) : (
                    <div className="flex flex-col gap-2 items-center ">
                      <p>
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      {file && !error && (
                        <div className="mt-2 text-center text-sm text-zinc-700">
                          <p className="font-semibold">{file.name}</p>
                          <p>{formatFileSize(file.size)} MB</p>
                        </div>
                      )}
                      {error && (
                        <p className="mt-2  text-red-600 text-sm">{error}</p>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-xs text-zinc-500">Audio</p>
              </div>
            )}
          </Dropzone>
        </div>
      </div>

      <div className="flex  w-full sm:w-[80%] lg:w-[50%]  self-center">
        <button
          onClick={handleApiCall}
          disabled={!file || isUploading} // Disable button if no file is uploaded or uploading
          className={cn(
            "px-4 w-full h-[40px]  mt-[-60px] bg-[#16A34A] text-white rounded-lg",
            {
              "opacity-50 cursor-not-allowed": !file || isUploading,
            }
          )}
        >
          {isUploading ? "Verifying Authenticity..." : "Run Anti-Spoof Check"}
        </button>
      </div>

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
    </div>
  );
};

export default UploadAudio;
