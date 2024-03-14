import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import ArticleCard from './components/ArticleCard/ArticleCard';
import WritingModal from './components/WritingModal/WritingModal';
import useArticles from './hooks/useArticles';
import useModal from './hooks/useModal';

import { Feather } from '@expo/vector-icons';

const App: React.FC = () => {
  const {
    articles,
    addNewArticle,
    deleteArticle,
    articleMenuVisible,
    toggleMenu,
  } = useArticles();
  const { modalVisible, toggleModal } = useModal();

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
              menuVisible={articleMenuVisible === item.id}
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22, // todo
  },
});

export default App;
