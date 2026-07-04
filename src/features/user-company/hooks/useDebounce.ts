'use client';
import { useState, useEffect } from 'react';

/**
 * Debounce a value — useful for search inputs.
 * Usage: const debouncedQuery = useDebounce(searchQuery, 300);
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState<T>(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
