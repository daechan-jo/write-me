// import { StatusBar } from 'expo-status-bar';
import React, { ReactNode } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

interface Article {
  id: string;
  date: string;
  content: string;
}

const articles: Article[] = [
  // ... Populate with your article data
  {
    id: '1',
    date: 'March 7',
    content: '내 꿈은 너야 연진아.',
  },
  {
    id: '2',
    date: 'March 6',
    content:
      '그러다 깨달았지.\n' +
      '신은 있는게 아니라 있는 척한다는 걸.\n' +
      '그러니까 넌 나에게 빌어야 해 연진아.\n' +
      '너의 구원은 나에게 있거든.',
  },
  {
    id: '3',
    date: 'February 27',
    content:
      '오늘부터 모든 날이 흉흉할거야.\n 자극적이고 끔질 할 거야.\n 막을 수도 없앨 수도 없을 거야.\n 나는 너의 아주 오래된 소문이 될 거거든.\n 난 거기까지 가볼 작정이야.\n 연진아, 용서는 없어.\n 그래도 그 어떤 영광도 없겠지만..',
  },
];

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
        <Text style={styles.navTitle}>Write me</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuButtonText}>...</Text>
        </TouchableOpacity>
      </View>

      {/* Article List */}
      <FlatList
        data={articles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ArticleCard article={item} />}
        contentContainerStyle={styles.listContainer}
      />

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Adjust the background color as needed
  },
  navBar: {
    height: 50, // Adjust the height as needed
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10,
    // Add styles for the navigation bar
  },
  navTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    // Add styles for the title
  },
  menuButton: {
    // Add styles for the menu button
  },
  menuButtonText: {
    fontSize: 24,
    // Add styles for the menu button text
  },
  listContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    // Add shadow and other styles for the card
  },
  articleDate: {
    marginBottom: 5,
    fontSize: 16,
    color: 'gray',
    // Add styles for the article date
  },
  articleContent: {
    fontSize: 18,
    // Add styles for the article content
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 56, // Adjust as needed
    height: 56, // Adjust as needed
    borderRadius: 28, // Half of the width/height
    backgroundColor: '#007AFF', // Adjust the color as needed
    alignItems: 'center',
    justifyContent: 'center',
    // Add shadow and other styles for the add button
  },
  addButtonText: {
    fontSize: 36,
    color: 'white',
    // Adjust style as needed
  },
});

export default App;
