/**
 * CloudImage Component
 *
 * A wrapper around next-cloudinary's CldImage for advanced Cloudinary features.
 * Use this when you need Cloudinary-specific transformations like:
 * - Overlays, effects, artistic filters
 * - Smart cropping (gravity: 'auto')
 * - Background removal
 * - Text overlays on images
 *
 * For basic image display, the standard <Image> component already uses
 * Cloudinary via the custom loader (lib/cloudinaryLoader.js).
 *
 * Usage:
 *   // With a Cloudinary public ID (uploaded image)
 *   <CloudImage publicId="indiantravellerofficial/kashmir-01" width={800} height={600} alt="Kashmir" />
 *
 *   // With an external URL (fetch mode)
 *   <CloudImage src="https://images.unsplash.com/photo-123" width={800} height={600} alt="Photo" />
 */
import { CldImage } from 'next-cloudinary';

export default function CloudImage({
  publicId,
  src,
  alt,
  width,
  height,
  fill,
  sizes,
  quality,
  priority = false,
  crop = 'limit',
  gravity,
  effects,
  overlays,
  className,
  style,
  ...rest
}) {
  // Determine delivery type based on props
  const isExternalUrl = src && (src.startsWith('http://') || src.startsWith('https://'));

  const imageProps = {
    alt: alt || 'Travel photo',
    quality: quality || 'auto',
    format: 'auto',
    crop: crop,
    priority: priority,
    className: className,
    style: style,
    ...rest,
  };

  // Fill mode
  if (fill) {
    imageProps.fill = true;
    if (sizes) imageProps.sizes = sizes;
  } else {
    imageProps.width = width || 800;
    imageProps.height = height || 600;
  }

  // Gravity (smart cropping)
  if (gravity) {
    imageProps.gravity = gravity;
  }

  // Effects
  if (effects) {
    imageProps.effects = effects;
  }

  // Text/image overlays
  if (overlays) {
    imageProps.overlays = overlays;
  }

  // External URL → use deliveryType="fetch"
  if (isExternalUrl) {
    return (
      <CldImage
        src={src}
        deliveryType="fetch"
        {...imageProps}
      />
    );
  }

  // Cloudinary public ID
  return (
    <CldImage
      src={publicId || src}
      {...imageProps}
    />
  );
}
