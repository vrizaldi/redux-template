import React from "react";
import { connect } from "react-redux";

import { loginTwitter } from "../actions/UserActions";
import Button from "../components/Button";

@connect((store) => {
	return {
		loggedIn: store.user.loggedIn,
		username: store.user.userData.username,
		imageurl: store.user.userData.imageurl
	};
}) export default class Header extends React.Component {

	render() {
		return(
			<header>
				#header
				{
					this.props.loggedIn ? (
						<p>Hello, {this.props.username}</p>
					) : (
						<a href="/login_twitter">
							<Button label="Login with Twitter"/>
						</a>
					)
				}
			</header>
		);
	}
}