/**
 * Cloudinary utility functions for image uploads
 */

/**
 * Uploads an image to Cloudinary
 * @param {Blob} file - The file blob to upload
 * @param {string} folder - The folder to upload to (optional)
 * @returns {Promise<string>} - The Cloudinary URL
 */
export async function uploadImageToCloudinary(file, folder = "posters") {
  try {
    // Create a FormData instance
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)
    formData.append("folder", folder)

    // Make the upload request to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || "Failed to upload to Cloudinary")
    }

    const data = await response.json()

    // Return the secure URL of the uploaded image
    return data.secure_url
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error)
    throw new Error("Failed to upload image")
  }
}

/**
 * Extracts the public ID from a Cloudinary URL
 * @param {string} url - The Cloudinary URL
 * @returns {string|null} - The public ID or null if not found
 */
export function getPublicIdFromUrl(url) {
  if (!url || typeof url !== "string") return null

  try {
    // Extract the public ID from the URL
    // Format: https://res.cloudinary.com/cloud-name/image/upload/v1234567890/folder/public-id.jpg
    const urlParts = url.split("/")
    const filenamePart = urlParts[urlParts.length - 1]
    const publicIdParts = filenamePart.split(".")

    // Remove the file extension
    publicIdParts.pop()

    // Get the folder path if it exists
    const folderPath = urlParts[urlParts.length - 2]

    // Combine folder and filename for the complete public ID
    return `${folderPath}/${publicIdParts.join(".")}`
  } catch (error) {
    console.error("Error extracting public ID:", error)
    return null
  }
}

/**
 * Deletes an image from Cloudinary
 * @param {string} publicId - The public ID of the image
 * @returns {Promise<boolean>} - Success status
 */
export async function deleteImageFromCloudinary(publicId) {
  try {
    // This would typically be a server-side operation for security
    // For client-side, we'll call an API endpoint that handles the deletion
    const response = await fetch("/api/cloudinary/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ publicId }),
    })

    if (!response.ok) {
      throw new Error("Failed to delete image from Cloudinary")
    }

    return true
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error)
    return false
  }
}
