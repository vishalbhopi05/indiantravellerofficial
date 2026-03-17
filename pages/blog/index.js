import { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import SEO from '@/components/SEO/SEO';
import AnimatedSection from '@/components/AnimatedSection/AnimatedSection';
import BlogCard from '@/components/BlogCard/BlogCard';
import { blogPosts } from '@/data/siteData';
import styles from '@/styles/Blog.module.scss';

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const visiblePosts = blogPosts.slice(0, visibleCount);
  const hasMore = visibleCount < blogPosts.length;

  return (
    <>
      <SEO
        title="Travel Blog"
        description="Read travel stories, photography tips, and destination guides from IndianTravellerOfficial."
      />

      <div className={styles.page}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <AnimatedSection animation="fadeUp">
              <h1 className={styles.heroTitle}>
                Travel <span>Stories</span>
              </h1>
              <p className={styles.heroSubtitle}>
                Immerse yourself in tales of adventure, discovery, and the magic
                of wandering through incredible destinations.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Blog Grid */}
        <section className={styles.content}>
          <div className={styles.inner}>
            <div className={styles.grid}>
              {visiblePosts.map((post, i) => (
                <AnimatedSection
                  key={post.id}
                  animation="fadeUp"
                  delay={i * 0.08}
                >
                  <BlogCard post={post} />
                </AnimatedSection>
              ))}
            </div>

            {hasMore && (
              <div className={styles.loadMore}>
                <button
                  className="btn btn--outline"
                  onClick={() =>
                    setVisibleCount((prev) => prev + POSTS_PER_PAGE)
                  }
                >
                  Load More Stories <FiArrowRight />
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
