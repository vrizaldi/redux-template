import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import queryString from "query-string";

import Wins from "../components/Wins";

import { loadProfile, reset, personalize } from "../actions/ProfileActions";
import { unWin, like } from "../actions/UserActions";

import sortWins from "../utils/sortWins";

@connect((store) => {
	return {
		loggedIn: store.user.loggedIn,
		status: store.profile.status,
		personal: store.profile.personal,
		profileData: store.profile.profileData,
		userData: store.user.userData
	}
}) export default class Profile extends React.Component {

	constructor() {
		super();

		this.state = {
			redirectHome: false
		};
	}

	componentWillMount() {
		this.setState({
			redirectHome: false
		});
		this.props.dispatch(reset());
	}

	componentDidMount() {
		// load the profile data
		const query = queryString.parse(this.props.location.search);
		console.log("query", query);

		if(query.id) {
			// id found, load profile
			this.props.dispatch(loadProfile(query.id));

			// tis personal, allow user to modify wins
			if(query.id == this.props.userData._id) this.props.dispatch(personalize());

		} else {
			// no id specified, redirect home
			this.setState({
				redirectHome: true 
			});
		}
	}

	delete(winID) {
		console.log("winID", winID);
		this.props.dispatch(unWin(this.props.userData.accessToken, winID));
	}

	like(winID, liking) {
		console.log("winID", winID);
		this.props.dispatch(
			like(this.props.userData.accessToken, this.props.userData._id, winID, liking));
	}

	render() {
		if(this.state.redirectHome) {
			// redirect to home if needed
			// (e.g. when profile id not specified)
			return <Redirect to="/"/>
		} 

		const { username, imageurl, wins } = this.props.profileData;
		sortWins(wins); // sort the wins in dates
		return(
			<div>
				<h1 id="title">{username}&nbsp;
					{
						this.props.status == "fetching" ? (
							<i class="fa fa-spinner fa-pulse"/>
						) : ""
					}
				</h1>

				<img src={imageurl} alt={username + "'s profile image"}/>
				<Wins wins={wins} 
					user_id={this.props.userData._id}
					delete={
						this.props.personal ? this.delete.bind(this) : false
					}
					like={this.props.loggedIn ? this.like.bind(this) : false}
				/>
			</div>
		);
	}
}