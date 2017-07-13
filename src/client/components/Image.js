import React from "react";

export default class Image extends React.Component {
	constructor() {
		super();
		
		this.state = {
			imageurl: ""
		};
	}

	componentWillMount() {
		this.setState({
			imageurl: this.props.src 
		});
	}

	onError() {
		this.setState({
			imageurl: "http://memeguy.com/photos/thumbs/when-my-mom-asks-me-if-ive-met-any-nice-girls-at-college-55500.gif" 
		});
	}

	render() {
		return(
			<img src={this.state.imageurl} onError={this.onError.bind(this)}/>
		);
	}
}