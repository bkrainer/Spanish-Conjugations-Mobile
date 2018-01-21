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
	constructor(props) {
		super(props);

		/* TODO: actually initialize the first verb */
		this.currentVerb = verbs[0];
	}

	render() {
		return (
			<View style={styles.container}>
				<VerbHeader verb={this.currentVerb}/>
				<VerbForms />
			</View>
		);
	}
}

const verbs = [{
	"infinitive": "abandonar",
	"infinitive_english": "to abandon",
	"mood_english": "Subjunctive",
	"tense_english": "Imperfect",
	"form_1p": "abandonamos",
	"form_1s": "abandono",
	"form_2s": "abandonas",
	"form_3p": "abandonan",
	"form_3s": "abandona",
	"gerund": "abandonando",
	"pastparticiple": "abandonado",
}];

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f7f7f7',
	},
});
