import SEO from '@/components/SEO/SEO';
import AnimatedSection from '@/components/AnimatedSection/AnimatedSection';
import TripCard from '@/components/TripCard/TripCard';
import { plannedTrips } from '@/data/siteData';
import styles from '@/styles/PlannedTrips.module.scss';

export default function PlannedTripsPage() {
  return (
    <>
      <SEO
        title="Planned Trips"
        description="Check out upcoming travel adventures and planned trips by IndianTravellerOfficial."
      />

      <div className={styles.page}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <AnimatedSection animation="fadeUp">
              <h1 className={styles.heroTitle}>
                Planned <span>Adventures</span>
              </h1>
              <p className={styles.heroSubtitle}>
                The next destinations on my travel radar. Follow along and maybe
                even join the journey!
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Trips Grid */}
        <section className={styles.content}>
          <div className={styles.inner}>
            {plannedTrips.length > 0 ? (
              <div className={styles.grid}>
                {plannedTrips.map((trip, i) => (
                  <AnimatedSection
                    key={trip.id}
                    animation="fadeUp"
                    delay={i * 0.1}
                  >
                    <TripCard trip={trip} />
                  </AnimatedSection>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <h3>No trips planned yet</h3>
                <p>Stay tuned — new adventures are always around the corner!</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
