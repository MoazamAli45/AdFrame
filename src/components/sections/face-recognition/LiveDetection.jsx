import React, { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import axios from "axios";
import { Switch } from "@/components/ui/switch";
import Webcam from "react-webcam";
import throttle from "lodash/throttle";

const LiveDetection = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [response, setResponse] = useState(null);
  const webcamRef = useRef(null);
  const [intervalId, setIntervalId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false); // State for processing status
  const [model, setModel] = useState("transformer"); // State for model selection
  const [binary, setBinary] = useState(false); // State for binary toggle
  const [abortController, setAbortController] = useState(null); // State for abort controller

  const videoConstraints = {
    width: 600,
    height: 400,
    facingMode: "user",
  };

  const captureFrame = useCallback(
    throttle(() => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        handleUpload(imageSrc);
      }
    }, 2000), // Throttle interval in milliseconds
    [model, binary]
  );

  const startCapture = () => {
    const id = setInterval(captureFrame, 1000); // Capture every second
    setIntervalId(id);
  };

  const stopCapture = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleUpload = async (imageSrc) => {
    if (!imageSrc) return;

    const base64Data = imageSrc.split(",")[1];
    setIsProcessing(true);

    // Cancel any ongoing request
    if (abortController) {
      abortController.abort();
    }

    const controller = new AbortController();
    setAbortController(controller);

    try {
      const response = await axios.post(
        "https://abdullahsajid-antispoofing-test.hf.space/api/face",
        { base64: base64Data },
        {
          params: {
            model: model,
            binary: binary,
          },
          signal: controller.signal,
        }
      );
      // Ensure that the response matches the currently selected model
      if (response.data?.model === model) {
        setResponse(response.data);
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        setResponse(
          error.response?.data || {
            error: "An error occurred. Please try again.",
          }
        );
      }
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (isCameraOn) {
      startCapture();
    } else {
      stopCapture();
    }

    return () => {
      stopCapture();
      if (abortController) {
        abortController.abort();
      }
    };
  }, [isCameraOn]);

  useEffect(() => {
    // Cancel any ongoing request when model or binary changes
    if (abortController) {
      abortController.abort();
    }

    // Clear response state to avoid showing outdated results
    setResponse(null);

    // Stop the camera when model or binary changes to reset the capturing process
    setIsCameraOn(false);

    // Cleanup on unmount
    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [model, binary]);

  return (
    <div className="flex flex-col p-3 gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Live Detection
        </h2>
        <p className="mt-2 text-muted-foreground sm:w-[400px]">
          Use live detection with our AI-powered camera to verify face spoofing
          in real time.
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
      <div className="flex items-center justify-center my-20">
        {!isCameraOn ? (
          <Button
            className="flex items-center justify-center"
            onClick={() => setIsCameraOn(true)}
          >
            Live Detect
            <Eye className="w-6 h-6 ml-2" />
          </Button>
        ) : (
          <div>
            {response ? (
              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h4 className="font-bold text-[#16A34A]">
                  {response?.class &&
                    response?.probs &&
                    `${response.class}${" "}${response.probs[
                      response.class
                    ].toFixed(2)}% ${" "} ${response.model}`}
                  {response?.error && `${response.error}`}
                </h4>
              </div>
            ) : (
              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h4 className="font-bold text-[#16A34A]">Fetching...</h4>
              </div>
            )}
            <Webcam
              ref={webcamRef}
              audio={false}
              height={400}
              screenshotFormat="image/jpeg"
              width={600}
              videoConstraints={videoConstraints}
            />
            <div className="flex flex-col gap-3 mt-[20px]">
              <button
                className="bg-[#16A34A] text-white p-2 rounded-md"
                onClick={() => setIsCameraOn(false)}
              >
                Stop
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveDetection;
