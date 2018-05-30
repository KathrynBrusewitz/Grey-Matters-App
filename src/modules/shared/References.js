import React from 'react';
import {
	Text,
	View,
} from 'react-native';

import styles from './ReferencesStyles';

const References = (props) => {
	return (
	<View>
		<View style={styles.referenceBox}>
			<Text style={styles.referenceHeader}>References</Text>
		</View>
		<View style={styles.references}>
			{
				props.references.map(reference => (
					<View key={reference.number} style={styles.reference}>
						<Text style={styles.number}>{reference.number}.</Text>
						<Text style={styles.citation}>{reference.citation}</Text>
					</View>
				))
			}
		</View>
	</View>
)}

export default References;
