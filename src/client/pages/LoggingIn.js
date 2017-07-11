import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import queryString from "query-string";

import OverAll from "../components/OverAll";
import { fetchUserTwitter, fetchUserFacebook, fetchUserGoogle } from "../actions/UserActions";

@connect((store) => {
	return {
		status: store.user.status,
		loggedIn: store.user.loggedIn
	};
}) export default class LoggingIn extends React.Component {
	
	componentDidMount() {
		const query = queryString.parse(this.props.location.search);

		// parse pathname, determine which site the auth is for
		var path = this.props.location.pathname.split("/");
		var site = path[2];		// second dir (/logging_in/[site])
		console.log("site", site);
		console.log("location", this.props.location);
		switch(site) {
		case "facebook":
			// redirect the query (and hashes) to server
			this.props.dispatch(fetchUserFacebook(this.props.location.search + this.props.location.hash));
			break;

		case "google":
			// redirect the query (and hashes) to server
			this.props.dispatch(fetchUserGoogle(this.props.location.search + this.props.location.hash));
			break;

		case "twitter":
			// auth twitter
			const { oauth_token, oauth_verifier } = query;
			console.log("oauth_token", oauth_token);
			console.log("oauth_verifier", oauth_verifier);

			// fetch user data if token and verifier is provided
			if(oauth_token && oauth_verifier) this.props.dispatch(fetchUserTwitter(oauth_token, oauth_verifier));
			break;
		}
	}

	render() {
		if(this.props.loggedIn) {
			// redirect to profile if logged in
			console.log("loggedIn", this.props.loggedIn);
			return(
				<Redirect to="/profile"/>
			);

		} 

		// fetching user data
		return(
			<OverAll text="Logging in..."/>
		);
	}
}