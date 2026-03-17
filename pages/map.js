import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGlobe, FiFlag, FiMapPin, FiNavigation, FiMap } from 'react-icons/fi';
import SEO from '@/components/SEO/SEO';
import { destinations } from '@/data/siteData';
import styles from '@/styles/Map.module.scss';

// Dynamically import TravelMap with SSR disabled (Leaflet requires window)
const TravelMap = dynamic(
  () => import('@/components/TravelMap/TravelMap'),
  { ssr: false }
);

export default function MapPage() {
  const [filter, setFilter] = useState('all');
  const [showPaths, setShowPaths] = useState(true);

  const filteredCount = useMemo(() => {
    return destinations.filter((dest) => {
      if (!dest.coords) return false;
      if (filter === 'india') return dest.location.toLowerCase().includes('india');
      if (filter === 'world') return !dest.location.toLowerCase().includes('india');
      return true;
    }).length;
  }, [filter]);

  const indiaCount = destinations.filter(
    (d) => d.coords && d.location.toLowerCase().includes('india')
  ).length;

  const worldCount = destinations.filter(
    (d) => d.coords && !d.location.toLowerCase().includes('india')
  ).length;

  const categories = useMemo(() => {
    const cats = {};
    destinations.forEach((d) => {
      if (d.coords) {
        cats[d.category] = (cats[d.category] || 0) + 1;
      }
    });
    return cats;
  }, []);

  return (
    <>
      <SEO
        title="Travel Map"
        description="Explore all the destinations I've visited on an interactive world map. From the Himalayas to tropical beaches."
      />

      <div className={styles.mapPage}>
        {/* Header overlay */}
        <div className={styles.headerOverlay}>
          <motion.div
            className={styles.headerContent}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={styles.title}>
              <FiMap size={28} />
              Travel <span>Map</span>
            </h1>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            className={styles.filterBar}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <button
              className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
              onClick={() => setFilter('all')}
            >
              <FiGlobe size={14} />
              All ({destinations.filter((d) => d.coords).length})
            </button>
            <button
              className={`${styles.filterBtn} ${filter === 'india' ? styles.active : ''}`}
              onClick={() => setFilter('india')}
            >
              <FiFlag size={14} />
              India ({indiaCount})
            </button>
            <button
              className={`${styles.filterBtn} ${filter === 'world' ? styles.active : ''}`}
              onClick={() => setFilter('world')}
            >
              <FiGlobe size={14} />
              World ({worldCount})
            </button>

            <div className={styles.filterDivider} />

            <button
              className={`${styles.filterBtn} ${styles.toggleBtn} ${showPaths ? styles.active : ''}`}
              onClick={() => setShowPaths(!showPaths)}
            >
              <FiNavigation size={14} />
              Flight Paths
            </button>
          </motion.div>
        </div>

        {/* Counter overlay */}
        <motion.div
          className={styles.counterOverlay}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className={styles.counterMain}>
            <AnimatePresence mode="wait">
              <motion.span
                key={filteredCount}
                className={styles.counterNumber}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {filteredCount}
              </motion.span>
            </AnimatePresence>
            <span className={styles.counterLabel}>
              Destinations Visited
            </span>
          </div>
          <div className={styles.counterCategories}>
            {Object.entries(categories).map(([cat, count]) => (
              <div key={cat} className={styles.catItem}>
                <span className={styles.catDot} data-category={cat} />
                <span className={styles.catName}>{cat}</span>
                <span className={styles.catCount}>{count}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Map container */}
        <div className={styles.mapContainer}>
          <TravelMap filter={filter} showFlightPaths={showPaths} />
        </div>
      </div>
    </>
  );
}
