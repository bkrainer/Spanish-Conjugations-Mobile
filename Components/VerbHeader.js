import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

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
				<Button
					onPress={this.props.nextButtonCallback}
					title="Next"
					color="#f7f7f7"
				/>
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
