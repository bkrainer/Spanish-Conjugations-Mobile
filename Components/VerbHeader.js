import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, TouchableHighlight } from 'react-native';

/********************************************************************
 * VerbHeader
 * 
 * This component contains the current verb being tested.
 * It displays the root verb (infinitive), its translation, 
 * and the current mood/tense being tested.
 ********************************************************************/
export class VerbHeader extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const verb = this.props.verb;
		const form = verb['mood_english'] + ' ' + verb['tense_english'];
		return (
			<View style={styles.headerContainer}>
				<Text style={[styles.headerText, styles.infinitive]}>{verb['infinitive']}</Text>
				<Text style={[styles.headerText, styles.translation]}>{verb['infinitive_english']}</Text>
				<Text style={[styles.headerText, styles.moodTense]}>{form}</Text>
				<TouchableHighlight
					onPress={this.props.nextButtonCallback}
					underlayColor='#0275d8'
				>
					<Text style={[styles.headerText, styles.nextButton]}>Next</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	headerContainer: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#0275d8',
		padding: 25
	},
	infinitive: {
		fontSize: 25,
		fontWeight: 'bold',
	},
	translation: {
		fontSize: 20,
	},
	moodTense: {
		fontSize: 20,
		margin: 15,
		fontStyle: 'italic',
	},
	nextButton: {
		fontSize: 15,
	},
	headerText: {
		color: '#f7f7f7',
		textAlign: 'center',
	},
});
