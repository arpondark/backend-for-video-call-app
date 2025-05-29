import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (fileBuffer, folder = "profile-pictures") => {
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: folder,
          resource_type: "auto",
          transformation: [
            { width: 400, height: 400, crop: "fill", gravity: "face" },
            { quality: "auto:good" }
          ]
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(fileBuffer);
    });

    return {
      success: true,
      url: result.secure_url,
      public_id: result.public_id
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return {
      success: false,
      error: error.message
    };
  }
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return { error: error.message };
  }
};

export default cloudinary;