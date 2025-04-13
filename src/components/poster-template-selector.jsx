"use client";

import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const PosterTemplateSelector = ({ selectedTemplate, onSelectTemplate }) => {
  const templates = [
    {
      id: "template1",
      name: "Modern Luxury",
      description: "Clean, modern design with emphasis on luxury features",
      thumbnail: "/placeholder.png?height=100&width=150",
    },
    {
      id: "template2",
      name: "Classic Elegance",
      description: "Traditional layout with elegant typography",
      thumbnail: "/placeholder.png?height=100&width=150",
    },
    {
      id: "template3",
      name: "Bold Contemporary",
      description: "Bold colors and contemporary design elements",
      thumbnail: "/placeholder.png?height=100&width=150",
    },
    {
      id: "template4",
      name: "Minimalist",
      description: "Simple, clean design with focus on images",
      thumbnail: "/placeholder.png?height=100&width=150",
    },
  ];

  return (
    <div className="space-y-4">
      <RadioGroup
        value={selectedTemplate}
        onValueChange={onSelectTemplate}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {templates.map((template) => (
          <div key={template.id} className="flex items-start space-x-2">
            <RadioGroupItem
              value={template.id}
              id={template.id}
              className="mt-1"
            />
            <Label htmlFor={template.id} className="flex-1 cursor-pointer">
              <Card
                className={`overflow-hidden transition-all ${
                  selectedTemplate === template.id
                    ? "ring-2 ring-[#16A34A]"
                    : ""
                }`}
              >
                <CardContent className="p-0">
                  <img
                    src={template.thumbnail || "/placeholder.png"}
                    alt={template.name}
                    className="w-full h-24 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-medium">{template.name}</h3>
                    <p className="text-sm text-gray-500">
                      {template.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PosterTemplateSelector;
