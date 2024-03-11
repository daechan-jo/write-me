import React, { useEffect, useRef } from 'react';
import Article from '../interfaces/Article';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from '../styles';
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

export default ArticleCard;
