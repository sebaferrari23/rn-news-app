import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { News } from '@/features/news/types/news.types';

interface FavoritesState {
  favorites: News[];
  toggleFavorite: (item: News) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: [],
      toggleFavorite: (news) =>
        set((state) => {
          const exists = state.favorites.some((item) => item.id === news.id);
          return {
            favorites: exists
              ? state.favorites.filter((item) => item.id !== news.id)
              : [news, ...state.favorites],
          };
        }),
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
