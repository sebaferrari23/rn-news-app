import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/client';
import { mapResponseToUser, User, UserResponse } from '../types/users.types';

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async (): Promise<User[]> => {
      const users = await apiClient<UserResponse[]>('/users');
      return users.map(mapResponseToUser);
    },
  });
}
