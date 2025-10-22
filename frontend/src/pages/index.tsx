import { GetStaticProps } from 'next';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import EventGrid from '@/components/EventGrid';
import CategoryRail from '@/components/CategoryRail';
import CtaStrip from '@/components/CtaStrip';
import styles from '@/styles/Home.module.css';
import { fetchCategories, fetchFeaturedEvents } from '@/lib/strapi';
import type { Category, EventSummary } from '@/types/content';

interface HomePageProps {
  featuredEvents: EventSummary[];
  categories: Category[];
}

export default function HomePage({ featuredEvents, categories }: HomePageProps) {
  return (
    <Layout>
      <Hero
        headline="Capturamos la energía de cada evento"
        subHeadline="Diseñamos experiencias memorables con fotografía, video y producción impecable para que tus momentos brillen."
        media={{
          posterUrl: '/hero-fallback.jpg'
        }}
      />
      <section className={styles.showcase}>
        <aside className={styles.sidebar}>
          <h2 className="section-title">Categorías destacadas</h2>
          <CategoryRail categories={categories} direction="vertical" />
        </aside>
        <div className={styles.gridArea}>
          <div className={styles.sectionHeading}>
            <h2 className="section-title">Últimos eventos</h2>
            <p>Explora proyectos recientes y descubre cómo transformamos ideas en experiencias inolvidables.</p>
          </div>
          <EventGrid events={featuredEvents} />
        </div>
      </section>
      <CtaStrip
        title="¿Listo para producir tu próximo evento?"
        description="Trabajamos junto a tu equipo para diseñar una narrativa visual desde la planificación hasta la puesta en escena."
        ctaLabel="Agenda una llamada"
        ctaHref="/contact"
      />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const [featuredEvents, categories] = await Promise.all([
    fetchFeaturedEvents(6),
    fetchCategories()
  ]);

  return {
    props: {
      featuredEvents,
      categories
    },
    revalidate: 60
  };
};
