import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

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

		var verb = this.props.verb;

		this.verb = verb['infinitive'];
		this.translation = verb['infinitive_english'];
		this.mood = verb['mood_english'];
		this.tense = verb['tense_english'];
	}

	render() {
		let form = this.mood + ' ' + this.tense;
		return (
			<View style={styles.headerContainer}>
				<Text style={[styles.headerText, styles.infinitive]}>{this.verb}</Text>
				<Text style={[styles.headerText, styles.translation]}>{this.translation}</Text>
				<Text style={[styles.headerText, styles.moodTense]}>{form}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	headerContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#0275d8',
		padding: 25
	},
	infinitive: {
		fontSize: 30,
		fontWeight: 'bold',
	},
	translation: {
		fontSize: 25,
	},
	moodTense: {
		fontSize: 20,
		margin: 20,
	},
	headerText: {
		color: '#f7f7f7',
	},
});
