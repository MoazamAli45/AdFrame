"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { FileImage, FileIcon as FilePdf, ArrowLeft, Upload } from "lucide-react"
import { toPng } from "html-to-image"
import { jsPDF } from "jspdf"
import { toast } from "sonner"
import { uploadImageToCloudinary } from "@/lib/cloudinary"
import ModernLuxuryTemplate from "./templates/modern-luxury-template"
import ClassicEleganceTemplate from "./templates/classic-elegance-template"
import BoldContemporaryTemplate from "./templates/bold-contemporary-template"
import MinimalistTemplate from "./templates/minimalist-template"

const PosterPreview = ({ data, template, customizationOptions, uploadedImages }) => {
  const posterRef = useRef(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [downloadError, setDownloadError] = useState(null)

  const generateImage = async () => {
    if (!posterRef.current) return null

    try {
      const dataUrl = await toPng(posterRef.current, { quality: 0.95 })
      return dataUrl
    } catch (error) {
      console.error("Error generating image:", error)
      throw new Error("Failed to generate image")
    }
  }

  const downloadAsImage = async () => {
    try {
      setIsDownloading(true)
      setDownloadError(null)

      const dataUrl = await generateImage()
      if (!dataUrl) return

      // Create download link
      const link = document.createElement("a")
      link.download = `real-estate-poster-${Date.now()}.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error("Error downloading image:", error)
      setDownloadError("Failed to generate image. Please try again.")
    } finally {
      setIsDownloading(false)
    }
  }

  const downloadAsPdf = async () => {
    try {
      setIsDownloading(true)
      setDownloadError(null)

      const dataUrl = await generateImage()
      if (!dataUrl) return

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      // Calculate aspect ratio to fit on PDF
      const imgProps = pdf.getImageProperties(dataUrl)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight)
      pdf.save(`real-estate-poster-${Date.now()}.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
      setDownloadError("Failed to generate PDF. Please try again.")
    } finally {
      setIsDownloading(false)
    }
  }

  const uploadToCloudinaryAndSave = async () => {
    try {
      setIsUploading(true)
      setDownloadError(null)

      // Generate the image
      const dataUrl = await generateImage()
      if (!dataUrl) return

      // Convert data URL to Blob for Cloudinary upload
      const response = await fetch(dataUrl)
      const blob = await response.blob()

      // Create a file name with timestamp
      const fileName = `real-estate-poster-${Date.now()}.png`

      // Upload to Cloudinary
      const cloudinaryUrl = await uploadImageToCloudinary(blob, "real-estate-posters")

      // Add the new poster URL to the user's posters array
      const updateResponse = await fetch("/api/user/posters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          posterUrl: cloudinaryUrl,
          posterData: {
            template,
            propertyDetails: data,
            createdAt: new Date().toISOString(),
          },
        }),
      })

      if (!updateResponse.ok) {
        throw new Error("Failed to save poster to your profile")
      }

      toast.success("Poster saved to your profile successfully!")

      // Also trigger download for the user
      const link = document.createElement("a")
      link.download = fileName
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error)
      setDownloadError("Failed to save poster to your profile. Please try again.")
      toast.error("Failed to save poster to your profile")
    } finally {
      setIsUploading(false)
    }
  }

  const renderTemplate = () => {
    switch (template) {
      case "template1":
        return <ModernLuxuryTemplate data={data} options={customizationOptions} uploadedImages={uploadedImages} />
      case "template2":
        return <ClassicEleganceTemplate data={data} options={customizationOptions} uploadedImages={uploadedImages} />
      case "template3":
        return <BoldContemporaryTemplate data={data} options={customizationOptions} uploadedImages={uploadedImages} />
      case "template4":
        return <MinimalistTemplate data={data} options={customizationOptions} uploadedImages={uploadedImages} />
      default:
        return <ModernLuxuryTemplate data={data} options={customizationOptions} uploadedImages={uploadedImages} />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between flex-wrap gap-2">
        <Button variant="outline" onClick={() => window.history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Edit Images
        </Button>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={downloadAsImage} disabled={isDownloading || isUploading}>
            <FileImage className="mr-2 h-4 w-4" />
            {isDownloading ? "Generating..." : "Download as Image"}
          </Button>
          <Button variant="outline" onClick={downloadAsPdf} disabled={isDownloading || isUploading}>
            <FilePdf className="mr-2 h-4 w-4" />
            {isDownloading ? "Generating..." : "Download as PDF"}
          </Button>
          <Button variant="primary" onClick={uploadToCloudinaryAndSave} disabled={isDownloading || isUploading}>
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? "Saving..." : "Save to Profile"}
          </Button>
        </div>
      </div>

      {downloadError && <div className="text-red-500 text-sm">{downloadError}</div>}

      <div className="bg-gray-100 p-4 rounded-lg flex justify-center">
        <div
          ref={posterRef}
          className="bg-white shadow-lg max-w-3xl w-full"
          style={{
            minHeight: "600px",
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  )
}

export default PosterPreview
