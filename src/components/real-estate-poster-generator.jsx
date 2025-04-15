"use client";

import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import PosterTemplateSelector from "./poster-template-selector";
import PosterCustomizer from "./poster-customizer";
import PosterPreview from "./poster-preview";
import ImageUploader from "./image-uploader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

// Default customization options
const defaultCustomizationOptions = {
  primaryColor: "#16A34A",
  secondaryColor: "#047857",
  fontFamily: "Inter, sans-serif",
  fontSize: "medium",
  backgroundColor: "#ffffff",
  borderRadius: "medium",
  showPrice: true,
  showContact: true,
  maxImages: 4,
};

const RealEstatePosterGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [posterData, setPosterData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [customizationOptions, setCustomizationOptions] = useState(
    defaultCustomizationOptions
  );
  const [activeTab, setActiveTab] = useState("input");
  const [uploadedImages, setUploadedImages] = useState({});
  const [requiredImages, setRequiredImages] = useState([]);
  const [imagesUploaded, setImagesUploaded] = useState(false);

  // Determine required images when poster data changes
  useEffect(() => {
    if (posterData) {
      const imageReqs = posterData.image_requirements;
      const required = [];

      if (imageReqs.Exterior) required.push("Exterior");
      if (imageReqs["Living room"]) required.push("Living Room");
      if (imageReqs.Kitchen) required.push("Kitchen");
      if (imageReqs.Bedrooms) required.push("Bedroom");
      if (imageReqs.Bathrooms) required.push("Bathroom");
      if (imageReqs.Backyard) required.push("Backyard");
      if (imageReqs.Pool) required.push("Pool");
      if (imageReqs.Garage) required.push("Garage");

      // Add some of the other features that might need images
      if (
        imageReqs["Other features needing images"] &&
        imageReqs["Other features needing images"].length > 0
      ) {
        imageReqs["Other features needing images"]
          .slice(0, 3)
          .forEach((feature) => {
            required.push(feature);
          });
      }

      setRequiredImages(required);
    }
  }, [posterData]);

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://adframe-ai-api-1.onrender.com/process-ad",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_input: inputText }),
          }
        );

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        setPosterData(data);
        setActiveTab("customize");
        setImagesUploaded(false); // Reset image upload status when generating new poster
        setUploadedImages({}); // Clear previously uploaded images
      } catch (err) {
        console.error("Error processing ad:", err);
        setError("Failed to process your request. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleImageUpload = (type, file) => {
    // Create a URL for the uploaded file
    const imageUrl = URL.createObjectURL(file);
    setUploadedImages((prev) => ({
      ...prev,
      [type]: imageUrl,
    }));
  };

  const handleContinueToPreview = () => {
    setImagesUploaded(true);
    setActiveTab("preview");
  };

  const handleTabChange = (value) => {
    // If user is trying to go to preview without uploading images, redirect to images tab
    if (value === "preview" && !imagesUploaded && posterData) {
      setActiveTab("images");
    } else {
      setActiveTab(value);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="bg-white p-5 rounded-lg shadow-lg  flex flex-col">
        <div className="text-center text-4xl font-bold mb-8">
          <h1>
            <span className="text-[#16A34A]">Revolutionizing</span> Real Estate
            <span className="text-[#16A34A]"> Ad Creation</span> with AI
          </h1>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="flex-1"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="input">Input</TabsTrigger>
            <TabsTrigger value="customize" disabled={!posterData}>
              Customize
            </TabsTrigger>
            <TabsTrigger value="images" disabled={!posterData}>
              Images
            </TabsTrigger>
            <TabsTrigger value="preview" disabled={!posterData}>
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="input" className="flex-1 flex flex-col">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex-1">
              <p className="text-gray-600 mb-4">
                Describe the property you want to create a poster for. Include
                details like property type, features, location, price, and any
                other relevant information.
              </p>

              <form
                onSubmit={handleTextSubmit}
                className="flex flex-col h-full"
              >
                <div className="flex-1 mb-4">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full h-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16A34A] resize-none"
                    placeholder="Describe your property here... (e.g., Historic farmhouse with 3 bedrooms, 2 bathrooms on 25 acres in Vermont...)"
                  />
                </div>

                <Button
                  type="submit"
                  className="self-end bg-[#16A34A] hover:bg-[#047857]"
                  disabled={isLoading || !inputText.trim()}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Generate Poster
                    </>
                  )}
                </Button>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="customize" className="flex-1">
            {posterData && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Template Selection
                  </h2>
                  <PosterTemplateSelector
                    selectedTemplate={selectedTemplate}
                    onSelectTemplate={setSelectedTemplate}
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Customization Options
                  </h2>
                  <PosterCustomizer
                    options={customizationOptions}
                    onChange={setCustomizationOptions}
                  />
                </div>
                <div className="md:col-span-2 flex justify-end mt-4">
                  <Button
                    onClick={() => setActiveTab("images")}
                    className="bg-[#16A34A] hover:bg-[#047857]"
                  >
                    Continue to Images
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="images" className="flex-1">
            {posterData && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Upload Property Images
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Based on your property description, we recommend uploading
                    images for the following features. These images will be used
                    in your poster.
                  </p>

                  <ImageUploader
                    requiredImages={requiredImages}
                    uploadedImages={uploadedImages}
                    onImageUpload={handleImageUpload}
                    maxImages={customizationOptions.maxImages}
                  />
                </div>

                <div className="flex justify-end mt-8">
                  <Button
                    onClick={handleContinueToPreview}
                    className="bg-[#16A34A] hover:bg-[#047857]"
                    disabled={Object.keys(uploadedImages).length === 0}
                  >
                    Continue to Preview
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="preview" className="flex-1">
            {posterData && (
              <PosterPreview
                data={posterData}
                template={selectedTemplate}
                customizationOptions={customizationOptions}
                uploadedImages={uploadedImages}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RealEstatePosterGenerator;
