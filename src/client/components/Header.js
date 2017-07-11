import React from "react";
import { connect } from "react-redux";

import Nav from "./Nav";

@connect ((store) => {
	return {
		loggedIn: store.user.loggedIn
	};
}) export default class Header extends React.Component {
	render() {
		console.log("loggedIn", this.props.loggedIn);
		return(
			<div>
				#header
				<Nav loggedIn={this.props.loggedIn}/>
			</div>
		);
	}
}