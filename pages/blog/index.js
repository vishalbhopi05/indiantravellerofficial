import { useState, useMemo } from 'react';
import { FiArrowRight, FiSearch, FiX } from 'react-icons/fi';
import SEO from '@/components/SEO/SEO';
import AnimatedSection from '@/components/AnimatedSection/AnimatedSection';
import BlogCard from '@/components/BlogCard/BlogCard';
import { blogPosts } from '@/data/siteData';
import styles from '@/styles/Blog.module.scss';

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return blogPosts;
    const q = searchQuery.toLowerCase().trim();
    return blogPosts.filter(
      (post) =>
        post.title?.toLowerCase().includes(q) ||
        post.location?.toLowerCase().includes(q) ||
        post.category?.toLowerCase().includes(q) ||
        post.excerpt?.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Reset visible count when search changes
  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setVisibleCount(POSTS_PER_PAGE); // reset pagination on new search
  };

  const clearSearch = () => {
    setSearchQuery('');
    setVisibleCount(POSTS_PER_PAGE);
  };

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

            {/* Search Bar */}
            <AnimatedSection animation="fadeUp" delay={0.15}>
              <div className={styles.searchWrap}>
                <FiSearch className={styles.searchIcon} size={18} />
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Search by destination, category, or keyword…"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {searchQuery && (
                  <button
                    className={styles.searchClear}
                    onClick={clearSearch}
                    aria-label="Clear search"
                  >
                    <FiX size={16} />
                  </button>
                )}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Blog Grid */}
        <section className={styles.content}>
          <div className={styles.inner}>
            {/* Results count when searching */}
            {searchQuery.trim() && (
              <p className={styles.resultsCount}>
                {filteredPosts.length === 0
                  ? 'No stories found'
                  : `${filteredPosts.length} ${filteredPosts.length === 1 ? 'story' : 'stories'} found`}
                {' for "'}
                <strong>{searchQuery.trim()}</strong>
                {'"'}
              </p>
            )}

            {filteredPosts.length > 0 ? (
              <>
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
              </>
            ) : (
              <div className={styles.emptyState}>
                <FiSearch size={48} />
                <h3>No stories match your search</h3>
                <p>Try a different keyword or browse all stories below.</p>
                <button className="btn btn--outline" onClick={clearSearch}>
                  View All Stories
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
