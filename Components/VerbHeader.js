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

		/* TODO: actually initialize the first verb */
		this.verb = verbs[0]['infinitive'];
		this.translation = verbs[0]['infinitive_english'];
		this.mood = verbs[0]['mood_english'];
		this.tense = verbs[0]['tense_english'];
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

/* TODO: use the actual verbs.json data. Either import it from its
 * relative path, or fetch the data with the Fetch API.
 */
const verbs = [{
	"infinitive": "abandonar",
	"infinitive_english": "to abandon, leave behind",
	"mood_english": "Subjunctive",
	"tense_english": "Imperfect",
	"form_1p": "abandonamos",
	"form_1s": "abandono",
	"form_2s": "abandonas",
	"form_3p": "abandonan",
	"form_3s": "abandona",
	"gerund": "abandonando",
	"pastparticiple": "abandonado"
}];

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
