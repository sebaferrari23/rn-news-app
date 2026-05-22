import { useMemo, useState } from 'react';
import { useDebounce } from '@/core/hooks/useDebounce';
import { User } from '../types/users.types';

const SEARCH_DEBOUNCE_MS = 300;

export function useUsersSearch(users: User[] | undefined) {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, SEARCH_DEBOUNCE_MS);

  const filteredUsers = useMemo(() => {
    if (!users) {
      return [];
    }

    const normalized = debouncedQuery.toLowerCase().trim();
    if (!normalized) {
      return users;
    }

    return users.filter(
      (item) =>
        item.fullName.toLowerCase().includes(normalized) ||
        item.company.toLowerCase().includes(normalized),
    );
  }, [users, debouncedQuery]);

  return { searchQuery, setSearchQuery, filteredUsers };
}
