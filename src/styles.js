import React from 'react';
import {
  Dimensions,
  StyleSheet,
} from 'react-native';
import { colors } from './constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    alignItems: 'center',
  },
  nav: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 300,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: colors.darkGrey,
  },
  navItem: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
    borderTopColor: '#ffffff',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  profileNavItem: {
    flex: 6,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },
  profileNavItemView: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  navItemText: {
    color: '#FFFFFF',
  },
  mainContainer: {
    flex: 1,
  },
  unavailable: {
    padding: 20,
    color: colors.darkGrey,
  },
  formMessage: {
    textAlign: 'center', 
    paddingTop: 20,
  },
  blue: {
    color: colors.blue,
  },
  red: {
    color: colors.red,
  },
  green: {
    color: '#5cb85c',
  },
  formContainer: {
    marginTop: 10,
  },
  formInput: {
    marginBottom: 10,
  },
  userConsent: {
    textAlign: 'center',
    marginTop: 10,
  },
  insideHeader: {
    padding: 15,
  },
  headerText: {
    color: colors.darkGrey, 
    fontSize: 17,
  },
  searchInputContainer: {
		width: Dimensions.get('window').width - 65,
	},
})

export default styles;
