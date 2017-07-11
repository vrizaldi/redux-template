import React from "react";

export default class InputField extends React.Component {
	render() {
		return(
			<div className={this.props.groupClassName}>
				<label for={this.props.id}>{this.props.label}</label>
				<input id={this.props.id}
					className={this.props.className}
					type={this.props.type}
					placeholder={this.props.placeholder}
					value={this.props.value}
					disabled={this.props.disabled}
				/>
			</div>
		);
	}
}