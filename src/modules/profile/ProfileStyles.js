import {
	StyleSheet,
} from 'react-native';

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
		paddingLeft: 30,
		paddingRight: 30,
		paddingBottom: 30,
	}
})

export default styles;
