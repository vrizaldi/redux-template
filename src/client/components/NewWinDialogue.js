import React from "react";

import Modal from "./Modal";
import CloseButton from "./CloseButton";
import InputField from "./InputField";
import Button from "./Button";

export default class NewWinDialogue extends React.Component {
	constructor() {
		super();

		this.state = {
			imageurl: ""		// auto load image as soon as user entered url
		};	
	}

	loadImage() {
		// change the image preview
		const imageurl = document.getElementById("new-win-img-url").value;
		this.setState({
			imageurl
		});
	}

	render() {
		return(
			<Modal show={this.props.show}>
				<div className="modal-header">
					<InputField id="new-win-title"
						placeholder="Enter title here" />
					<CloseButton close={this.props.hideNewWin}/>

				</div>
				<div className="modal-body">
					<img id="img-preview" src={this.state.imageurl}/>
					<InputField id="new-win-img-url"
						placeholder="Image url"
						onInput={this.loadImage.bind(this)}/>
					<textarea id="new-win-desc" 
						className="form-control"
						placeholder="Description"/>
					<Button action={this.props.addWin} className="btn btn-success">+</Button>	
				</div>						
			</Modal>
		);
	}
}