import Link from 'next/link';
import styles from '@/styles/CtaStrip.module.css';

interface CtaStripProps {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export function CtaStrip({ title, description, ctaLabel, ctaHref }: CtaStripProps) {
  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <h2 className="section-title">{title}</h2>
        <p>{description}</p>
      </div>
      <Link href={ctaHref} className="cta">
        {ctaLabel}
      </Link>
    </section>
  );
}

export default CtaStrip;
