import React from "react";

export default class Modal extends React.Component {
	render() {
		console.log("show", this.props.show);
		return(
			<div className={"modal fade" + (this.props.show ? " show" : "")}>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						{this.props.children}
					</div>
				</div>
			</div>
		);
	}
}