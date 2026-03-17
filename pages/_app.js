import Layout from '@/components/Layout/Layout';
import '@/styles/globals.scss';
// Cloudinary Video Player styles (needed for CloudVideo component)
import 'next-cloudinary/dist/cld-video-player.css';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
