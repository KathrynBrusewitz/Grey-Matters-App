import {
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 3,
    alignSelf: 'stretch',
  },
  mainContainer: {
    padding: 20,
    flex: 5,
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
    marginBottom: 20,
  },
  date: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    borderRightColor: '#ff404e',
    borderRightWidth: 1,
    alignItems: 'flex-start',
  },
  time: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    borderRightColor: '#ff404e',
    borderRightWidth: 1,
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingRight: 10,
  },
  location: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  button: { 
    backgroundColor: '#1ba5b8',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  buttonTitle: {
    color: 'white',
  },
  body: {
    lineHeight: 25,
    fontSize: 16,
  },
  bold: {
    fontWeight: 'bold',
  },
  blue: {
    color: '#1ba5b8',
  }
})

export default styles;