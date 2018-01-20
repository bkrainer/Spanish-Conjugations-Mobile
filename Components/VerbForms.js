import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

/**********************************************************************
 * VerbForms
 *
 * This component contains buttons 
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
				underlayColor='#d3d3d3'
				onPress={() => this._handlePress(form)}
				key={form}
			>
				<Text>{form}</Text>
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
		backgroundColor: '#ffffff',
		height: 35,
		minWidth: 50,
		margin: 10,
		padding: 10,
		borderRadius: 5,
		borderWidth: 1,
		shadowColor: '#000000',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowRadius: 1,
		shadowOpacity: 0.5,
	},
});
