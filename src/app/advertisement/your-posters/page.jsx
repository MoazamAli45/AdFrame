"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import Image from "next/image";

export default function MyPosters() {
  const [posters, setPosters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/user/posters");

        console.log("RESPONSE", response);

        if (!response.ok) {
          throw new Error("Failed to fetch posters");
        }

        const data = await response.json();

        console.log("DATA", data);
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

      // Update the local state to remove the deleted poster
      setPosters(posters.filter((url) => url !== posterUrl));
      toast.success("Poster deleted successfully");
    } catch (error) {
      toast.error("Failed to delete poster");
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading your posters...</div>;
  }

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
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeletePoster(posterUrl)}
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
