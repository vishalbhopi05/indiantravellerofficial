import Image from 'next/image';
import Link from 'next/link';
import { FiMapPin, FiArrowRight, FiClock } from 'react-icons/fi';
import styles from './BlogCard.module.scss';

export default function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={80}
        />
        <span className={styles.category}>{post.category}</span>
      </div>
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.location}>
            <FiMapPin size={12} />
            {post.location}
          </span>
          <span className={styles.dot} />
          <span>{post.date}</span>
          <span className={styles.dot} />
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <FiClock size={11} />
            {post.readTime}
          </span>
        </div>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <span className={styles.readMore}>
          Read More <FiArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}
