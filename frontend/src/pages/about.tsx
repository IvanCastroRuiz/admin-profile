import Layout from '@/components/Layout';
import CtaStrip from '@/components/CtaStrip';
import styles from '@/styles/About.module.css';

const timeline = [
  {
    year: '2017',
    title: 'Nacimiento de Straplis',
    description: 'Iniciamos como un colectivo audiovisual especializado en bodas y celebraciones íntimas.'
  },
  {
    year: '2019',
    title: 'Eventos corporativos',
    description: 'Integramos equipos de producción en vivo y streaming para lanzamientos de marca en toda Latinoamérica.'
  },
  {
    year: '2022',
    title: 'Experiencias inmersivas',
    description: 'Sumamos iluminación escénica, XR y contenidos 360 para festivales y conciertos.'
  }
];

const values = [
  {
    title: 'Diseño centrado en emociones',
    description: 'Nos enfocamos en sensaciones: iluminación, sonido y narrativa visual que conecte con la audiencia.'
  },
  {
    title: 'Integración tecnológica',
    description: 'Automatizamos flujos con Strapi, Cloudinary y herramientas de streaming para acelerar entregas.'
  },
  {
    title: 'Equipos colaborativos',
    description: 'Productores, fotógrafos y desarrolladores trabajan junto a los clientes en cada fase.'
  }
];

export default function AboutPage() {
  return (
    <Layout title="Nosotros" description="Conoce al equipo creativo de Straplis y nuestra manera de producir eventos visuales.">
      <section className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className="section-title">Nuestra historia</h1>
          <p>
            Straplis es un estudio creativo que combina dirección artística, producción técnica y desarrollo de software para crear
            eventos inolvidables. Creemos que cada proyecto merece una narrativa visual única.
          </p>
        </header>
        <div className={styles.timeline}>
          {timeline.map((milestone) => (
            <div key={milestone.year} className={styles.milestone}>
              <span className={styles.year}>{milestone.year}</span>
              <h3>{milestone.title}</h3>
              <p>{milestone.description}</p>
            </div>
          ))}
        </div>
        <section className={styles.values}>
          {values.map((value) => (
            <article key={value.title} className={styles.valueCard}>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </section>
      </section>
      <CtaStrip
        title="Seamos socios en tu próxima producción"
        description="Unimos creatividad, storytelling y tecnología para amplificar la voz de tu marca."
        ctaLabel="Hablemos"
        ctaHref="/contact"
      />
    </Layout>
  );
}
