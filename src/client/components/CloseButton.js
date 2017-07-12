import React from "react";

import Button from "./Button";

export default class CloseButton extends React.Component {
	render() {
		return(
			<Button className="close" action={this.props.close}>
				<span aria-hidden="true">&times;</span>
			</Button>
		);
	}
}