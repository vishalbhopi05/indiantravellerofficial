/**
 * CloudVideo Component
 *
 * A wrapper around next-cloudinary's CldVideoPlayer for Cloudinary-hosted videos.
 * Use this for videos uploaded to your Cloudinary account.
 *
 * For YouTube/Vimeo embeds, continue using <iframe> as before.
 *
 * Usage:
 *   <CloudVideo publicId="indiantravellerofficial/videos/kashmir-vlog" />
 *   <CloudVideo publicId="indiantravellerofficial/videos/thailand-trip" autoPlay muted />
 */
import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';

export default function CloudVideo({
  publicId,
  width = '100%',
  height = 'auto',
  autoPlay = false,
  muted = false,
  loop = false,
  controls = true,
  poster,
  className,
  transformation,
  ...rest
}) {
  if (!publicId) {
    console.warn('CloudVideo: publicId is required for Cloudinary videos.');
    return null;
  }

  const videoProps = {
    src: publicId,
    width: width,
    height: height,
    autoPlay: autoPlay ? 'true' : 'false',
    muted: muted,
    loop: loop,
    controls: controls,
    className: className,
    ...rest,
  };

  // Custom poster/thumbnail
  if (poster) {
    videoProps.poster = poster;
  }

  // Custom transformations
  if (transformation) {
    videoProps.transformation = transformation;
  }

  return <CldVideoPlayer {...videoProps} />;
}
