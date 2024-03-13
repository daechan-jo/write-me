import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ArticleCard from './components/ArticleCard';
import WritingModal from './components/WritingModal';

interface Article {
  id: string;
  date: string;
  content: string;
  bookMark: boolean;
  publish: boolean;
}

const App: React.FC = () => {
  const [visibleMenuId, setVisibleMenuId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);

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
    visibleMenuId === id ? setVisibleMenuId(null) : setVisibleMenuId(id);
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.navBar}>
          <TouchableOpacity onPress={toggleModal}>
            <Feather name="edit-3" size={24} color="#B7B7B7" />
          </TouchableOpacity>
        </View>
        <WritingModal
          isVisible={modalVisible}
          onClose={toggleModal}
          onAddArticle={addNewArticle}
        />
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ArticleCard
              article={item}
              menuVisible={visibleMenuId === item.id}
              toggleMenu={() => toggleMenu(item.id)}
              onDelete={deleteArticle}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  navBar: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginRight: 20,
  },
  listContainer: {
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

export default App;
