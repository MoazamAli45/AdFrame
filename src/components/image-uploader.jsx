"use client";
import { Upload, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const ImageUploader = ({
  requiredImages,
  uploadedImages,
  onImageUpload,
  maxImages,
}) => {
  // Limit the number of images to upload based on maxImages setting
  const imagesToUpload = requiredImages.slice(0, maxImages);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      onImageUpload(type, file);
    }
  };

  const removeImage = (type) => {
    // Create a new object without the removed image
    const newUploadedImages = { ...uploadedImages };
    delete newUploadedImages[type];

    // Call onImageUpload with the updated object
    onImageUpload(type, null);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {imagesToUpload.map((imageType) => (
          <Card
            key={imageType}
            className={`overflow-hidden ${
              uploadedImages[imageType] ? "ring-2 ring-[#16A34A]" : ""
            }`}
          >
            <CardContent className="p-0">
              {uploadedImages[imageType] ? (
                <div className="relative">
                  <img
                    src={uploadedImages[imageType] || "/placeholder.svg"}
                    alt={imageType}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white text-black hover:bg-gray-200"
                        onClick={() => {
                          document.getElementById(`file-${imageType}`).click();
                        }}
                      >
                        Change
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white text-red-500 hover:bg-gray-200"
                        onClick={() => removeImage(imageType)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-[#16A34A] text-white p-1 rounded-full">
                    <Check className="h-4 w-4" />
                  </div>
                </div>
              ) : (
                <div className="h-48 flex flex-col items-center justify-center p-4 bg-gray-50">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm font-medium mb-2">{imageType}</p>
                  <Label
                    htmlFor={`file-${imageType}`}
                    className="bg-[#16A34A] text-white px-3 py-1 rounded-md text-sm cursor-pointer hover:bg-[#047857] transition-colors"
                  >
                    Upload Image
                  </Label>
                  <input
                    id={`file-${imageType}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, imageType)}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-blue-700 font-medium mb-2">
          Tips for better posters:
        </h3>
        <ul className="text-sm text-blue-600 list-disc pl-5 space-y-1">
          <li>Use high-quality, well-lit images</li>
          <li>Landscape orientation works best for most templates</li>
          <li>Highlight the best features of your property</li>
          <li>Make sure images are clear and properly framed</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageUploader;
