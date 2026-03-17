/**
 * Cloudinary Delete API Route
 *
 * Handles asset deletion from Cloudinary.
 *
 * DELETE /api/delete
 * Body: { publicId: string, resourceType?: 'image' | 'video' }
 *
 * Response: { success: true, result: { ... } }
 */
import cloudinary from '@/lib/cloudinary';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { publicId, resourceType } = req.body;

    if (!publicId) {
      return res.status(400).json({ error: 'No publicId provided' });
    }

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType || 'image',
    });

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return res.status(500).json({
      error: 'Delete failed',
      message: error.message,
    });
  }
}
