// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList } from 'react-native';
import Article from './interfaces/Article';
import articles from './testText';

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => (
  <View style={styles.card}>
    <Text style={styles.articleDate}>{article.date}</Text>
    <Text style={styles.articleContent}>{article.content}</Text>
  </View>
);

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <Text style={styles.navTitle}>일기</Text>
        <Text style={styles.navButton}>+</Text>
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
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
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
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  articleDate: {
    marginBottom: 5,
    fontSize: 16,
    color: 'gray',
  },
  articleContent: {
    fontSize: 18,
  },
});

export default App;
