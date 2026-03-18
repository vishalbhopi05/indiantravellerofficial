import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiMapPin, FiInstagram, FiArrowRight, FiGlobe, FiFlag, FiCamera, FiEdit3 } from 'react-icons/fi';
import SEO from '@/components/SEO/SEO';
import HeroCarousel from '@/components/HeroCarousel/HeroCarousel';
import AnimatedSection from '@/components/AnimatedSection/AnimatedSection';
import PhotoGallery from '@/components/PhotoGallery/PhotoGallery';
import VideoGallery from '@/components/VideoGallery/VideoGallery';
import BlogCard from '@/components/BlogCard/BlogCard';
import TripCard from '@/components/TripCard/TripCard';
import {
  aboutData,
  destinations,
  plannedTrips,
  blogPosts,
  instagramGallery,
  siteConfig,
} from '@/data/siteData';
import styles from '@/styles/Home.module.scss';

export default function Home() {
  const [destFilter, setDestFilter] = useState('all');

  const filteredDestinations = destinations.filter((dest) => {
    if (destFilter === 'india') return dest.location.toLowerCase().includes('india');
    if (destFilter === 'world') return !dest.location.toLowerCase().includes('india');
    return true;
  });

  return (
    <>
      <SEO />

      {/* 1. Hero Carousel */}
      <HeroCarousel />

      {/* 2. About / Meet the Travellers Section */}
      <section className={styles.about}>
        <div className={styles.aboutInner}>
          <AnimatedSection animation="fadeUp">
            <h2 className="section__title">
              Meet <span>The Travellers</span>
            </h2>
            <p className="section__subtitle">{aboutData.subheadline}</p>
          </AnimatedSection>

          {/* Traveller Cards */}
          <div className={styles.travellersGrid}>
            {aboutData.travellers.map((traveller, i) => (
              <AnimatedSection
                key={traveller.id}
                animation={i === 0 ? 'fadeRight' : 'fadeLeft'}
                delay={0.15 * i}
              >
                <div className={styles.travellerCard}>
                  {/* Full-bleed background image */}
                  <Image
                    src={traveller.image}
                    alt={traveller.name}
                    fill
                    sizes="(max-width: 768px) 90vw, 50vw"
                    quality={85}
                    className={styles.travellerBg}
                  />
                  {/* Gradient overlay */}
                  <div className={styles.travellerOverlay} />
                  {/* Content on top */}
                  <div className={styles.travellerContent}>
                    <div className={styles.travellerTop}>
                      <div className={styles.travellerTags}>
                        {traveller.specialties.map((tag) => (
                          <span key={tag} className={styles.tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className={styles.travellerBottom}>
                      <span className={styles.travellerRole}>{traveller.role}</span>
                      <h3 className={styles.travellerName}>{traveller.name}</h3>
                      <p className={styles.travellerBio}>{traveller.bio}</p>
                      <a
                        href={traveller.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.travellerSocial}
                      >
                        <FiInstagram size={15} />
                        Follow on Instagram
                        <FiArrowRight size={13} />
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Shared Stats */}
          <div className={styles.aboutStats}>
            {aboutData.stats.map((stat, i) => (
              <AnimatedSection
                key={stat.label}
                animation="scaleUp"
                delay={0.3 + i * 0.1}
              >
                <div className={styles.statItem}>
                  <h3>{stat.number}</h3>
                  <p>{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Destinations */}
      <section className={styles.destinations}>
        <div className={styles.destinationsInner}>
          <AnimatedSection animation="fadeUp">
            <h2 className="section__title">
              Featured <span>Destinations</span>
            </h2>
            <p className="section__subtitle">
              Handpicked places that left a lasting impression on my soul
            </p>
          </AnimatedSection>

          {/* Filter Tabs */}
          <div className={styles.destTabs}>
            <button
              className={`${styles.destTab} ${destFilter === 'all' ? styles.destTabActive : ''}`}
              onClick={() => setDestFilter('all')}
            >
              <FiGlobe size={16} />
              All Destinations
            </button>
            <button
              className={`${styles.destTab} ${destFilter === 'india' ? styles.destTabActive : ''}`}
              onClick={() => setDestFilter('india')}
            >
              <FiFlag size={16} />
              Explore India
            </button>
            <button
              className={`${styles.destTab} ${destFilter === 'world' ? styles.destTabActive : ''}`}
              onClick={() => setDestFilter('world')}
            >
              <FiGlobe size={16} />
              Explore World
            </button>
          </div>

          <AnimatedSection useGsap gsapAnimation="stagger">
            <div className={styles.destinationsGrid} key={destFilter}>
              {filteredDestinations.map((dest) => (
                <Link
                  key={dest.id}
                  href={`/blog/${dest.slug}`}
                  className={styles.destCard}
                >
                  <div className={styles.destImage}>
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={80}
                    />
                  </div>
                  <div className={styles.destOverlay}>
                    <span className={styles.destCategory}>{dest.category}</span>
                    <h3 className={styles.destName}>{dest.name}</h3>
                    <span className={styles.destLocation}>
                      <FiMapPin size={13} />
                      {dest.location}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 4. Photo Showcase */}
      <PhotoGallery />

      {/* 5. Travel Videos */}
      <VideoGallery />

      {/* 6. Upcoming Planned Trips */}
      <section className={styles.upcomingTrips}>
        <div className={styles.upcomingInner}>
          <AnimatedSection animation="fadeUp">
            <h2 className="section__title">
              Upcoming <span>Adventures</span>
            </h2>
            <p className="section__subtitle">
              The next journeys on my travel calendar — follow along!
            </p>
          </AnimatedSection>
          <div className={styles.upcomingGrid}>
            {plannedTrips.map((trip, i) => (
              <AnimatedSection key={trip.id} animation="fadeUp" delay={i * 0.1}>
                <TripCard trip={trip} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className={styles.blogPreview}>
        <div className={styles.blogPreviewInner}>
          <AnimatedSection animation="fadeUp">
            <h2 className="section__title">
              Latest <span>Stories</span>
            </h2>
            <p className="section__subtitle">
              Read about my latest travel experiences and photography adventures
            </p>
          </AnimatedSection>
          <div className={styles.blogGrid}>
            {blogPosts.slice(0, 3).map((post, i) => (
              <AnimatedSection key={post.id} animation="fadeUp" delay={i * 0.1}>
                <BlogCard post={post} />
              </AnimatedSection>
            ))}
          </div>
          <div className={styles.viewAllBtn}>
            <Link href="/blog" className="btn btn--outline">
              View All Stories <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Instagram Gallery Strip */}
      <section className={styles.instaSection}>
        <div className={styles.instaHeader}>
          <AnimatedSection animation="fadeUp">
            <h2 className="section__title">
              <FiInstagram style={{ verticalAlign: 'middle', marginRight: '12px' }} />
              <span>@indiantravellerofficial</span>
            </h2>
            <p className="section__subtitle">
              Follow the journey on Instagram — daily doses of wanderlust
            </p>
          </AnimatedSection>
        </div>
        <div className={styles.instaStrip}>
          {instagramGallery.map((img, i) => (
            <a
              key={i}
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.instaItem}
            >
              <Image
                src={img}
                alt={`Instagram post ${i + 1}`}
                fill
                sizes="300px"
                quality={75}
              />
              <div className={styles.instaOverlay}>
                <FiInstagram />
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
