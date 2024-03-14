import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import formatArticleDate from '../../utils/formatArticleDate';
import IconButton from './IconButton';

export interface ArticleHeaderProps {
  date: string;
  onEdit: () => void;
  onToggleVisibility: () => void;
  onDelete: () => void;
  toggleMenu: () => void;
  menuVisible: boolean;
  bookMark: boolean;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  date,
  onEdit,
  onToggleVisibility,
  onDelete,
  toggleMenu,
  menuVisible,
  bookMark,
}) => (
  <View style={styles.articleHeader}>
    <Text style={styles.articleDate}>{formatArticleDate(date)}</Text>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {bookMark && <IconButton name="bookmark" onPress={onEdit} />}
      {menuVisible && (
        <>
          <IconButton name="edit" onPress={onEdit} />
          <IconButton name="eye" onPress={onToggleVisibility} />
          <IconButton name="trash-2" onPress={onDelete} />
        </>
      )}
      <IconButton name="more-horizontal" onPress={toggleMenu} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 5,
    marginRight: 5,
  },
  articleDate: {
    marginBottom: 5,
    fontSize: 12, // todo rem 단위 변경
    color: 'gray',
  },
});

export default ArticleHeader;
