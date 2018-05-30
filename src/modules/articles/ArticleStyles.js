import {
  Dimensions,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  image: {
    alignSelf: 'stretch',
		height: Dimensions.get('window').height/3,
  },
  container: {
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  titleText: {
    fontSize: 28, 
    fontWeight: 'bold',
    paddingBottom: 15,
  },
  metaData: {
    flexDirection: 'row', 
    borderTopColor: '#ff404e',
    borderTopWidth: 1,
    borderBottomColor: '#ff404e',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  author: {
    flex: 3,
    marginTop: 10,
    marginBottom: 10,
    borderRightColor: '#ff404e',
    borderRightWidth: 1,
    alignItems: 'flex-start',
  },
  artist: {
    flex: 3,
    marginTop: 10,
    marginBottom: 10,
    borderRightColor: '#ff404e',
    borderRightWidth: 1,
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingRight: 10,
  },
  date: {
    flex: 2,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  blue: {
    color: '#1ba5b8',
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  dialog: {
    backgroundColor: 'white',
    padding: 20,
  },
  term: {
    fontSize: 20,
  },
  description: {
    paddingTop: 5,
  },
  body: {
    lineHeight: 25,
    fontSize: 16,
  },
})

export default styles;
