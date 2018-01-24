import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	TouchableHighlight,
	KeyboardAvoidingView,
} from 'react-native';
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
		this.verbIndex = 0;
		this.state = {
			currentVerb: verbs[this.verbIndex],
		};
	}

	/* callback function for fetching the next verb to be displayed. This is called in the
	 * child component VerbHeader when the 'Next' button is clicked
	 */
	_getNextVerb() {
		this.verbIndex = 1 - this.verbIndex;
		this.setState({
			currentVerb: verbs[this.verbIndex],
		});
	}

	render() {
		return (
			/* Use the KeyboardAvoidingView component so the keyboard doesn't cover
			 * important components
			 */
			<KeyboardAvoidingView behavior='padding' style={styles.container} keyboardVerticalOffset={40}>
				<VerbHeader
					verb={this.state.currentVerb}
					nextButtonCallback={() => this._getNextVerb()}
				/>
				<VerbForms verb={this.state.currentVerb}/>
			</KeyboardAvoidingView>
		);
	}
}

const verbs = [
	{
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
	},
	{
		"infinitive": "hablar",
		"infinitive_english": "to speak",
		"mood_english": "Indicative",
		"tense_english": "Present",
		"form_1p": "hablamos",
		"form_1s": "hablo",
		"form_2s": "hablas",
		"form_3p": "hablan",
		"form_3s": "habla",
		"gerund": "hablando",
		"pastparticiple": "hablado",
	},
];

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f7f7f7',
	},
});
