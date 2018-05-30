import {
	Dimensions,
	StyleSheet,
} from 'react-native';
import { colors } from '../../constants';

const styles = StyleSheet.create({
	container: {
		paddingTop: 20,
		flex: 1,
	},
	name: {
		fontSize: 25,
		fontWeight: 'bold',
		paddingBottom: 25,
	},
	tabs: {
		flexDirection: 'row', 
	},
	tab: {
		flex: 1,
		fontSize: 20,
		color: '#BABABA',
	},
	tabLeft: {
		textAlign: 'right',
		paddingRight: 10,
	},
	tabRight: {
		textAlign: 'left',
		paddingLeft: 20,
	},
	tabSelected: {
		color: 'black',
	},
	bio: {
		width: Dimensions.get('window').width - 120,
		marginBottom: 30,
	},
	signup: {
		fontSize: 20,
		paddingTop: 10,
		paddingBottom: 10,
		color: '#1ba5b8',
	}
})

export default styles;
