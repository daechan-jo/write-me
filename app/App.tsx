import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';
import ArticleCard from './components/ArticleCard';
import WritingModal from './components/WritingModal';

import articles from './utils/mockText';

const App: React.FC = () => {
  const [visibleMenuId, setVisibleMenuId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
            <Feather name="edit-3" size={24} color="#6D6875" />
          </TouchableOpacity>
        </View>
        <WritingModal isVisible={modalVisible} onClose={toggleModal} />
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ArticleCard
              article={item}
              menuVisible={visibleMenuId === item.id}
              toggleMenu={() => toggleMenu(item.id)}
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
    marginRight: 14,
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
