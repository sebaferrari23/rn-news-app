import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { News } from '../types/news.types';
import { NewsCard } from './NewsCard';
import { colors } from '@/core/theme/colors';
import { fontFamilies, fontSizes } from '@/core/theme/typography';
import { spacing } from '@/core/theme/spacing';

interface Props {
  data: News[] | undefined;
  isLoading?: boolean;
  onPressItem: (newsId: number) => void;
}

export function NewsList({ data, isLoading, onPressItem }: Props) {
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={styles.centered}>
          <Text style={styles.emptyText}>No news available.</Text>
        </View>
      }
      renderItem={({ item }) => (
        <NewsCard news={item} onPress={() => onPressItem(item.id)} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xl,
  },
  content: {
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  emptyText: {
    fontFamily: fontFamilies.medium,
    fontSize: fontSizes.md,
    color: colors.text,
  },
});
