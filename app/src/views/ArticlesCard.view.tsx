import React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import ArticleCard from '../components/ArticleCard/ArticleCard';
import { Feather } from '@expo/vector-icons';
import { Article } from '../types/Article';

const ArticlesCardView: React.FC<{
  articles: Article[];
  articleMenuVisible: string | null;
  toggleMenu: (id: string) => void;
  deleteArticle: (id: string) => void;
  toggleModal: () => void;
}> = ({
  articles,
  articleMenuVisible,
  toggleMenu,
  deleteArticle,
  toggleModal,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={toggleModal}>
          <Feather name="edit-3" size={24} color="#B7B7B7" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ArticleCard
            article={item}
            menuVisible={articleMenuVisible === item.id}
            toggleMenu={() => toggleMenu(item.id)}
            onDelete={deleteArticle}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  navBar: {
    height: 50, // todo
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingHorizontal: 10, // todo
    marginRight: 20, // todo
  },
  listContainer: {
    padding: 10, // todo
  },
});

export default ArticlesCardView;
