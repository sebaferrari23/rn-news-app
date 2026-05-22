import { memo } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors, spacing, fontFamilies, fontSizes } from '@/core/theme';
import { News } from '../types/news.types';

interface Props {
  news: News;
  onPress: () => void;
}

export const NewsCard = memo(({ news, onPress }: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <Image source={{ uri: news.thumbnail }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {news.title}
        </Text>
        <Text style={styles.text} numberOfLines={3}>
          {news.content}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  image: {
    width: 120,
    height: 100,
    borderRadius: 8,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: fontSizes.lg,
    fontFamily: fontFamilies.bold,
    color: colors.title,
    marginBottom: spacing.xs,
  },
  text: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.regular,
    color: colors.text,
  },
});
