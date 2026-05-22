import { useCallback, useMemo } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackScreenProps } from '@/navigation/types';
import { rootStackRouteNames } from '@/navigation/routeNames';
import { Header, HeaderAction } from '@/core/components/Header';
import { colors, spacing, fontFamilies, fontSizes } from '@/core/theme';
import { useFavoritesStore } from '@/features/favorites/store/useFavoritesStore';
import { useNewsItem } from '../hooks';

type Props = RootStackScreenProps<typeof rootStackRouteNames.newsDetail>;

export function NewsDetailScreen({ route }: Props) {
  const { newsId } = route.params;
  const { data: news, isLoading } = useNewsItem(newsId);
  const isFav = useFavoritesStore((s) =>
    s.favorites.some((item) => item.id === newsId),
  );
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  const onShare = useCallback(async () => {
    if (!news) return;
    try {
      await Share.share({
        title: news.title,
        message: `${news.title}\n\n${news.url}`,
      });
    } catch (error) {
      console.warn(error);
    }
  }, [news]);

  const headerActions: HeaderAction[] = useMemo(
    () => [
      {
        icon: isFav ? 'heart' : 'heart-outline',
        onPress: () => news && toggleFavorite(news),
      },
      {
        icon: 'share-social-outline',
        onPress: onShare,
      },
    ],
    [isFav, onShare, news, toggleFavorite],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header showBackButton actions={headerActions} />
      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : news ? (
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Image source={{ uri: news.image }} style={styles.image} />
          <Text style={styles.title}>{news.title}</Text>
          <Text style={styles.text}>{news.content}</Text>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: spacing.md,
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 16,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSizes.xl,
    fontFamily: fontFamilies.bold,
    color: colors.title,
    lineHeight: 32,
    marginBottom: spacing.sm,
  },
  text: {
    fontSize: fontSizes.md,
    fontFamily: fontFamilies.regular,
    color: colors.text,
    lineHeight: 28,
  },
});
