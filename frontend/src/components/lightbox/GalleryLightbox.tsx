import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import styles from '@/styles/GalleryLightbox.module.css';
import type { MediaAsset } from '@/types/content';
import { buildCloudinaryUrl } from '@/lib/strapi';

interface GalleryLightboxProps {
  items: MediaAsset[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function GalleryLightbox({ items, index, onClose, onNavigate }: GalleryLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
      if (event.key === 'ArrowRight') {
        onNavigate((index + 1) % items.length);
      }
      if (event.key === 'ArrowLeft') {
        onNavigate((index - 1 + items.length) % items.length);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [index, items.length, onClose, onNavigate]);

  const item = items[index];
  const isVideo = item.mime.startsWith('video');

  return (
    <AnimatePresence>
      <motion.div className={styles.backdrop} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className={styles.dialog} initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Cerrar">
            <FiX size={24} />
          </button>
          <button
            type="button"
            className={styles.navButton}
            onClick={() => onNavigate((index - 1 + items.length) % items.length)}
            aria-label="Anterior"
          >
            <FiChevronLeft size={28} />
          </button>
          <div className={styles.mediaWrapper}>
            {isVideo ? (
              <video controls className={styles.media} poster={item.previewUrl ?? item.url}>
                <source src={buildCloudinaryUrl(item.url, 'f_auto,q_auto')} />
                Tu navegador no soporta la reproducción de video.
              </video>
            ) : (
              <img className={styles.media} src={buildCloudinaryUrl(item.url, 'f_auto,q_auto')} alt={item.alt ?? ''} />
            )}
            {item.caption && <p className={styles.caption}>{item.caption}</p>}
          </div>
          <button
            type="button"
            className={styles.navButton}
            onClick={() => onNavigate((index + 1) % items.length)}
            aria-label="Siguiente"
          >
            <FiChevronRight size={28} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
