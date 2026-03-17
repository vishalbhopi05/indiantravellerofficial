import { useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import styles from './ReadingProgress.module.scss';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  // Smooth spring animation for the progress bar width
  const scaleX = useSpring(0, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const calculateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight <= 0) {
        setProgress(0);
        scaleX.set(0);
        return;
      }

      const scrollPercent = Math.min(scrollTop / docHeight, 1);
      setProgress(scrollPercent);
      scaleX.set(scrollPercent);
    };

    // Calculate on mount
    calculateProgress();

    window.addEventListener('scroll', calculateProgress, { passive: true });
    window.addEventListener('resize', calculateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', calculateProgress);
      window.removeEventListener('resize', calculateProgress);
    };
  }, [scaleX]);

  return (
    <div className={styles.container} role="progressbar" aria-valuenow={Math.round(progress * 100)} aria-valuemin={0} aria-valuemax={100}>
      <motion.div
        className={styles.bar}
        style={{ scaleX }}
      />
    </div>
  );
}
