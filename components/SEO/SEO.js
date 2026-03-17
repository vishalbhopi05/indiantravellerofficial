import Head from 'next/head';
import { siteConfig } from '@/data/siteData';

export default function SEO({
  title,
  description,
  image,
  url,
  type = 'website',
}) {
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.name;
  const pageDescription = description || siteConfig.description;
  const pageImage = image || '/og-image.jpg';
  const pageUrl = url || siteConfig.url;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="icon" href="/favicon.ico" sizes="32x32" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={siteConfig.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />

      {/* Additional */}
      <meta name="theme-color" content="#0a0a0a" />
      <meta name="robots" content="index, follow" />
    </Head>
  );
}
