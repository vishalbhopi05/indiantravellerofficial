import Link from 'next/link';
import { FiInstagram, FiYoutube, FiMail } from 'react-icons/fi';
import { siteConfig } from '@/data/siteData';
import AnimatedSection from '../AnimatedSection/AnimatedSection';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <AnimatedSection animation="fadeUp">
          <div className={styles.footerGrid}>
            {/* Brand */}
            <div className={styles.brand}>
              <h3>
                Indian<span>Traveller</span>
              </h3>
              <p>
                Capturing the soul of every journey. A travel photography
                portfolio showcasing breathtaking destinations, stories, and
                upcoming adventures from around the world.
              </p>
              <div className={styles.socialLinks}>
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FiInstagram />
                </a>
                <a
                  href={siteConfig.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <FiYoutube />
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  aria-label="Email"
                >
                  <FiMail />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.column}>
              <h4>Explore</h4>
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/blog">Travel Blog</Link>
                </li>
                <li>
                  <Link href="/planned-trips">Planned Trips</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className={styles.column}>
              <h4>Categories</h4>
              <ul>
                <li>
                  <Link href="/blog">Mountains</Link>
                </li>
                <li>
                  <Link href="/blog">Beaches</Link>
                </li>
                <li>
                  <Link href="/blog">Cities</Link>
                </li>
                <li>
                  <Link href="/blog">Forests</Link>
                </li>
                <li>
                  <Link href="/blog">Road Trips</Link>
                </li>
              </ul>
            </div>
          </div>
        </AnimatedSection>

        <div className={styles.footerBottom}>
          <p>
            &copy; {new Date().getFullYear()} <span>{siteConfig.name}</span>.
            All rights reserved.
          </p>
          <p>
            Made with <span>♥</span> for the love of travel
          </p>
        </div>
      </div>
    </footer>
  );
}
