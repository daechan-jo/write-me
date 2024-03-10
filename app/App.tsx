// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Article from './interfaces/Article';
import articles from './mockText';

const handlePress = () => {
  console.log('Icon pressed!');
};

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => (
  <View style={styles.card}>
    <View style={styles.articleHeader}>
      <Text style={styles.articleDate}>{article.date}</Text>
      <TouchableOpacity onPress={handlePress}>
        <AntDesign name="ellipsis1" style={styles.ellipsis} />
      </TouchableOpacity>
    </View>
    <View style={styles.boundary}></View>
    <Text style={styles.articleContent}>{article.content}</Text>
  </View>
);

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={handlePress}>
          <Feather name="plus-square" size={24} color="#6D6875" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ArticleCard article={item} />}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create<any>({
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
  navTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  navButton: {
    fontSize: 36,
    color: 'black',
  },
  listContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 5,
    marginRight: 5,
  },
  articleDate: {
    flexDirection: 'row',
    marginBottom: 5,
    fontSize: 12,
    color: 'gray',
  },
  ellipsis: {
    color: '#B7B7B7',
    fontSize: 18,
  },
  boundary: {
    padding: 1,
    backgroundColor: '#F7F7F7',
    marginBottom: 5,
  },
  articleContent: {
    fontSize: 15,
    letterSpacing: 1,
    lineHeight: 25,
  },
});

export default App;
