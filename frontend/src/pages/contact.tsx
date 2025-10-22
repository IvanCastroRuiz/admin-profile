import { FormEvent, useState } from 'react';
import Layout from '@/components/Layout';
import styles from '@/styles/Contact.module.css';

interface FormState {
  name: string;
  email: string;
  message: string;
  company: string;
  eventType: string;
}

const INITIAL_STATE: FormState = {
  name: '',
  email: '',
  message: '',
  company: '',
  eventType: ''
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contact-submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: form })
      });

      if (!response.ok) {
        throw new Error('Failed to submit contact form');
      }

      setStatus('success');
      setForm(INITIAL_STATE);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <Layout title="Contacto" description="Agenda una llamada con nuestro equipo de producción.">
      <section className={styles.wrapper}>
        <header className={styles.header}>
          <h1 className="section-title">Hablemos de tu evento</h1>
          <p>
            Comparte los detalles principales y nuestro equipo se pondrá en contacto en menos de 24 horas con una propuesta.
          </p>
        </header>
        <div className={styles.content}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label>
              Nombre completo
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={(event) => setForm((state) => ({ ...state, name: event.target.value }))}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={(event) => setForm((state) => ({ ...state, email: event.target.value }))}
                required
              />
            </label>
            <label>
              Empresa / Marca
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={(event) => setForm((state) => ({ ...state, company: event.target.value }))}
              />
            </label>
            <label>
              Tipo de evento
              <input
                type="text"
                name="eventType"
                value={form.eventType}
                onChange={(event) => setForm((state) => ({ ...state, eventType: event.target.value }))}
              />
            </label>
            <label>
              Cuéntanos más
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={(event) => setForm((state) => ({ ...state, message: event.target.value }))}
              />
            </label>
            <button className="cta" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Enviando…' : 'Enviar mensaje'}
            </button>
            {status === 'success' && <p className={styles.feedback}>¡Gracias! Responderemos muy pronto.</p>}
            {status === 'error' && <p className={styles.feedbackError}>No se pudo enviar. Intenta nuevamente.</p>}
          </form>
          <aside className={styles.sidebar}>
            <div className={styles.card}>
              <h2>Información de contacto</h2>
              <p>hola@straplis.com</p>
              <p>+54 11 5555-1234</p>
            </div>
            <div className={styles.card}>
              <h2>Ubicación</h2>
              <p>Av. Dorrego 1898, CABA, Argentina</p>
              <iframe
                title="Mapa"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.905258114933!2d-58.43608552362087!3d-34.60744107295354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca71678107f5%3A0xa9c7b0d32599ef61!2sAv.%20Dorrego%201898%2C%20C1414%20CABA!5e0!3m2!1ses-419!2sar!4v1683140050236!5m2!1ses-419!2sar"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
