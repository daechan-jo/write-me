import React, { useState } from 'react';
import { SafeAreaView, View, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';

import { Feather } from '@expo/vector-icons';
import ArticleCard from './components/ArticleCard';

import articles from './utils/mockText';
import eventCheck from './utils/eventCheck';

const App: React.FC = () => {
  const [visibleMenuId, setVisibleMenuId] = useState(null);
  const toggleMenu = (id: any) => {
    visibleMenuId === id ? setVisibleMenuId(null) : setVisibleMenuId(id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={eventCheck}>
          {/*todo 글 작성 버튼*/}
          <Feather name="plus-square" size={24} color="#6D6875" />
        </TouchableOpacity>
      </View>

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
  );
};

export default App;
