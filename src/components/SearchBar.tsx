'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function SearchBar(): React.ReactElement {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className="search-wrapper"
      style={{ maxWidth: 560 }}
      animate={{
        borderColor: isFocused ? '#0f0f0e' : '#e5e5e5',
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
      }}
    >
      {/* Search icon */}
      <svg
        className="search-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#9a9a9a"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>

      <input
        type="text"
        placeholder="What do you want to do?"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="search-input"
        id="hero-search"
      />
    </motion.div>
  );
}
