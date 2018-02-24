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
import { Settings } from './Components/Settings.js';

const _ = require('underscore');

const verbs = require('./verbs.json');
const verbKeys = _.keys(verbs);

/**********************************************************************
 * Conjugator
 *
 * The main wrapper component of the application.
 **********************************************************************/
export default class Conjugator extends Component {
	constructor(props) {
		super(props);

		initialTenseSettings = _.reduce(tenses, function(hash, tense) {
			hash[tense] = true;
			return hash;
		}, {});

		this.state = {
			currentVerb: this._getRandomVerb(),
			settings: initialTenseSettings,
		};
	}

	/* callback function for controlling the state of which tenses can currently be
	 * practiced. if a tense is turned on/off via the settings page, this callback is
	 * invoked and that tense's value is toggled.
	 */
	_toggleTenseSetting(tense) {
		let currentSettings = this.state.settings;
		const currentValue = currentSettings[tense];
		currentSettings[tense] = !currentValue;
		this.setState({
			settings: currentSettings,
		});
	}

	/* selects the next verb at random */
	_getRandomVerb() {
		const randomVerb = _.sample(verbKeys);
		const forms = verbs[randomVerb];
		const randomForm = _.sample(forms);

		return randomForm;
	}

	/* callback function for fetching the next verb to be displayed. This is called in the
	 * child component VerbHeader when the 'Next' button is clicked
	 */
	_getNextVerb() {
		this.setState({
			currentVerb: this._getRandomVerb(),
		});
	}

	render() {
		return (
			/* Use the KeyboardAvoidingView component so the keyboard doesn't cover
			 * important components
			 */
			<View style={styles.container} keyboardVerticalOffset={40}>
				<VerbHeader
					verb={this.state.currentVerb}
					nextButtonCallback={() => this._getNextVerb()}
				/>
				<VerbForms verb={this.state.currentVerb}/>
				<Settings 
					data={this.state.settings}
					parentCallback={(tense) => this._toggleTenseSetting(tense)}
				/>
			</View>
		);
	}
}

const tenses = [
	'Indicative Present',
	'Indicative Future',
	'Indicative Imperfect',
	'Indicative Preterite',
	'Indicative Conditional',
	'Indicative Present Perfect',
	'Indicative Future Perfect',
	'Indicative Past Perfect',
	'Indicative Preterite (Archaic)',
	'Indicative Conditional Perfect',
	'Subjunctive Present',
	'Subjunctive Imperfect',
	'Subjunctive Future',
	'Subjunctive Present Perfect',
	'Subjunctive Future Perfect',
	'Subjunctive Past Perfect',
	'Imperfative Affirmative Present',
	'Imperative Negative Present',
];

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f7f7f7',
	},
});
