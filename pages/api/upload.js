/**
 * Cloudinary Upload API Route
 *
 * Handles image and video uploads to Cloudinary.
 *
 * POST /api/upload
 * Body: { file: string (base64 or URL), folder?: string, resourceType?: 'image' | 'video' }
 *
 * Response: { success: true, result: { public_id, secure_url, width, height, format, ... } }
 */
import cloudinary from '@/lib/cloudinary';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Allow up to 10MB uploads
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { file, folder, resourceType, tags } = req.body;

    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    const uploadOptions = {
      folder: folder || 'indiantravellerofficial',
      resource_type: resourceType || 'image',
      quality: 'auto',
      fetch_format: 'auto',
    };

    // Add tags if provided
    if (tags && Array.isArray(tags)) {
      uploadOptions.tags = tags;
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file, uploadOptions);

    return res.status(200).json({
      success: true,
      result: {
        public_id: result.public_id,
        secure_url: result.secure_url,
        url: result.url,
        width: result.width,
        height: result.height,
        format: result.format,
        resource_type: result.resource_type,
        bytes: result.bytes,
        created_at: result.created_at,
      },
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return res.status(500).json({
      error: 'Upload failed',
      message: error.message,
    });
  }
}
