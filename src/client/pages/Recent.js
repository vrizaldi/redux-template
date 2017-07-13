import React from "react";
import { connect } from "react-redux";

import { fetchRecent } from "../actions/ProfileActions";
import { like } from "../actions/UserActions";

import Wins from "../components/Wins";

@connect((store) => {
	return {
		status: store.recent.status,
		loggedIn: store.user.loggedIn,
		userData: store.user.userData,
		wins: store.recent.wins	
	}
}) export default class Recent extends React.Component {
	
	componentDidMount() {
		this.props.dispatch(fetchRecent());
	}

	like(winID, liking) {
		console.log("winID", winID);
		this.props.dispatch(
			like(this.props.userData.accessToken, winID, liking));
	}

	render() {
		console.log("wins", this.props.wins);
		return(
			<div>
				<h1 id="title"> #Recent&nbsp;
					{
						this.props.status == "fetching" ? (
							<p id="loading">
								<i class="fa fa-spinner fa-pulse fa-4x"/>
							</p>
						) : ""
					}
				</h1>
				<Wins wins={this.props.wins} 
					user_id={this.props.userData._id}
					delete={false}
					like={this.props.loggedIn ? this.like.bind(this) : false}
				/>
			</div>
		);
	}
}