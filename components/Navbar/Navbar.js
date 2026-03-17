import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { FiInstagram, FiYoutube } from 'react-icons/fi';
import { siteConfig } from '@/data/siteData';
import styles from './Navbar.module.scss';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Planned Trips', href: '/planned-trips' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [router.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navInner}>
        <Link href="/" className={styles.logo}>
          Indian<span>Traveller</span>
        </Link>

        {/* Desktop Links */}
        <div className={styles.navLinks}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navLink} ${
                router.pathname === item.href ? styles.active : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.open : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className={styles.mobileOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className={styles.mobileMenu}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <Link
                    href={item.href}
                    className={`${styles.mobileLink} ${
                      router.pathname === item.href ? styles.active : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <div className={styles.mobileSocial}>
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiInstagram />
                </a>
                <a
                  href={siteConfig.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiYoutube />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
