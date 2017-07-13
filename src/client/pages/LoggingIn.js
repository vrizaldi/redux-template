import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import queryString from "query-string";

import OverAll from "../components/OverAll";
import { fetchUserTwitter, fetchUserFacebook, fetchUserGoogle } from "../actions/UserActions";

@connect((store) => {
	return {
		status: store.user.status,
		loggedIn: store.user.loggedIn,
		id: store.user.userData._id
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
			// redirect the query (and hashes) to server
			this.props.dispatch(fetchUserTwitter(this.props.location.search + this.props.location.hash));
			break;
		}
	}

	render() {
		if(this.props.loggedIn) {
			// redirect to profile if logged in
			console.log("loggedIn", this.props.loggedIn);
			return(
				<Redirect to={"/profile?id=" + this.props.id}/>
			);

		} 

		// fetching user data
		return(
			<div>
				<h1 id="title">Please Wait.</h1>
				<p>Logging in...</p>
			</div>
		);
	}
}