import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Article } from '../types/Article';

const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [articleMenuVisible, setArticleMenuVisible] = useState(null);

  useEffect(() => {
    // todo 지금 당장에는 문제가 없겠지만 이미지 및 영상이 추가되고 데이터량이 지연이슈가 생길수도..? 무한 스크롤 구현 과정에서 해결방법이 필요할듯.
    const loadArticles = async () => {
      const indexJson = await AsyncStorage.getItem('articleIndex');
      const index = indexJson ? JSON.parse(indexJson) : [];
      const loadedArticles = await Promise.all(
        index.map(async (id: string) => {
          const articleJson = await AsyncStorage.getItem(`article:${id}`);
          return articleJson ? JSON.parse(articleJson) : null;
        }),
      );

      const nonNullArticles = loadedArticles.filter(
        (article) => article !== null,
      );

      nonNullArticles.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

      setArticles(nonNullArticles);
    };
    loadArticles();
  }, []);

  const addNewArticle = (newArticle: Article) => {
    setArticles((currentArticles) => {
      return [newArticle, ...currentArticles];
    });
  };

  const deleteArticle = async (articleId: string) => {
    const indexJson = await AsyncStorage.getItem('articleIndex');
    let index = indexJson ? JSON.parse(indexJson) : [];

    index = index.filter((id: string) => id !== articleId);

    await AsyncStorage.setItem('articleIndex', JSON.stringify(index));

    await AsyncStorage.removeItem(`article:${articleId}`);

    setArticles((currentArticles) =>
      currentArticles.filter((article) => article.id !== articleId),
    );
  };

  const toggleMenu = (id: any) => {
    articleMenuVisible === id
      ? setArticleMenuVisible(null)
      : setArticleMenuVisible(id);
  };

  return {
    articles,
    addNewArticle,
    deleteArticle,
    articleMenuVisible,
    toggleMenu,
  };
};

export default useArticles;
