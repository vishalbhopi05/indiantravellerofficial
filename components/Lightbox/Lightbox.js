import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from './Lightbox.module.scss';

export default function Lightbox({ images, currentIndex, onClose, onNext, onPrev }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  if (currentIndex === null || currentIndex === undefined) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.content}
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.imageWrapper}>
            <Image
              src={typeof currentImage === 'string' ? currentImage : currentImage.src}
              alt={typeof currentImage === 'string' ? 'Gallery image' : currentImage.alt || 'Gallery image'}
              width={1200}
              height={800}
              quality={90}
              style={{ maxHeight: '85vh', width: 'auto', height: 'auto' }}
            />
          </div>
        </motion.div>

        <button className={styles.closeBtn} onClick={onClose}>
          <FiX />
        </button>

        {images.length > 1 && (
          <>
            <button
              className={`${styles.navBtn} ${styles.prevBtn}`}
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
            >
              <FiChevronLeft />
            </button>
            <button
              className={`${styles.navBtn} ${styles.nextBtn}`}
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
            >
              <FiChevronRight />
            </button>
          </>
        )}

        <div className={styles.counter}>
          {currentIndex + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
