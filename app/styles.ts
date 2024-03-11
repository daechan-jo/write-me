import { StyleSheet } from 'react-native';

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

export default styles;
