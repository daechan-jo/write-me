import React from 'react';
import WritingModal from '../components/WritingModal/WritingModal';
import { Article } from '../types/Article';

const WritingModalView: React.FC<{
  modalVisible: boolean;
  toggleModal: () => void;
  addNewArticle: (newArticle: Article) => void;
}> = ({ modalVisible, toggleModal, addNewArticle }) => {
  return (
    <WritingModal
      isVisible={modalVisible}
      onClose={toggleModal}
      onAddArticle={addNewArticle}
    />
  );
};

export default WritingModalView;
