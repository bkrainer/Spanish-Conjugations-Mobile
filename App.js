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

		/* start with a single random tense, and the user can adjust the tense
		 * as they see fit.
		 */
		const randomTense = _.sample(tenses);
		initialTenseSettings = _.reduce(tenses, function(hash, tense) {
			hash[tense] = tense === randomTense;
			return hash;
		}, {});

		this.initialSettings = initialTenseSettings;

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

		/* only allow a value to be set to false if there are tenses that are set to true */
		const counts = _.countBy(_.keys(currentSettings), function(tense) {
			return currentSettings[tense] ? 'true' : 'false';
		});

		if (!currentValue || (currentValue &&  counts['true'] > 1)) {
			currentSettings[tense] = !currentValue;
		}

		this.setState({
			settings: currentSettings,
		});
	}

	/* selects the next verb at random */
	_getRandomVerb() {
		const randomVerb = _.sample(verbKeys);
		const forms = verbs[randomVerb];

		let randomForm;
		let settings;
		/* filter the forms based on whether or not that form is selected in the settings */
		if (this.state === undefined) {
			settings = this.initialSettings;
		}
		else {
			settings = this.state.settings;
		}

		const selectedTenses = _.filter(_.keys(settings), function(tense) {
			return settings[tense];
		});

		const possibleForms = _.filter(forms, function(form) {
			const tense = form['mood_english'] + ' ' + form['tense_english'];
			return _.contains(selectedTenses, tense);
		});

		randomForm = _.sample(possibleForms);

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
	'Imperative Affirmative Present',
	'Imperative Negative Present',
];

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f7f7f7',
	},
});
