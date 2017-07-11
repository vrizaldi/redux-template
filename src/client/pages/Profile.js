import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Wins from "../components/Wins";

@connect((store) => {
	return {
		loggedIn: store.user.loggedIn,
		userData: store.user.userData
	}
}) export default class Profile extends React.Component {
	render() {
		if(!this.props.loggedIn) {
			// redirect to home if not logged in
			return <Redirect to="/"/>
		}

		const { username, imageurl, wins } = this.props.userData;
		return(
			<div>
				<h1>{username}</h1>
				<img src={imageurl} alt={username + "'s profile image"}/>
				<Wins wins={wins} />
			</div>
		);
	}
}