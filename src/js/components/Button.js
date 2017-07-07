import React from "react";

export default class Button extends React.Component {
	
	onClick() {
		this.props.onClick(this.props.value);
	}

	render() {
		return(
			<button onClick={this.onClick.bind(this)}
				className={this.props.className}
				value={this.props.value}
			>
				{this.props.label}
			</button>
		);
	}
}