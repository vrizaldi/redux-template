import React from "react";

export default class Input extends React.Component {
	render() {
		return(
			<div>
				<label for={this.props.id}>{this.props.label}</label>
				<input id={this.props.id} 
					type={this.props.type ? this.props.type : "text"}/>
			</div>
		);
	}
}