/**
 * Custom Cloudinary Image Loader for Next.js
 *
 * Automatically routes all images through Cloudinary's Fetch CDN.
 * - External URLs (Unsplash, etc.) → Cloudinary fetch + optimization
 * - Local images (starting with /) → served as-is
 *
 * Benefits:
 * - Automatic WebP/AVIF format conversion (f_auto)
 * - Quality optimization (q_auto or custom quality)
 * - Responsive width-based delivery
 * - Global CDN delivery
 * - No changes needed to existing <Image> components
 */
export default function cloudinaryLoader({ src, width, quality }) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  // If cloud name is not set, fall back to original URL
  if (!cloudName || cloudName === 'YOUR_CLOUD_NAME') {
    return src;
  }

  // Local images — serve directly (e.g. /favicon.svg, /og-image.jpg)
  if (src.startsWith('/')) {
    return src;
  }

  // Already a Cloudinary URL — don't double-wrap
  if (src.includes('res.cloudinary.com')) {
    return src;
  }

  // Build Cloudinary transformation parameters
  const params = [
    'f_auto',           // Auto format (WebP/AVIF based on browser)
    'c_limit',          // Limit crop (don't upscale)
    `w_${width}`,       // Responsive width
    `q_${quality || 'auto'}`, // Quality (auto or specified)
  ];

  // Use Cloudinary's fetch delivery type for external URLs
  const encodedSrc = encodeURIComponent(src);
  return `https://res.cloudinary.com/${cloudName}/image/fetch/${params.join(',')}/${encodedSrc}`;
}
