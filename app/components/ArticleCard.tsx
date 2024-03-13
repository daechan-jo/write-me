import React, { useEffect, useRef } from 'react';
import Article from '../interfaces/Article';
import {
  Animated,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import eventCheck from '../utils/eventCheck';

const ArticleCard: React.FC<{
  article: Article;
  menuVisible: boolean;
  toggleMenu: () => void;
}> = ({ article, menuVisible, toggleMenu }) => {
  const menuWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(menuWidth, {
      toValue: menuVisible ? 1 : 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [menuVisible]);

  return (
    <View style={styles.card}>
      <View style={styles.articleHeader}>
        <Text style={styles.articleDate}>{article.date}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Animated.View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            {article.bookMark && (
              <TouchableOpacity onPress={eventCheck}>
                <Feather name="bookmark" style={styles.articleHeaderIcon} />
              </TouchableOpacity>
            )}
            {menuVisible && (
              <>
                <TouchableOpacity onPress={eventCheck}>
                  <Feather name="edit" style={styles.articleHeaderIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={eventCheck}>
                  <Feather name="trash-2" style={styles.articleHeaderIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={eventCheck}>
                  <Feather
                    name="plus-square"
                    style={styles.articleHeaderIcon}
                  />
                  {/*	todo publish 아닐때 +, 맞으면 - 아이콘으로 변경되게하긔*/}
                </TouchableOpacity>
              </>
            )}
          </Animated.View>
          <TouchableOpacity onPress={toggleMenu}>
            <Feather name="more-horizontal" style={styles.articleHeaderIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.boundary}></View>
      <Text style={styles.articleContent}>{article.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
  articleHeaderIcon: {
    color: '#B7B7B7',
    fontSize: 18,
    marginLeft: 8,
  },
  boundary: {
    padding: 1,
    backgroundColor: '#F7F7F7',
    marginBottom: 5,
  },
  articleContent: {
    fontSize: 15,
    letterSpacing: 0.5,
    lineHeight: 23,
  },
});

export default ArticleCard;
