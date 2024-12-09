"use client";
import { Camera } from "lucide-react";
import React, { useState } from "react";

const UploadImage = () => {
  const [image, setImage] = useState("https://via.placeholder.com/96"); // Default placeholder image

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result); // Update the image with the uploaded file
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-28 h-28">
      {/* Profile Image */}
      <img
        src={image}
        alt="Profile"
        className="w-full h-full rounded-full object-cover border-2 border-gray-300"
      />

      {/* Camera Icon */}
      <label
        htmlFor="imageInput"
        className="absolute bottom-0 left-0 w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center cursor-pointer shadow-md"
      >
        <Camera size={15} />
      </label>

      {/* Hidden File Input */}
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default UploadImage;
