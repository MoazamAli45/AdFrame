"use client";
import React, { useState, useRef } from "react";
import { Plus, Mic, Send } from "lucide-react";

const AudioTextInput = () => {
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      console.log("User submitted:", inputText); // Print input text to console
      setInputText("");
    }
  };

  const startRecording = async () => {
    try {
      const recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      recognition.lang = "en-US";
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        console.log("Speech recognition result:", transcript); // Print result to console
        setInputText(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="bg-white p-5 rounded-lg shadow-lg min-h-[400px] flex flex-col justify-between">
        <div className="text-center  text-4xl font-bold">
          <h1>
            <span className="text-[#16A34A]">Revolutionizing</span> Real Estate
            <span className="text-[#16A34A]"> Ad Creation</span> with AI
          </h1>
        </div>
        <div className="border-t p-4 ">
          <form onSubmit={handleTextSubmit} className="flex items-center gap-2">
            <button
              type="button"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            ></button>

            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#16A34A]"
                placeholder="Type a message..."
              />
              <button
                type="button"
                onClick={isRecording ? stopRecording : startRecording}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${
                  isRecording
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "hover:bg-gray-100 text-gray-500"
                }`}
              >
                <Mic size={20} />
              </button>
            </div>

            <button
              type="submit"
              className="p-3 rounded-full bg-[#16A34A] text-white hover:bg-[#16A34A] transition-colors"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AudioTextInput;
