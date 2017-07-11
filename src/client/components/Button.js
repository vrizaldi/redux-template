import React from "react";

export default class Button extends React.Component {
	
	click() {
		this.props.action(this.props.value);
	}

	render() {
		return(
			<button id={this.props.id}
				className={this.props.className}
				onClick={this.click.bind(this)}
				value={this.props.value}
			>
				{this.props.children}
			</button>
		);
	}
}