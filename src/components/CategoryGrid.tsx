'use client';

import { motion } from 'framer-motion';

interface CategoryItem {
  name: string;
  toolCount: number;
}

const categories: CategoryItem[] = [
  { name: 'Writing', toolCount: 24 },
  { name: 'Coding', toolCount: 31 },
  { name: 'Image', toolCount: 18 },
  { name: 'Video', toolCount: 12 },
  { name: 'Audio', toolCount: 9 },
  { name: 'Research', toolCount: 21 },
  { name: 'Productivity', toolCount: 27 },
  { name: 'Data', toolCount: 15 },
  { name: 'Marketing', toolCount: 19 },
  { name: 'Support', toolCount: 11 },
];

function CategoryCard({ name, toolCount }: CategoryItem): React.JSX.Element {
  return (
    <motion.div
      whileHover={{
        borderColor: '#0f0f0e',
        y: -2,
      }}
      transition={{
        duration: 0.15,
        ease: 'easeOut',
      }}
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e5e5e5',
        borderRadius: '12px',
        padding: '20px',
        cursor: 'pointer',
      }}
    >
      <p
        style={{
          fontSize: '14px',
          fontWeight: 500,
          color: '#0f0f0e',
          margin: 0,
          lineHeight: 1.4,
        }}
      >
        {name}
      </p>
      <p
        style={{
          fontSize: '12px',
          fontWeight: 400,
          color: '#9b9b9b',
          margin: 0,
          marginTop: '6px',
          lineHeight: 1.4,
        }}
      >
        {toolCount} tools
      </p>
    </motion.div>
  );
}

export function CategoryGrid(): React.JSX.Element {
  return (
    <section
      style={{
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '64px 24px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '16px',
        }}
      >
        {categories.map((category) => (
          <CategoryCard
            key={category.name}
            name={category.name}
            toolCount={category.toolCount}
          />
        ))}
      </div>
    </section>
  );
}
