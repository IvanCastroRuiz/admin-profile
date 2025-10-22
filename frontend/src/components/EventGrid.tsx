import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from '@/styles/EventGrid.module.css';
import type { EventSummary } from '@/types/content';

interface EventGridProps {
  events: EventSummary[];
}

export function EventGrid({ events }: EventGridProps) {
  return (
    <div className={styles.grid}>
      {events.map((event) => (
        <Link key={event.slug} href={`/events/${event.slug}`} className={styles.card}>
          <motion.div whileHover={{ scale: 1.02 }} className="card-surface">
            <div className={styles.mediaWrapper}>
              {event.cover && (
                <Image
                  src={event.cover.url}
                  alt={event.cover.alt ?? event.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              )}
            </div>
            <div className={styles.cardContent}>
              <span className={styles.category}>{event.category?.name}</span>
              <h3>{event.title}</h3>
              <p>{event.location}</p>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}

export default EventGrid;
