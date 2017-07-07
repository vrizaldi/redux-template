import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import QueryString from "query-string";

import { fetchUserData } from "../actions/UserActions";

@connect((store) => {
	return {
		loggedIn: store.user.loggedIn,
		status: store.user.status
	};
}) export default class Login extends React.Component {
	
	componentDidMount() {
		// load user data
		console.log("location", this.props.location);
		var query = QueryString.parse(this.props.location.search);
		console.log("Query:", query);
		var { oauth_token, oauth_verifier } = query;
		this.props.dispatch(fetchUserData(oauth_token, oauth_verifier));
	}

	render() {
		if(this.props.status == "fetching") {
			// show loading screen
			return(
				<p>Fetching user data...</p>
			);

		} else {
			// if not loading or already finished
			// redirect to home screen
			return(
				<Redirect to="/home" />
			);
		}
	}
}