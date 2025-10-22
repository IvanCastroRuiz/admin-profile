import clsx from 'clsx';
import styles from '@/styles/CategoryRail.module.css';

export interface CategoryOption {
  id: number | string;
  name: string;
  slug: string;
}

interface CategoryRailProps {
  categories: CategoryOption[];
  selected?: string | null;
  onSelect?: (slug: string | null) => void;
  direction?: 'vertical' | 'horizontal';
}

export function CategoryRail({ categories, selected, onSelect, direction = 'vertical' }: CategoryRailProps) {
  return (
    <div className={clsx(styles.rail, direction === 'horizontal' && styles.horizontal)}>
      <button
        type="button"
        className={clsx(styles.categoryButton, !selected && styles.categoryButtonActive)}
        onClick={() => onSelect?.(null)}
      >
        Todos
      </button>
      {categories.map((category) => (
        <button
          key={category.slug}
          type="button"
          className={clsx(styles.categoryButton, selected === category.slug && styles.categoryButtonActive)}
          onClick={() => onSelect?.(category.slug)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryRail;
