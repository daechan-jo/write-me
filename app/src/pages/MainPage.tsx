import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ArticlesCardView from '../views/ArticlesCard.view';
import WritingModalView from '../views/WritingModal.view';
import useModal from '../hooks/useModal';
import useArticles from '../hooks/useArticles';

const MainPage: React.FC = () => {
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
      <ArticlesCardView
        articles={articles}
        articleMenuVisible={articleMenuVisible}
        toggleMenu={toggleMenu}
        deleteArticle={deleteArticle}
        toggleModal={toggleModal}
      />
      <WritingModalView
        modalVisible={modalVisible}
        toggleModal={toggleModal}
        addNewArticle={addNewArticle}
      />
    </GestureHandlerRootView>
  );
};

export default MainPage;
