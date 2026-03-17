import { ThemeProvider } from '@/context/ThemeContext';
import Layout from '@/components/Layout/Layout';
import '@/styles/globals.scss';
// Cloudinary Video Player styles (needed for CloudVideo component)
import 'next-cloudinary/dist/cld-video-player.css';
// Leaflet map styles (needed for TravelMap component)
import 'leaflet/dist/leaflet.css';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
