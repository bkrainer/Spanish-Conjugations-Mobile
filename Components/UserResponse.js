import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	TouchableHighlight,
	TextInput,
} from 'react-native';

/**********************************************************************
 * UserResponse
 *
 * Component where the user types in their response for each form.
 * Also handles the validation of the input against the correct answers.
 **********************************************************************/
export class UserResponse extends Component {
	constructor(props) {
		super(props);

		/* the state consists of a hash of responses, mapping each form
		 * ('form_1p', 'form_2s', etc) to a string of the user's response.
		 * This hash starts out empty, and is populated as the user types.
		 */
		this.state = this.initialState();
	}

	initialState() {
		return {
			responses: {}, // stores strings mapping each form to the users answer for that form
			inputFeedback: {}, // stores the appropriate styling for each form
			corrects: {}, // maps each form to a boolean value (whether or not the answer is correct)
		};
	}

	/* The set of correct answers is passed in as a prop to the user input component. Whenever
	 * this set changes, we want to reset this component, because that means the user clicked
	 * 'Next' and we are now working with a new verb.
	 */
	componentWillReceiveProps(nextProps) {
		/* If the infinitive form has changed, or if the mood / tense have changed, then we've
		 * received a new verb and need to reset the state
		 */
		if (
			nextProps.correctAnswers['infinitive'] != this.props.correctAnswers['infinitive']
			|| nextProps.correctAnswers['mood_english'] != this.props.correctAnswers['mood_english']
			|| nextProps.correctAnswers['tense_english'] != this.props.correctAnswers['tense_english']
		) {
			this.setState(this.initialState());
		}
	}

	/* handler for onChangeText. When the text changes, set the state
	 * to update the response hash, as well as the appropriate stylings
	 * for each form.
	 */
	_onChangeText(text) {
		const currentForm = this.props.currentForm;
		let expected = this.props.correctAnswers[currentForm];
		let actual = text;

		let inputStyling = {};
		let response = '';
		let correct = false;
		if (actual.trim().length > 0) {
			correct = this._validateResponse(expected, actual);
			if (correct) {
				inputStyling = styles.correctResponse;
				response = expected;
			}
			else {
				inputStyling = styles.incorrectResponse;
				response = actual;
			}
		}

		let responses = this.state.responses;
		responses[currentForm] = response;

		let currentStyling = this.state.inputFeedback;
		currentStyling[currentForm] = inputStyling;

		let corrects = this.state.corrects;
		corrects[currentForm] = correct;

		this.setState({
			responses: responses,
			inputFeedback: currentStyling,
			corrects: corrects,
		});
	}

	/* validates the user's input for a given form against the correct answer
	 * (stored in this.props.correctAnswers)
	 */
	_validateResponse(expected, actual) {
		expected = expected.trim().toLowerCase();
		actual = actual.trim().toLowerCase();

		if (expected == actual) {
			return true;
		}
		else {
			return false;
		}
	}

	/* either shows or hides the answer for the current form */
	_toggleAnswer() {
		const currentForm = this.props.currentForm;
		const correctAnswer = this.props.correctAnswers[currentForm];

		let response = '';
		isCorrect = this.state.corrects[currentForm];
		if (!this.state.corrects[currentForm]) {
			response = correctAnswer;
		}

		/* call the _onChangeText handler with the response we want to insert into the text box */
		this._onChangeText(response);
	}

	render() {
		const currentForm = this.props.currentForm;

		/* style the input box differently, depending on if the user is currently
		 * able to edit the field, as well as the user's current answer for the
		 * current form.
		 */
		const validationStyle = this.state.inputFeedback[currentForm];
		const inputStyle = this.props.editable
			? [ styles.input, styles.editableInput, validationStyle ]
			: [ styles.input, styles.readOnlyInput ];

		const toggleAnswerText = this.state.corrects[currentForm] ? 'Hide' : 'Show';

		return (
			<View>
				<TextInput
					style={inputStyle}
					placeholder={this.props.placeholderText}
					value={this.state.responses[currentForm]}
					onChangeText={(text) => this._onChangeText(text)}
					autoCapitalize="none"
					autoCorrect={false}
					keyboardAppearance="dark"
					keyboardType="ascii-capable"
					clearButtonMode='always'
					editable={this.props.editable}
				/>
				{ this.props.editable ?
					<TouchableHighlight
						style={styles.showButtonContainer}
						underlayColor='#f7f7f7'
						onPress={() => this._toggleAnswer()}
					>
						<Text style={styles.showButton}>{toggleAnswerText}</Text>
					</TouchableHighlight>
				: null}
			</View>
		);
	}
}
const styles = StyleSheet.create({
	input: {
		height: 40,
		borderWidth: 1,
		borderRadius: 4,
		paddingLeft: 5,
		borderColor: '#ccc',
	},
	editableInput: {
		borderColor: '#aaa',
	},
	readOnlyInput: {
		backgroundColor: '#e9ecef',
	},
	correctResponse: {
		borderColor: '#28a745',
	},
	incorrectResponse: {
		borderColor: '#dc3545',
	},
	showButtonContainer: {
		flex: 1,
		alignItems: 'center',
		padding: 5,
	},
	showButton: {
		color: '#0275d8',
	},
});
