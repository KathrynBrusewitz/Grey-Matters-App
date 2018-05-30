import {
  Dimensions,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  referenceBox: {
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ff404e',
  },
  referenceHeader: {
    fontSize: 19,
    fontWeight: 'bold',
    paddingTop: 20,
  },
  references: {
    paddingTop: 10,
  },
  reference: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  number: {
    width: 30,
  },
  citation: {
    paddingRight: 20,
  },
})

export default styles;
