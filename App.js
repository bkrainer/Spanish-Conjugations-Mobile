import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { VerbForms } from './Components/VerbForms.js';
import { VerbHeader} from './Components/VerbHeader.js';

/**********************************************************************
 * Conjugator
 *
 * The main wrapper component of the application.
 **********************************************************************/
export default class Conjugator extends Component {
	render() {
		return (
			<View style={styles.container}>
				<VerbHeader />
				<VerbForms />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
});
