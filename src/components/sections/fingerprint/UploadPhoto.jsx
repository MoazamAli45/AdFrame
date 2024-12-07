"use client";

import React, { useState } from "react";
import Dropzone from "react-dropzone";
import {
  Fingerprint,
  Image,
  Loader2,
  MousePointerSquareDashed,
  ShieldOff,
} from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Switch } from "@/components/ui/switch"; // Import the Switch component
import AlertModal from "@/components/ui/altermodal";

const UploadPhoto = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [binary, setBinary] = useState(false); // State for binary toggle
  const [apiResponse, setApiResponse] = useState(null); // State for API response

  const onDropRejected = (rejectedFiles) => {
    const [file] = rejectedFiles;
    setIsDragOver(false);
    console.log(file);
  };

  const onDropAccepted = (acceptedFiles) => {
    const newFile = acceptedFiles[0];
    setFile(newFile);
    setIsDragOver(false);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onDropAccepted(Array.from(files));
    }
  };

  const handleApiCall = async () => {
    if (!file) return; // Ensure a file is uploaded before calling the API

    setIsUploading(true);

    // Convert the image to base64 format
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result.split(",")[1]; // Remove the data URL prefix

      try {
        // Call the API with axios
        const response = await axios.post(
          "https://abdullahsajid-antispoofing-test.hf.space/api/fingerprint",
          { base64: base64String },
          {
            params: {
              binary: binary, // Add the binary parameter
            },
          }
        );
        setApiResponse(response.data); // Store the successful API response
      } catch (error) {
        // Store the error response or message
        setApiResponse(
          error.response?.data || {
            error: "An error occurred. Please try again.",
          }
        );
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(file); // Read the file as a data URL
  };

  const handleCloseModal = () => {
    setApiResponse(null);
  };

  return (
    <div className="flex flex-col p-3 gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Upload a Photo
        </h2>
        <p className="mt-2 text-muted-foreground sm:w-[400px]">
          Upload a photo and let our AI-powered camera detect objects.
        </p>
      </div>

      {/* Binary Toggle */}
      <div className="flex items-center gap-4">
        <label className="font-semibold">Binary Mode:</label>
        <Switch
          checked={binary}
          onCheckedChange={(checked) => setBinary(checked)} // Toggle binary mode
          className="bg-[#007BFF]"
        />
      </div>

      <div
        className={cn(
          "relative h-full flex-1 my-16 w-full self-center sm:w-[80%] lg:w-[50%]  rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center",
          {
            "ring-blue-900/25 bg-blue-900/10": isDragOver,
          }
        )}
      >
        <div className="relative flex flex-1 flex-col items-center justify-center w-full py-5">
          {/* Dropzone */}
          <Dropzone
            onDragEnter={() => setIsDragOver(true)}
            onDragLeave={() => setIsDragOver(false)}
            onDropRejected={onDropRejected}
            onDropAccepted={onDropAccepted}
            accept={{
              "image/png": [".png"],
              "image/jpeg": [".jpeg"],
              "image/jpg": [".jpg"],
              "image/bmp": [".bmp"],
              "image/BMP": [".BMP"],
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                className="h-full w-full flex-1 flex flex-col items-center justify-center"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                {isDragOver ? (
                  <MousePointerSquareDashed className="h-6 w-6 text-zinc-500 mb-2" />
                ) : isUploading ? (
                  <Loader2 className="animate-spin h-6 w-6 text-zinc-500 mb-2" />
                ) : file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Uploaded"
                    className="w-[250px] h-[250px]  object-contain rounded-lg"
                  />
                ) : (
                  <Image className="h-6 w-6 text-zinc-500 mb-2" />
                )}
                <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                  {isUploading ? (
                    <div className="flex flex-col items-center">
                      <p>Uploading...</p>
                    </div>
                  ) : isDragOver ? (
                    <p>
                      <span className="font-semibold">Drop file</span> to upload
                    </p>
                  ) : (
                    <p>
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                  )}
                </div>

                <p className="text-xs text-zinc-500">PNG, JPG, JPEG, BMP</p>
              </div>
            )}
          </Dropzone>
        </div>
      </div>

      <div className="flex w-full sm:w-[80%] lg:w-[50%]  self-center mt-[-60px] ">
        <button
          onClick={handleApiCall}
          disabled={!file || isUploading} // Disable button if no file is uploaded or uploading
          className={cn("px-4 py-2 w-full bg-[#16A34A] text-white rounded-lg", {
            "opacity-50 cursor-not-allowed": !file || isUploading,
          })}
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
                  <Fingerprint className="w-12 h-12 text-green-500" />
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

export default UploadPhoto;
