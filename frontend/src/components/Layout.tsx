import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { FiInstagram, FiMail, FiMenu } from 'react-icons/fi';
import styles from '@/styles/Layout.module.css';
import { useState } from 'react';

interface LayoutProps {
  title?: string;
  description?: string;
  children: ReactNode;
}

const NAV_ITEMS = [
  { href: '/', label: 'Inicio' },
  { href: '/portfolio', label: 'Portafolio' },
  { href: '/about', label: 'Nosotros' },
  { href: '/contact', label: 'Contacto' }
];

export function Layout({ title, description, children }: LayoutProps) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <Head>
        {title ? <title>{`${title} | Straplis Events`}</title> : <title>Straplis Events</title>}
        {description && <meta name="description" content={description} />}
      </Head>
      <div className={styles.shell}>
        <header className={styles.header}>
          <Link href="/" className={styles.logo}>
            Straplis
          </Link>
          <nav className={styles.nav}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={router.pathname === item.href ? styles.activeNavItem : styles.navItem}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            aria-label="Abrir menú"
            className={styles.mobileToggle}
            onClick={() => setIsMobileMenuOpen((state) => !state)}
          >
            <FiMenu size={24} />
          </button>
        </header>

        {isMobileMenuOpen && (
          <div className={styles.mobileNav}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={router.pathname === item.href ? styles.activeNavItem : styles.navItem}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}

        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} Straplis Events. Todos los derechos reservados.</p>
          <div className={styles.footerLinks}>
            <Link href="mailto:hola@straplis.com" aria-label="Enviar correo">
              <FiMail />
            </Link>
            <Link href="https://instagram.com" aria-label="Instagram">
              <FiInstagram />
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Layout;
