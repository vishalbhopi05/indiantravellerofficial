import Image from 'next/image';
import { FiMapPin, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import styles from './TripCard.module.scss';

export default function TripCard({ trip }) {
  const statusClass =
    trip.status === 'Upcoming'
      ? styles.upcoming
      : trip.status === 'Planning'
      ? styles.planning
      : styles.wishlist;

  return (
    <motion.div
      className={styles.card}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.imageWrap}>
        <Image
          src={trip.image}
          alt={trip.destination}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={80}
        />
        <div className={styles.overlay} />
        <span className={`${styles.status} ${statusClass}`}>
          {trip.status}
        </span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.destination}>{trip.destination}</h3>
        <span className={styles.location}>
          <FiMapPin size={14} />
          {trip.location}
        </span>
        <span className={styles.date}>
          <FiCalendar size={14} />
          {trip.date}
        </span>
        <p className={styles.description}>{trip.description}</p>
        <button className={styles.joinBtn}>
          Join or Follow Journey <FiArrowRight size={14} />
        </button>
      </div>
    </motion.div>
  );
}
