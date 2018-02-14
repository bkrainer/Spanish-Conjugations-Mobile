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

		this.state = {
			currentVerb: this._getRandomVerb(),
		};
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
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f7f7f7',
	},
});
