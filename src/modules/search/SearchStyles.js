import { StyleSheet } from 'react-native';
import { colors } from '../../constants';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 75,
	},
	suggestionHeader: {
		color: colors.darkGrey,
		fontSize: 17,
		textAlign: 'center',
		padding: 20,
	},
	suggestion: {
		color: '#1ba5b8',
		textAlign: 'center',
		padding: 20,
	},
	optionsContainer: {
		backgroundColor: 'white', 
		position: 'absolute', 
		top: 65, 
		left: 20, 
		right: 20, 
		alignSelf: 'stretch',
		alignContent: 'center',
	},
	option: {
		textAlign: 'center',
		padding: 20,
	},
	tabsContainer: {
		alignItems: 'center', 
		position: 'absolute', 
		top: 0, 
		height: 40, 
		left: 0, 
		right: 0,
		flexDirection: 'row', 
		justifyContent: 'space-around', 
		alignContent: 'flex-start', 
		paddingBottom: 10,
	},
	tab: {
		height: 25, 
		flex: 1, 
		padding: 20,
	},
	tabText: {
		fontSize: 25, 
		textAlign: 'center',
	},
	message: {
		textAlign: 'center',
		paddingTop: 20,
	},
});

export default styles;
