import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Article } from '../types/Article';

const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [articleMenuVisible, setArticleMenuVisible] = useState(null);

  useEffect(() => {
    const loadArticles = async () => {
      const articlesJson = await AsyncStorage.getItem('articles');
      if (articlesJson) {
        let loadedArticles: Article[] = JSON.parse(articlesJson);
        loadedArticles.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        setArticles(loadedArticles);
      }
    };
    loadArticles();
  }, []);

  const addNewArticle = (newArticle: Article) => {
    setArticles((currentArticles) => {
      const updatedArticles = [...currentArticles, newArticle];
      return updatedArticles.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    });
  };

  const deleteArticle = (articleId: string) => {
    setArticles((currentArticles) => {
      const filteredArticles = currentArticles.filter(
        (article) => article.id !== articleId,
      );
      AsyncStorage.setItem('articles', JSON.stringify(filteredArticles));
      return filteredArticles;
    });
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
