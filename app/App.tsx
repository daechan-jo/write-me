import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

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
          <Feather name="edit-3" size={24} color="#6D6875" />
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
});

export default App;
