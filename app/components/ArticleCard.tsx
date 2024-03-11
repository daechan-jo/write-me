import React, { useState, useRef } from 'react';
import Article from '../interfaces/Article';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import styles from '../styles';
import eventCheck from '../utils/eventCheck';

const ArticleCard: React.FC<{
  article: Article;
  menuVisible: boolean;
  toggleMenu: () => void;
}> = ({ article, menuVisible, toggleMenu }) => {
  const position = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    if (menuVisible) {
      Animated.timing(position, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(position, {
        toValue: 120,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    toggleMenu();
  };

  return (
    <View style={styles.card}>
      <View style={styles.articleHeader}>
        <View>
          <Text style={styles.articleDate}>{article.date}</Text>
        </View>
        <View style={styles.articleHeader}>
          {article.bookMark && (
            <TouchableOpacity onPress={eventCheck}>
              {/*todo 북마크한 글에만 표시. 클릭 이벤트 발생시 북마크 해제*/}
              <FontAwesome name="bookmark" style={styles.articleHeaderIcon} />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={startAnimation}>
            <Animated.View style={{ transform: [{ translateX: position }] }}>
              <AntDesign name="ellipsis1" style={styles.articleHeaderIcon} />
            </Animated.View>
          </TouchableOpacity>
          {menuVisible && (
            <Animated.View
              style={[
                styles.tooltipMenu,
                {
                  opacity: position.interpolate({
                    inputRange: [-100, 0],
                    outputRange: [0, 1],
                  }),
                },
                { transform: [{ translateX: position }] },
              ]}
            >
              {/*todo 아이콘 버튼으로 변경*/}
              <Text style={styles.tooltipMenuItem}>+</Text>
              <Text style={styles.tooltipMenuItem}>+</Text>
              <Text style={styles.tooltipMenuItem}>+</Text>
              <Text style={styles.tooltipMenuItem}>+</Text>
            </Animated.View>
          )}
        </View>
      </View>
      <View style={styles.boundary}></View>
      <Text style={styles.articleContent}>{article.content}</Text>
    </View>
  );
};

export default ArticleCard;
