import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

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

		this.state = { currentForm: '' };
	}

	/* button press handler. when pressed, we want to display the current form
	 * being conjugated.
	 */
	_handlePress(form) {
		this.setState({
			currentForm: form
		});
	}

	render() {
		let renderedForms = forms.map(form => {
			return <TouchableHighlight
				style={styles.formButton}
				underlayColor='#0275d8'
				onPress={() => this._handlePress(form)}
				key={form}
			>
				<Text style={styles.buttonText}>{form}</Text>
			</TouchableHighlight>
		});

		return (
			<View style={styles.verbFormsContainer}>
				<View style={styles.buttonsContainer}>
					{renderedForms}
				</View>
				<View style={styles.currentForm}>
					<Text>{this.state.currentForm}</Text>
				</View>
			</View>
		);
	}
}

const forms = [
	"yo",
	"tu",
	"el/ella/usted",
	"nosotros",
	"ellos/ellas/ustedes",
	"gerund",
	"past participle",
];

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
		alignItems: 'center',
		padding: 5,
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
	}
});
