import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/client';
import { News } from '../types/news.types';

export function useNews() {
  return useQuery({
    queryKey: ['news'],
    queryFn: async (): Promise<News[]> => {
      return await apiClient<News[]>('/posts');
    },
  });
}
