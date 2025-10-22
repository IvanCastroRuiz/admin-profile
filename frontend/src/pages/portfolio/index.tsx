import { GetStaticProps } from 'next';
import { useMemo, useState } from 'react';
import Layout from '@/components/Layout';
import EventGrid from '@/components/EventGrid';
import CategoryRail from '@/components/CategoryRail';
import styles from '@/styles/Portfolio.module.css';
import { fetchCategories, fetchEvents } from '@/lib/strapi';
import type { Category, EventSummary } from '@/types/content';

interface PortfolioPageProps {
  events: EventSummary[];
  categories: Category[];
}

export default function PortfolioPage({ events, categories }: PortfolioPageProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!selected) return events;
    return events.filter((event) => event.category?.slug === selected);
  }, [events, selected]);

  return (
    <Layout title="Portafolio" description="Explora nuestras producciones y descubre la estética Straplis">
      <section className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className="section-title">Portafolio</h1>
          <p>
            Navega por eventos categorizados. Usa los filtros para encontrar bodas, lanzamientos corporativos, festivales y más.
          </p>
          <CategoryRail categories={categories} selected={selected} onSelect={setSelected} direction="horizontal" />
        </div>
        <EventGrid events={filtered} />
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<PortfolioPageProps> = async () => {
  const [events, categories] = await Promise.all([fetchEvents(), fetchCategories()]);
  return {
    props: {
      events,
      categories
    },
    revalidate: 60
  };
};
