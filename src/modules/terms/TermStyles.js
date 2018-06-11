import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	image: {
		alignSelf: 'stretch',
		height: Dimensions.get('window').height / 3,
	},
	title: {
		fontSize: 25, 
		fontWeight: 'bold',
		paddingBottom: 10,
	},
	container: {
		paddingTop: 15,
		paddingLeft: 20,
		paddingRight: 20,
	},
	sectionHeaderBox: {
		paddingBottom: 2,
		borderBottomWidth: 1,
	},
	sectionHeader: {
		fontSize: 20, 
		fontWeight: 'bold',
	},
	paragraph: {
		paddingTop: 10,
		paddingBottom: 10,
	},
})

export default styles;
