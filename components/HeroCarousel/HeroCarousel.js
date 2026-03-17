import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { heroSlides } from '@/data/siteData';
import styles from './HeroCarousel.module.scss';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={styles.hero}>
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={1200}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        style={{ width: '100%', height: '100%' }}
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className={styles.slide}>
              <div className={styles.slideImage}>
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="100vw"
                  priority={index === 0}
                  quality={85}
                />
              </div>
              <div className={styles.slideOverlay} />
              <div className={styles.slideContent}>
                <AnimatePresence mode="wait">
                  {activeIndex === index && (
                    <motion.div
                      key={slide.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <motion.h1
                        className={styles.slideTitle}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                      >
                        {slide.title}
                      </motion.h1>
                      <motion.p
                        className={styles.slideSubtitle}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                      >
                        {slide.subtitle}
                      </motion.p>
                      <motion.button
                        className={styles.slideCta}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {slide.cta}
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.scrollIndicator}>
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
