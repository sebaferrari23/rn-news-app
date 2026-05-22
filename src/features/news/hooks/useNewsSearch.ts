import { useMemo, useState } from 'react';
import { useDebounce } from '@/core/hooks/useDebounce';
import { News } from '../types/news.types';

const SEARCH_DEBOUNCE_MS = 300;

export function useNewsSearch(news: News[] | undefined) {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, SEARCH_DEBOUNCE_MS);

  const filteredNews = useMemo(() => {
    if (!news) {
      return [];
    }

    const normalized = debouncedQuery.toLowerCase().trim();
    if (!normalized) {
      return news;
    }

    return news.filter(
      (item) =>
        item.title.toLowerCase().includes(normalized) ||
        item.content.toLowerCase().includes(normalized),
    );
  }, [news, debouncedQuery]);

  return { searchQuery, setSearchQuery, filteredNews };
}
