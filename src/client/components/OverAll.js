import React from "react";

export default class OverAll extends React.Component {
	render() {
		return(
			<div id="over-all">
				<p id="over-all-text">{this.props.text}</p>
			</div>
		);
	}
}