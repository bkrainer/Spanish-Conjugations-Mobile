import React, { Component } from 'react';
import { Text, View, Button, Modal, StyleSheet, FlatList, Switch } from 'react-native';

export class Settings extends Component {
	state = {
		modalVisible: false,
	};

	openModal() {
		this.setState({ modalVisible: true });
	}

	closeModal() {
		this.setState({ modalVisible: false });
	}

	renderSetting(item) {
		return (
			<View style={styles.setting}>
				<Text>{item.key}</Text>
				<Switch
					value={true}
				/>
			</View>
		);
	}

	render() {
		return (
			<View>
				<Modal
					visible={this.state.modalVisible}
					animationType={'slide'}
					onRequestClose={() => this.closeModal()}
				>
					<View style={styles.modalContainer}>
						<View style={styles.innerContainer}>
							<FlatList
								data={tenses}
								renderItem={({item}) => this.renderSetting(item)}
							/>
							<Button
								onPress={() => this.closeModal()}
								title="Close"
							>
							</Button>
						</View>
					</View>
				</Modal>
				<Button
					onPress={() => this.openModal()}
					title="Settings"
				/>
			</View>
		);
	}
}

const tenses = [
	{ key: 'Indicative Present'},
	{ key: 'Indicative Future'},
	{ key: 'Indicative Imperfect'},
	{ key: 'Indicative Preterite'},
	{ key: 'Indicative Conditional'},
	{ key: 'Indicative Present Perfect'},
	{ key: 'Indicative Future Perfect'},
	{ key: 'Indicative Past Perfect'},
	{ key: 'Indicative Preterite (Archaic)'},
	{ key: 'Indicative Conditional Perfect'},
	{ key: 'Subjunctive Present'},
	{ key: 'Subjunctive Imperfect'},
	{ key: 'Subjunctive Future'},
	{ key: 'Subjunctive Present Perfect'},
	{ key: 'Subjunctive Future Perfect'},
	{ key: 'Subjunctive Past Perfect'},
	{ key: 'Imperative Affirmative Present'},
	{ key: 'Imperative Negative Present'},
];

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	modalContainer: {
		flex: 1,
		backgroundColor: '#f7f7f7',
	},
	innerContainer: {
		padding: 25,
		flex: 1,
	},
	setting: {
		flex: 1,
		flexDirection: 'row',
		margin: 1,
		padding: 3,
		alignItems: 'center',
		justifyContent: 'space-between',
		borderWidth: 0.5,
		borderColor: 'black',
	},
});
