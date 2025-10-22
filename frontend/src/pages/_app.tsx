import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import '@/styles/globals.css';

const seoConfig = {
  titleTemplate: '%s | Straplis Events',
  defaultTitle: 'Straplis Events Portfolio',
  description:
    'Descubre eventos inolvidables creados por Straplis. Fotografía, video y experiencias únicas capturadas con amor y tecnología.',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'Straplis Events'
  }
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...seoConfig} />
      <Component {...pageProps} />
    </>
  );
}
