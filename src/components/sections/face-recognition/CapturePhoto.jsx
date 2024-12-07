"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import Webcam from "react-webcam";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import AlertModal from "@/components/ui/altermodal"; // Assuming AlertModal is a reusable modal component
import { space } from "postcss/lib/list";

const CapturePhoto = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [model, setModel] = useState("transformer"); // State for model selection
  const [binary, setBinary] = useState(false); // State for binary toggle

  const handleCapture = (screenshot) => {
    setCapturedPhoto(screenshot);
    setIsCameraOn(false); // Turn off the camera after capturing the photo
  };

  const handleApiCall = async () => {
    if (!capturedPhoto) return; // Ensure a photo is captured before calling the API

    setIsUploading(true);

    try {
      // Call the API with axios
      const response = await axios.post(
        "https://abdullahsajid-antispoofing-test.hf.space/api/face",
        { base64: capturedPhoto.split(",")[1] },
        {
          params: {
            model: model,
            binary: binary,
          },
        } // Send only the base64 data
      );
      setApiResponse(response.data); // Store the API response
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

  const handleCloseModal = () => {
    setApiResponse(null);
  };

  const videoConstraints = {
    width: 600,
    height: 400,
    facingMode: "user",
  };

  return (
    <div className="flex flex-col p-3 gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Capture Photo
        </h2>
        <p className="mt-2 text-muted-foreground sm:w-[400px]">
          Take a photo or capture one with our AI-powered camera to verify face
          spoofing.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <label className="font-semibold">Select Model:</label>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="border rounded-lg p-2"
        >
          <option value="convnext">ConvNext</option>
          <option value="transformer">Transformer</option>
        </select>
      </div>

      {/* Binary Toggle */}
      <div className="flex items-center gap-4">
        <label className="font-semibold">Binary Mode:</label>
        <Switch
          checked={binary}
          onCheckedChange={(checked) => setBinary(checked)}
          className="bg-[#007BFF]"
        />
      </div>

      {/* Display Camera or Captured Photo */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 my-20">
        {isCameraOn ? (
          <Webcam
            audio={false}
            height={400}
            screenshotFormat="image/jpeg"
            width={600}
            videoConstraints={videoConstraints}
          >
            {({ getScreenshot }) => (
              <div className="flex w-full md:w-min  md:flex-col gap-3 items-center">
                <button
                  className="bg-[#16A34A] flex-1 text-white md:w-[100px] py-2 rounded-md"
                  onClick={() => handleCapture(getScreenshot())}
                >
                  Capture
                </button>
                <Button
                  variant="outline"
                  className="flex-1 md:w-[100px] py-2 rounded-md"
                  onClick={() => setIsCameraOn(false)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </Webcam>
        ) : capturedPhoto ? (
          <div className="flex flex-col items-center">
            <img
              src={capturedPhoto}
              alt="Captured"
              className="w-full object-contain rounded-lg"
            />
            <div className="flex items-center gap-4 w-full">
              <button
                className="bg-[#16A34A] flex-1 text-white p-2 rounded-md mt-4"
                onClick={() => {
                  setCapturedPhoto(null); // Clear the captured photo
                  setIsCameraOn(true); // Turn the camera back on for retake
                }}
              >
                Retake Photo
              </button>
              <button
                className="bg-[#16A34A] flex-1 text-white p-2 rounded-md mt-4"
                onClick={handleApiCall}
                disabled={isUploading}
              >
                {isUploading
                  ? "Verifying Authenticity..."
                  : "Run Anti-Spoof Check"}
              </button>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => setIsCameraOn(true)}
            className="flex items-center justify-center"
          >
            Capture Photo
            <Camera className="w-6 h-6 ml-2" />
          </Button>
        )}
      </div>

      {apiResponse && (
        <AlertModal isOpen={!!apiResponse} onClose={handleCloseModal}>
          {apiResponse && apiResponse?.class && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4>
                {apiResponse.class} Detected{" "}
                {apiResponse.probs[apiResponse.class].toFixed(2)}%
              </h4>
              <h4>Model Details:</h4>
              <p>Mode: {apiResponse.mode}</p>
              <p>Model: {apiResponse.model}</p>
              <h4>Classification Details:</h4>
              {Object.entries(apiResponse.probs).map(([key, value]) => (
                <p key={key}>
                  {key}: {value.toFixed(2)}%
                </p>
              ))}
            </div>
          )}
          {apiResponse && apiResponse?.error && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4>{apiResponse.error}</h4>
            </div>
          )}
        </AlertModal>
      )}
    </div>
  );
};

export default CapturePhoto;
