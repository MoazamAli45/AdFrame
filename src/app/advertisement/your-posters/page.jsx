import { Button } from "@/components/ui/button";
import React from "react";
import realestate from "../../../../public/assets/realestate.jpg";
import Image from "next/image";
import { Download, Trash2 } from "lucide-react";

function page() {
  const postersArr = [
    { id: 1, title: "Poster 1", createdAt: "9/11/2024", imgSrc: realestate },
    { id: 2, title: "Poster 2", createdAt: "9/11/2024", imgSrc: realestate },
    { id: 3, title: "Poster 3", createdAt: "9/11/2024", imgSrc: realestate },
    // Add more posters here...
  ];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold-text-gray-900">My Posters</h1>
      <div className="bg-white rounded-lg shadow-lg space-y-4 py-6 w-full">
        <Button className="w-[95%] mx-auto block text-xl">+ New Poster</Button>
        <div className="flex flex-col gap-4">
          {postersArr.map((poster) => (
            <div
              key={poster.id}
              className="w-[95%] mx-auto border-gray-400 border rounded p-4 flex flex-col sm:flex-row gap-4 items-center"
            >
              <Image
                src={poster.imgSrc}
                className="cursor-pointer w-[170px] sm:w-[200px]"
              />
              <div className="flex flex-col gap-4">
                <div className="text-xl sm:text-2xl text-gray-900">
                  {poster.title}
                </div>
                <div className="text-gray-600 text-[12px] sm:text-sm">
                  Created At: {poster.createdAt}
                </div>
                <div className="flex sm:flex-row flex-col gap-2">
                  <Button>
                    <Download size={20} className="mr-2" /> Download
                  </Button>
                  <Button>
                    {" "}
                    <Trash2 size={20} className="mr-2" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
