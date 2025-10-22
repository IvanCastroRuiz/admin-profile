import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Layout from '@/components/Layout';
import Gallery from '@/components/Gallery';
import CtaStrip from '@/components/CtaStrip';
import styles from '@/styles/EventDetail.module.css';
import { buildCloudinaryUrl, fetchEventBySlug, fetchEvents } from '@/lib/strapi';
import type { EventDetail } from '@/types/content';

interface EventDetailPageProps {
  event: EventDetail;
}

export default function EventDetailPage({ event }: EventDetailPageProps) {
  return (
    <Layout title={event.title} description={event.seo?.metaDescription ?? event.description.slice(0, 160)}>
      <article className={styles.wrapper}>
        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.category}>{event.category?.name}</span>
            <h1 className="section-title">{event.title}</h1>
            <div className={styles.details}>
              {event.eventDate && <span>{new Date(event.eventDate).toLocaleDateString('es-ES')}</span>}
              <span>{event.location}</span>
              {event.client && <span>Cliente: {event.client}</span>}
            </div>
          </div>
          {event.cover && (
            <div className={styles.coverWrapper}>
              <Image
                src={buildCloudinaryUrl(event.cover.url, 'f_auto,q_auto,c_fill,w_1200')}
                alt={event.cover.alt ?? event.title}
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}
        </header>
        <section className={styles.description}>
          <h2 className="section-title">Narrativa</h2>
          <p>{event.description}</p>
        </section>
        {!!event.gallery.length && (
          <section className={styles.section}>
            <h2 className="section-title">Galería</h2>
            <Gallery items={event.gallery} />
          </section>
        )}
        {!!event.videos.length && (
          <section className={styles.section}>
            <h2 className="section-title">Videos</h2>
            <div className={styles.videoGrid}>
              {event.videos.map((video) => (
                <video
                  key={video.id}
                  className={styles.videoPlayer}
                  poster={video.previewUrl ?? video.url}
                  controls
                  preload="none"
                >
                  <source src={buildCloudinaryUrl(video.url, 'f_auto,q_auto')} />
                  Tu navegador no soporta el video HTML5.
                </video>
              ))}
            </div>
          </section>
        )}
        {!!event.testimonials.length && (
          <section className={styles.section}>
            <h2 className="section-title">Testimonios</h2>
            <div className={styles.testimonials}>
              {event.testimonials.map((testimonial) => (
                <blockquote key={testimonial.id}>
                  <p>“{testimonial.text}”</p>
                  <footer>
                    — {testimonial.author}
                    {testimonial.role ? `, ${testimonial.role}` : ''}
                  </footer>
                </blockquote>
              ))}
            </div>
          </section>
        )}
      </article>
      <CtaStrip
        title="Conversemos sobre tu próximo evento"
        description="Cuéntanos sobre tu marca, tu audiencia y objetivos. Creamos un guion visual y producción a medida."
        ctaLabel="Contactar"
        ctaHref="/contact"
      />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await fetchEvents();
  return {
    paths: events.map((event) => ({ params: { slug: event.slug } })),
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps<EventDetailPageProps> = async ({ params }) => {
  const slug = params?.slug;
  if (typeof slug !== 'string') {
    return { notFound: true };
  }

  const event = await fetchEventBySlug(slug);
  if (!event) {
    return { notFound: true };
  }

  return {
    props: {
      event
    },
    revalidate: 60
  };
};
