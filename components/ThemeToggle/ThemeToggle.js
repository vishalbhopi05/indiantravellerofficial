import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import styles from './ThemeToggle.module.scss';

export default function ThemeToggle({ className = '' }) {
  const { toggleTheme, isDark } = useTheme();

  const spring = { type: 'spring', stiffness: 500, damping: 28 };

  return (
    <motion.button
      className={`${styles.toggle} ${className}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      whileTap={{ scale: 0.9 }}
    >
      <div className={styles.track} data-dark={isDark}>
        {/* Sliding knob */}
        <motion.div
          className={styles.knob}
          layout
          transition={spring}
        >
          {/* Icon container */}
          <div className={styles.iconWrap}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Moon body — always rendered, masked to crescent in dark mode */}
              <defs>
                <mask id="theme-mask">
                  <rect x="0" y="0" width="100%" height="100%" fill="white" />
                  <motion.circle
                    r="7"
                    fill="black"
                    animate={{ cx: isDark ? 19 : 33, cy: isDark ? 6 : -2 }}
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                  />
                </mask>
              </defs>

              <motion.circle
                cx="12"
                cy="12"
                fill="currentColor"
                mask="url(#theme-mask)"
                animate={{ r: isDark ? 8 : 5 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
              />

              {/* Sun rays — radiate out in light mode */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <motion.line
                  key={angle}
                  x1="12"
                  y1="12"
                  x2="12"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{ transformOrigin: '12px 12px', rotate: `${angle}deg` }}
                  animate={{
                    y1: isDark ? 12 : 2.5,
                    y2: isDark ? 12 : 5,
                    opacity: isDark ? 0 : 1,
                  }}
                  transition={{ duration: 0.35, ease: 'easeInOut', delay: isDark ? 0 : 0.15 }}
                />
              ))}
            </svg>
          </div>
        </motion.div>

        {/* Stars (visible in dark mode inside track) */}
        <motion.div
          className={styles.stars}
          animate={{ opacity: isDark ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className={styles.star} style={{ top: '5px', left: '8px', animationDelay: '0s' }} />
          <span className={styles.star} style={{ top: '14px', left: '16px', animationDelay: '0.6s' }} />
          <span className={styles.star} style={{ top: '8px', left: '24px', animationDelay: '1.2s' }} />
        </motion.div>
      </div>
    </motion.button>
  );
}
