import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMaximize2 } from 'react-icons/fi';
import { galleryImages } from '@/data/siteData';
import AnimatedSection from '../AnimatedSection/AnimatedSection';
import Lightbox from '../Lightbox/Lightbox';
import styles from './PhotoGallery.module.scss';

const categories = ['All', 'Mountains', 'Beaches', 'Cities', 'Forests', 'Road Trips'];

export default function PhotoGallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredImages = useMemo(() => {
    if (activeFilter === 'All') return galleryImages;
    return galleryImages.filter((img) => img.category === activeFilter);
  }, [activeFilter]);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () =>
    setLightboxIndex((prev) => (prev + 1) % filteredImages.length);
  const prevImage = () =>
    setLightboxIndex(
      (prev) => (prev - 1 + filteredImages.length) % filteredImages.length
    );

  return (
    <section className={styles.section} id="gallery">
      <div className={styles.header}>
        <AnimatedSection animation="fadeUp">
          <h2 className="section__title">
            Photo <span>Showcase</span>
          </h2>
          <p className="section__subtitle">
            A curated collection of moments captured across incredible destinations
          </p>
        </AnimatedSection>
        <AnimatedSection animation="fadeUp" delay={0.2}>
          <div className={styles.filters}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${
                  activeFilter === cat ? styles.active : ''
                }`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>
      </div>

      <div className={styles.masonry}>
        <AnimatePresence mode="popLayout">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              className={styles.item}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => openLightbox(index)}
            >
              <div className={styles.imageWrap}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  quality={80}
                />
                <div className={styles.itemOverlay}>
                  <span className={styles.viewIcon}>
                    <FiMaximize2 />
                  </span>
                  <span className={styles.itemCategory}>{image.category}</span>
                  <span className={styles.itemAlt}>{image.alt}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={filteredImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </section>
  );
}
