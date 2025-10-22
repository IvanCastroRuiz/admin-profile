import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from '@/styles/Gallery.module.css';
import type { MediaAsset } from '@/types/content';
import { GalleryLightbox } from './lightbox/GalleryLightbox';

interface GalleryProps {
  items: MediaAsset[];
  aspectRatio?: string;
}

export function Gallery({ items, aspectRatio = '16/10' }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section>
      <div className={styles.grid}>
        {items.map((item, index) => (
          <motion.button
            key={item.id}
            type="button"
            className={styles.thumbnail}
            onClick={() => handleSelect(index)}
            whileHover={{ scale: 1.02 }}
            style={{ aspectRatio }}
          >
            <Image
              src={item.url}
              alt={item.alt ?? `Media ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
              style={{ objectFit: 'cover' }}
            />
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {activeIndex !== null && (
          <GalleryLightbox
            items={items}
            index={activeIndex}
            onClose={() => setActiveIndex(null)}
            onNavigate={(nextIndex) => setActiveIndex(nextIndex)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

export default Gallery;
