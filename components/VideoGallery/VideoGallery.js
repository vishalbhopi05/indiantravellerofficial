import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiMapPin, FiX } from 'react-icons/fi';
import { travelVideos } from '@/data/siteData';
import AnimatedSection from '../AnimatedSection/AnimatedSection';
import styles from './VideoGallery.module.scss';

export default function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className={styles.section} id="videos">
      <div className={styles.inner}>
        <AnimatedSection animation="fadeUp">
          <h2 className="section__title">
            Travel <span>Videos</span>
          </h2>
          <p className="section__subtitle">
            Cinematic stories from the road — watch the journeys unfold
          </p>
        </AnimatedSection>

        <AnimatedSection useGsap gsapAnimation="stagger">
          <div className={styles.grid}>
            {travelVideos.map((video) => (
              <div
                key={video.id}
                className={styles.card}
                onClick={() => setActiveVideo(video)}
              >
                <div className={styles.thumbnail}>
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    quality={80}
                  />
                  <div className={styles.playBtn}>
                    <FiPlay />
                  </div>
                  <span className={styles.duration}>{video.duration}</span>
                </div>
                <div className={styles.info}>
                  <h3 className={styles.videoTitle}>{video.title}</h3>
                  <span className={styles.videoLocation}>
                    <FiMapPin size={14} />
                    {video.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
          >
            <button
              className={styles.modalClose}
              onClick={() => setActiveVideo(null)}
            >
              <FiX />
            </button>
            <motion.div
              className={styles.modalContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`${activeVideo.videoUrl}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
