import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/client';
import { mapResponseToNews, News, NewsResponse } from '../types/news.types';

export function useNews() {
  return useQuery({
    queryKey: ['news'],
    queryFn: async (): Promise<News[]> => {
      const news = await apiClient<NewsResponse[]>('/posts');
      return news.map(mapResponseToNews);
    },
  });
}
