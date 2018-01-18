import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

/********************************************************************
 * VerbHeader
 * 
 * This component contains the current verb being tested.
 * It displays the root verb (infinitive), it's translation, 
 * and the current mood/tense being tested.
 ********************************************************************/
class VerbHeader extends Component {
	constructor(props) {
		super(props);

		/* TODO: actually initialize the first verb */
		this.verb = verbs[0]['infinitive'];
		this.translation = verbs[0]['infinitive_english'];
		this.mood = verbs[0]['mood'];
		this.tense = verbs[0]['tense'];
	}

	render() {
		let form = this.mood + ' ' + this.tense;
		return (
			<View style={styles.headerContainer}>
				<Text style={styles.infinitive}>{this.verb}</Text>
				<Text style={styles.translation}>{this.translation}</Text>
				<Text style={styles.moodTense}>{form}</Text>
			</View>
		);
	}
}

/**********************************************************************
 * VerbForms
 *
 * TODO: implement this component. This will contain the area for
 * user input/validation and whatnot.
 **********************************************************************/
class VerbForms extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.verbFormsContainer}>
			</View>
		);
	}
}

/**********************************************************************
 * Conjugator
 *
 * The main wrapper component of the application.
 **********************************************************************/
export default class Conjugator extends Component {
	render() {
		return (
			<View style={styles.container}>
				<VerbHeader />
				<VerbForms />
			</View>
		);
	}
}

/* TODO: use the actual verbs.json data. Either import it from its
 * relative path, or fetch the data with the Fetch API.
 */
const verbs = [{
	"infinitive": "abandonar",
	"infinitive_english": "to abandon, leave behind",
	"mood": "Subjunctive",
	"tense": "Imperfect"
}];

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	headerContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#d3d3d3',
		padding: 25
	},
	verbFormsContainer: {
		flex: 2,
	},
	infinitive: {
		fontSize: 35,
		fontWeight: 'bold'
	},
	translation: {
		fontSize: 25
	},
	moodTense: {
		fontSize: 20,
		margin: 20
	}
})
