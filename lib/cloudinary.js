/**
 * Server-side Cloudinary Configuration
 *
 * Used for:
 * - Uploading images to Cloudinary
 * - Managing assets via Cloudinary Admin API
 * - Generating signed URLs
 *
 * IMPORTANT: Only use this in server-side code (API routes, getServerSideProps, etc.)
 * Never import this in client-side components.
 */
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

/**
 * Upload an image to Cloudinary
 * @param {string} filePath - Local file path or URL to upload
 * @param {object} options - Upload options
 * @returns {Promise<object>} Upload result with public_id, secure_url, etc.
 */
export async function uploadImage(filePath, options = {}) {
  const defaultOptions = {
    folder: 'indiantravellerofficial',
    resource_type: 'image',
    quality: 'auto',
    fetch_format: 'auto',
    ...options,
  };

  return cloudinary.uploader.upload(filePath, defaultOptions);
}

/**
 * Upload a video to Cloudinary
 * @param {string} filePath - Local file path or URL to upload
 * @param {object} options - Upload options
 * @returns {Promise<object>} Upload result
 */
export async function uploadVideo(filePath, options = {}) {
  const defaultOptions = {
    folder: 'indiantravellerofficial/videos',
    resource_type: 'video',
    ...options,
  };

  return cloudinary.uploader.upload(filePath, defaultOptions);
}

/**
 * Delete an asset from Cloudinary
 * @param {string} publicId - Public ID of the asset
 * @param {string} resourceType - 'image' or 'video'
 * @returns {Promise<object>} Deletion result
 */
export async function deleteAsset(publicId, resourceType = 'image') {
  return cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
}

/**
 * Generate an optimized Cloudinary URL
 * @param {string} publicId - Public ID of the image
 * @param {object} transformations - Cloudinary transformation options
 * @returns {string} Optimized URL
 */
export function getOptimizedUrl(publicId, transformations = {}) {
  return cloudinary.url(publicId, {
    quality: 'auto',
    fetch_format: 'auto',
    ...transformations,
  });
}

/**
 * Generate a video URL with transformations
 * @param {string} publicId - Public ID of the video
 * @param {object} transformations - Cloudinary transformation options
 * @returns {string} Optimized video URL
 */
export function getVideoUrl(publicId, transformations = {}) {
  return cloudinary.url(publicId, {
    resource_type: 'video',
    quality: 'auto',
    ...transformations,
  });
}
