import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet,
	TouchableHighlight,
	TextInput,
} from 'react-native';
import { UserResponse } from './UserResponse.js';
import { ButtonGroup } from './ButtonGroup.js';

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
		/* if the current form is undefined, render it as ' ', otherwise
		 * there is a small jump as the text is filled in later on
		 */
		const currentDisplayForm = pronounMap[this.state.currentForm] || ' ';
		return (
			<View style={styles.verbFormsContainer}>
				<ButtonGroup
					group={pronounMap}
					groupStyle={styles.buttonsContainer}
					buttonStyle={styles.formButton}
					textStyle={styles.buttonText}
					selectedButtonStyle={styles.selectedButton}
					selectedButtonTextStyle={styles.selectedButtonText}	
					underlayColor='#0275d8'
					handler={(key) => this._handlePress(key)}
					selectedKey={this.state.currentForm}
				/>
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
		flex: 7,
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
		margin: 7,
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
	selectedButton: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#0275d8',
		height: 35,
		minWidth: 50,
		margin: 7,
		padding: 10,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#f7f7f7',
	},
	buttonText: {
		fontWeight: 'bold',
		color: '#0275d8',
	},
	selectedButtonText: {
		fontWeight: 'bold',
		color: '#f7f7f7',
	},
	inputContainer: {
		marginLeft: 30,
		marginRight: 30,
	},
});
