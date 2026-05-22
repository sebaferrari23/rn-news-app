import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/api/client';
import { News } from '../types/news.types';

export function useNewsItem(id: number) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['news', id],
    queryFn: async (): Promise<News> => {
      const news = queryClient.getQueryData<News[]>(['news']);
      const cached = news?.find((n) => n.id === id);
      if (cached) return cached;
      return await apiClient<News>(`/posts/${id}`);
    },
  });
}
