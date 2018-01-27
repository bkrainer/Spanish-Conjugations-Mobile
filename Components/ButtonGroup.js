import React, { Component } from 'react';
import { TouchableHighlight, Text, View } from 'react-native';

/********************************************************************************
 * ButtonGroup
 *
 * Component for rendering a group of buttons.
 * Props:
 * 	- group: hash, mapping key -> display text
 * 	- groupStyle: style to apply to the button group container
 * 	- buttonStyle: the style to apply to each individual button
 * 	- underlayColor: the underlay color for the touchableHighlight
 * 	- handler: event handler for onPress events
 * 	- textStyle: style to apply to the text within each button
 * 	- selectedKey: which button in this group is currently selected
 * 	- selectedButtonStyle: style for selectedKey button
 * 	- selectedButtonTextStyle: style for selectedKey text
 * 	- corrects: hash of key => whether that key currently has correct input
 * 	- correctStyle: additional styling to apply to keys that are correct.
 ********************************************************************************/
export class ButtonGroup extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const groupKeys = Object.keys(this.props.group);
		const renderedGroup = groupKeys.map(key => {
			let display = this.props.group[key];
			let buttonStyle = [ this.props.buttonStyle ];
			let textStyle = this.props.textStyle;

			if (key == this.props.selectedKey) {
				buttonStyle = [ this.props.selectedButtonStyle ];
				textStyle = this.props.selectedButtonTextStyle;
			}

			if (this.props.corrects[key]) {
				buttonStyle.push(this.props.correctStyle);
				//display += ' ✓';
			}

			return <TouchableHighlight
				style={buttonStyle}
				underlayColor={this.props.underlayColor}
				onPress={() => this.props.handler(key)}
				key={key}
			>
				<Text style={textStyle}>{display}</Text>
			</TouchableHighlight>
		});

		return (
			<View style={this.props.groupStyle}>
				{renderedGroup}
			</View>
		);
	}
}
