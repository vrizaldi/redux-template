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
			<header className="navbar fixed-top">
				<div className="row">
					<div id="logo" className="col-md-3">
						
					</div>

					<div className="col-md-9">
						{
							this.props.loggedIn ? (
								<p className="nav-item"
									id="greeting"
								>
									Hello, {this.props.username}
								</p>
							) : (
								<a id="twitter-button" 
									className="nav-link nav-item" 
									href="/login_twitter"
								>
									<Button className="btn btn-primary" label="Login with Twitter"/>
								</a>
							)
						}
					</div>
				</div>
			</header>
		);
	}
}