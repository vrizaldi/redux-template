import React from "react";

export default class Checkbox extends React.Component {
	onChange() {
		this.props.onChange(this.props.value);
	}

	render() {
		return(
			<div className={this.props.divClass}>
				<label for={this.props.id}>{this.props.label}</label>
				<input id={this.props.id}
					className={this.props.className}
					onChange={this.onChange.bind(this)} 
					type="checkbox"
					defaultChecked={this.props.defaultChecked}
				/>
			</div>
		);
	}
}