import React, { Component } from 'react';
import { Text, View, Button, Modal, StyleSheet, FlatList, Switch } from 'react-native';

const _ = require('underscore');

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

	/* function for rendering a FlatList element in the settings modal.
	 * Each element is a tense string, followed by a Switch component
	 */
	renderSetting(item) {
		return (
			<View style={styles.setting}>
				<Text>{item.key}</Text>
				<Switch
					value={this.props.data[item.key]}
					onValueChange={() => this.props.parentCallback(item.key)}
				/>
			</View>
		);
	}

	render() {
		/* the FlatList component expects an array of hashes of the form { key: '...' }
		 * Each of these keys corresponds to a key in the this.props.data hash.
		 */
		tenses = this.props.data;
		tenseHash = _.map(_.keys(tenses), function(tense) {
			return { key: tense }
		});

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
								data={tenseHash}
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
		padding: 3,
		alignItems: 'center',
		justifyContent: 'space-between',
		borderTopWidth: 0.5,
		borderColor: 'black',
	},
});
