"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, FileImage } from "lucide-react";
import Image from "next/image";

export default function MyPosters() {
  const [posters, setPosters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Fetch posters from the server
  useEffect(() => {
    const fetchPosters = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/user/posters");
        if (!response.ok) {
          throw new Error("Failed to fetch posters");
        }
        const data = await response.json();
        setPosters(data.posters || []);
      } catch (error) {
        toast.error("Failed to load your posters");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosters();
  }, []);

  // Delete a poster
  const handleDeletePoster = async (posterUrl) => {
    try {
      setIsDeleting(true);
      const response = await fetch("/api/user/posters", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ posterUrl }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete poster");
      }
      setPosters(posters.filter((url) => url !== posterUrl));
      toast.success("Poster deleted successfully");
    } catch (error) {
      toast.error("Failed to delete poster");
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Download as Image
  const downloadAsImage = async (posterUrl) => {
    try {
      setIsDownloading(true);
      // Fetch the image as a blob
      const response = await fetch(posterUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      const blob = await response.blob();
      // Create a temporary URL for the blob
      const blobUrl = URL.createObjectURL(blob);
      // Create a temporary link element
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `real-estate-poster-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Revoke the blob URL to free up memory
      URL.revokeObjectURL(blobUrl);
      toast.success("Image downloaded successfully");
    } catch (error) {
      toast.error("Failed to download image");
      console.error(error);
    } finally {
      setIsDownloading(false);
    }
  };

  // Loading state
  if (isLoading) {
    return <div className="text-center py-10">Loading your posters...</div>;
  }

  // Empty state
  if (posters.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 mb-4">You haven't saved any posters yet.</p>
        <Button
          variant="outline"
          onClick={() => (window.location.href = "/advertisement/generate")}
        >
          Create Your First Poster
        </Button>
      </div>
    );
  }

  // Render posters
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Saved Posters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posters.map((posterUrl, index) => (
          <div key={index} className="relative group">
            <div className="aspect-[3/4] relative rounded-lg overflow-hidden border border-gray-200">
              <Image
                src={posterUrl || "/placeholder.svg"}
                alt={`Poster ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex flex-col gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => downloadAsImage(posterUrl)}
                  disabled={isDownloading}
                  className="w-full"
                >
                  <FileImage className="h-4 w-4 mr-2" />
                  Download Image
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeletePoster(posterUrl)}
                  disabled={isDeleting}
                  className="w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
