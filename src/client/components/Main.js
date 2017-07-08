import React from "react";
import { connect } from "react-redux"; 

import * as Actions from "../actions/Actions";

@connect((store) => {
	return {
		text: store.text.text
	};
}) export default class Main extends React.Component {
	render() {
		return(
			<div>
				<p>{this.props.text}</p>
				<button onClick={this.changeText.bind(this)}>Click!</button>
			</div>
		);
	}

	changeText() {
		this.props.dispatch(Actions.changeText("It works"));
	}
}