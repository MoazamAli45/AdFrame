"use client";

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PosterCustomizer = ({ options, onChange }) => {
  const handleChange = (key, value) => {
    onChange({
      ...options,
      [key]: value,
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="colors">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="primaryColor">Primary Color</Label>
            <div className="flex space-x-2">
              <Input
                id="primaryColor"
                type="color"
                value={options.primaryColor}
                onChange={(e) => handleChange("primaryColor", e.target.value)}
                className="w-12 h-10 p-1"
              />
              <Input
                type="text"
                value={options.primaryColor}
                onChange={(e) => handleChange("primaryColor", e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="secondaryColor">Secondary Color</Label>
            <div className="flex space-x-2">
              <Input
                id="secondaryColor"
                type="color"
                value={options.secondaryColor}
                onChange={(e) => handleChange("secondaryColor", e.target.value)}
                className="w-12 h-10 p-1"
              />
              <Input
                type="text"
                value={options.secondaryColor}
                onChange={(e) => handleChange("secondaryColor", e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="backgroundColor">Background Color</Label>
            <div className="flex space-x-2">
              <Input
                id="backgroundColor"
                type="color"
                value={options.backgroundColor}
                onChange={(e) =>
                  handleChange("backgroundColor", e.target.value)
                }
                className="w-12 h-10 p-1"
              />
              <Input
                type="text"
                value={options.backgroundColor}
                onChange={(e) =>
                  handleChange("backgroundColor", e.target.value)
                }
                className="flex-1"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="typography" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="fontFamily">Font Family</Label>
            <Select
              value={options.fontFamily}
              onValueChange={(value) => handleChange("fontFamily", value)}
            >
              <SelectTrigger id="fontFamily">
                <SelectValue placeholder="Select font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Inter, sans-serif">Inter</SelectItem>
                <SelectItem value="'Playfair Display', serif">
                  Playfair Display
                </SelectItem>
                <SelectItem value="'Montserrat', sans-serif">
                  Montserrat
                </SelectItem>
                <SelectItem value="'Roboto', sans-serif">Roboto</SelectItem>
                <SelectItem value="'Open Sans', sans-serif">
                  Open Sans
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fontSize">Font Size</Label>
            <Select
              value={options.fontSize}
              onValueChange={(value) => handleChange("fontSize", value)}
            >
              <SelectTrigger id="fontSize">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        <TabsContent value="layout" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="borderRadius">Border Radius</Label>
            <Select
              value={options.borderRadius}
              onValueChange={(value) => handleChange("borderRadius", value)}
            >
              <SelectTrigger id="borderRadius">
                <SelectValue placeholder="Select border radius" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="showPrice"
              checked={options.showPrice}
              onCheckedChange={(checked) => handleChange("showPrice", checked)}
            />
            <Label htmlFor="showPrice">Show Price</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="showContact"
              checked={options.showContact}
              onCheckedChange={(checked) =>
                handleChange("showContact", checked)
              }
            />
            <Label htmlFor="showContact">Show Contact Information</Label>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="maxImages">
                Maximum Images: {options.maxImages}
              </Label>
            </div>
            <Slider
              id="maxImages"
              min={1}
              max={8}
              step={1}
              value={[options.maxImages]}
              onValueChange={(value) => handleChange("maxImages", value[0])}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PosterCustomizer;
