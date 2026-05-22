import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { routes } from '@/navigation/routes';

export function useNavigateToNewsDetail() {
  const navigation = useNavigation();
  return useCallback(
    (newsId: number) => navigation.navigate(routes.newsDetail.name, { newsId }),
    [navigation],
  );
}
