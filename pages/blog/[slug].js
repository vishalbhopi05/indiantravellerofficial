import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMapPin, FiCalendar, FiClock, FiArrowLeft } from 'react-icons/fi';
import SEO from '@/components/SEO/SEO';
import AnimatedSection from '@/components/AnimatedSection/AnimatedSection';
import Lightbox from '@/components/Lightbox/Lightbox';
import { blogPosts } from '@/data/siteData';
import styles from '@/styles/BlogDetail.module.scss';

export async function getStaticPaths() {
  const paths = blogPosts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { notFound: true };
  return { props: { post } };
}

export default function BlogDetail({ post }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.coverImage}
        type="article"
      />

      <div className={styles.page}>
        {/* Hero Banner */}
        <motion.div
          className={styles.heroBanner}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="100vw"
            priority
            quality={90}
          />
          <div className={styles.heroOverlay}>
            <div className={styles.heroContent}>
              <motion.span
                className={styles.categoryTag}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {post.category}
              </motion.span>
              <motion.h1
                className={styles.blogTitle}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {post.title}
              </motion.h1>
              <motion.div
                className={styles.blogMeta}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className={styles.metaItem}>
                  <FiMapPin size={14} />
                  {post.location}
                </span>
                <span className={styles.dot} />
                <span className={styles.metaItem}>
                  <FiCalendar size={14} />
                  {post.date}
                </span>
                <span className={styles.dot} />
                <span className={styles.metaItem}>
                  <FiClock size={14} />
                  {post.readTime}
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Article */}
        <article className={styles.article}>
          <AnimatedSection animation="fadeUp">
            <Link href="/blog" className={styles.backLink}>
              <FiArrowLeft /> Back to Stories
            </Link>
          </AnimatedSection>

          <AnimatedSection animation="fadeUp" delay={0.1}>
            <div
              className={styles.articleContent}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </AnimatedSection>

          {/* Gallery */}
          {post.gallery && post.gallery.length > 0 && (
            <AnimatedSection animation="fadeUp" delay={0.2}>
              <div className={styles.gallerySection}>
                <h3 className={styles.galleryTitle}>Photo Gallery</h3>
                <div className={styles.galleryGrid}>
                  {post.gallery.map((img, i) => (
                    <div
                      key={i}
                      className={styles.galleryItem}
                      onClick={() => setLightboxIndex(i)}
                    >
                      <Image
                        src={img}
                        alt={`${post.title} gallery ${i + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        quality={80}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}
        </article>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={post.gallery}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() =>
            setLightboxIndex((prev) => (prev + 1) % post.gallery.length)
          }
          onPrev={() =>
            setLightboxIndex(
              (prev) =>
                (prev - 1 + post.gallery.length) % post.gallery.length
            )
          }
        />
      )}
    </>
  );
}
