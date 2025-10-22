import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from '@/styles/Hero.module.css';

interface HeroProps {
  headline: string;
  subHeadline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  media?: {
    posterUrl?: string;
    videoUrl?: string;
  };
}

export function Hero({ headline, subHeadline, ctaLabel = 'Ver portafolio', ctaHref = '/portfolio', media }: HeroProps) {
  const hasMedia = Boolean(media?.videoUrl || media?.posterUrl);

  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      {media?.videoUrl ? (
        <video
          className={styles.media}
          poster={media.posterUrl}
          preload="none"
          playsInline
          autoPlay
          loop
          muted
        >
          <source src={media.videoUrl} type="video/mp4" />
        </video>
      ) : hasMedia && media?.posterUrl ? (
        <img className={styles.media} src={media.posterUrl} alt="Eventos Straplis" />
      ) : (
        <div className={styles.fallback} />
      )}
      <div className={styles.content}>
        <motion.h1 className={styles.headline} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          {headline}
        </motion.h1>
        {subHeadline && (
          <motion.p className={styles.subHeadline} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            {subHeadline}
          </motion.p>
        )}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Link href={ctaHref} className="cta">
            {ctaLabel}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
