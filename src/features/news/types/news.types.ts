export interface NewsResponse {
  id: number;
  userId: number;
  title: string;
  content: string;
  image: string;
  thumbnail: string;
  slug: string;
  category: string;
  status: string;
  publishedAt: string;
  updatedAt: string;
  url: string;
}

export interface News {
  id: number;
  title: string;
  content: string;
  image: string;
  thumbnail: string;
  url: string;
}

export function mapResponseToNews(response: NewsResponse): News {
  return {
    id: response.id,
    title: response.title,
    content: response.content,
    image: response.image,
    thumbnail: response.thumbnail,
    url: response.url,
  };
}
