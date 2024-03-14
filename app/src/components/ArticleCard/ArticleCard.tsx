import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ArticleHeader from './ArticleHeader';
import { Article } from '../../types/Article';

const ArticleCard: React.FC<{
  article: Article;
  menuVisible: boolean;
  toggleMenu: () => void;
  onDelete: (articleId: string) => void;
}> = ({ article, menuVisible, toggleMenu, onDelete }) => {
  return (
    <View style={styles.card}>
      <ArticleHeader
        date={article.date}
        onEdit={() => {}}
        onToggleVisibility={() => {}}
        onDelete={() => onDelete(article.id)}
        toggleMenu={toggleMenu}
        menuVisible={menuVisible}
        bookMark={article.bookMark}
      />
      <View style={styles.boundary}></View>
      <Text style={styles.articleContent}>{article.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    shadowOpacity: 0.1,
    shadowRadius: 3.5,
  },
  boundary: {
    padding: 1,
    backgroundColor: '#F7F7F7',
    marginBottom: 5,
  },
  articleContent: {
    fontSize: 16,
    letterSpacing: 0.5,
    lineHeight: 23,
  },
});

export default ArticleCard;
