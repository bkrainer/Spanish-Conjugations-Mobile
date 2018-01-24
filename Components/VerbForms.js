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
class UserResponse extends Component {
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
			responses: {},
			inputFeedback: {},
		};
	}

	/* The set of correct answers is passed in as a prop to the user input component. Whenever
	 * this set changes, we want to reset this component, because that means the user clicked
	 * 'Next' and we are now working with a new verb.
	 */
	componentWillReceiveProps(nextProps) {
		/* We just need to check that the infinitive has changed. */
		if (nextProps.correctAnswers['infinitive'] != this.props.correctAnswers['infinitive']) {
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
		if (actual.trim().length > 0) {
			const correct = this._validateResponse(expected, actual);
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

		this.setState({
			responses: responses,
			inputFeedback: currentStyling,
		});
	}

	/* validates the user's input for a given form against the correct answer
	 * (stored in this.props.correctAnswers)
	 */
	_validateResponse(expected, actual) {
		if (expected == actual) {
			return 1;
		}
		else {
			return 0;
		}
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

		return (
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
		);
	}
}

/**********************************************************************
 * VerbForms
 *
 * This component contains buttons with each conjugation form the
 * user can practice. Clicking the button will allow them to type
 * their answer, and provide feedback on the correctness.
 **********************************************************************/
export class VerbForms extends Component {
	constructor(props) {
		super(props);

		this.state = this.initState();
	}

	initState () {
		return {
			currentForm: '',
			placeholderText: 'Select a form to conjugate...',
		};
	};

	/* The only prop this component inherits is the current verb being tested.
	 * So whenever the prop changes, we want to reset this component, so it
	 * is rendered without an initial verb form selected and the appropriate
	 * placeholder text.
	 */
	componentWillReceiveProps(nextProps) {
		this.setState(this.initState());
	}

	/* button press handler. when pressed, we want to display the current form
	 * being conjugated. Also update the placeholderText to indicate to the user
	 * that they should select the input box.
	 */
	_handlePress(form) {
		this.setState({
			currentForm: form,
			placeholderText: 'Type here to conjugate...',
		});
	}

	render() {
		/* render each form in a loop, as these buttons are all rendered identically
		 * except for their text
		 */
		const pronounKeys = Object.keys(pronounMap);
		const renderedForms = pronounKeys.map(key => {
			let displayForm = pronounMap[key];

			return <TouchableHighlight
				style={styles.formButton}
				underlayColor='#0275d8'
				onPress={() => this._handlePress(key)}
				key={key}
			>
				<Text style={styles.buttonText}>{displayForm}</Text>
			</TouchableHighlight>
		});

		/* if the current form is undefined, render it as ' ', otherwise
		 * there is a small jump as the text is filled in later on
		 */
		const currentDisplayForm = pronounMap[this.state.currentForm] || ' ';

		return (
			<View style={styles.verbFormsContainer}>
				<View style={styles.buttonsContainer}>
					{renderedForms}
				</View>
				<View style={styles.currentForm}>
					<Text>{currentDisplayForm}</Text>
				</View>
				<View style={styles.inputContainer}>
					<UserResponse
						placeholderText={this.state.placeholderText}
						currentForm={this.state.currentForm}
						/* only let the user edit the text box if they've selected a form */
						editable={this.state.currentForm.length > 0}
						correctAnswers={this.props.verb}
					/>
				</View>
			</View>
		);
	}
}

/* hash that maps the verb form to a string of how that form should be displayed to the user */
const pronounMap = {
	'form_1s': 'yo',
	'form_2s': 'tu',
	'form_3s': 'el/ella/usted',
	'form_1p': 'nosotros',
	'form_3p': 'ellos/ellas/ustedes',
	'gerund': 'gerund',
	'pastparticiple': 'past participle',
}

const styles = StyleSheet.create({
	verbFormsContainer: {
		flex: 2,
	},
	buttonsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	currentForm: {
		marginTop: 10,
		marginLeft: 30,
		marginBottom: 7,
		padding: 1,
	},
	formButton: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f7f7f7',
		height: 35,
		minWidth: 50,
		margin: 10,
		padding: 10,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#0275d8',
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowRadius: 1,
		shadowOpacity: 0.5,
	},
	buttonText: {
		fontWeight: 'bold',
		color: '#0275d8',
	},
	inputContainer: {
		marginLeft: 30,
		marginRight: 30,
	},
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
});
