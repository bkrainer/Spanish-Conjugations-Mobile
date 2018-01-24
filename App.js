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

const verbs = require('./verbs.json');

/**********************************************************************
 * Conjugator
 *
 * The main wrapper component of the application.
 **********************************************************************/
export default class Conjugator extends Component {
	constructor(props) {
		super(props);

		const i = Math.floor(Math.random() * verbs.length);
		this.state = {
			currentVerb: verbs[i],
		};
	}

	/* callback function for fetching the next verb to be displayed. This is called in the
	 * child component VerbHeader when the 'Next' button is clicked
	 */
	_getNextVerb() {
		const i = Math.floor(Math.random() * verbs.length);
		this.setState({
			currentVerb: verbs[i],
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
