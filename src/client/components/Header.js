import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Nav from "./Nav";
import Button from "./Button";
import NewWinDialogue from "./NewWinDialogue";

@connect ((store) => {
	return {
		loggedIn: store.user.loggedIn
	};
}) export default class Header extends React.Component {

	constructor() {
		super();

		this.state = {
			showingNewWin: false		// for modal
		};
	}
	
	showNewWin() {
		// show modal
		this.setState({
			showingNewWin: true 
		});
	}

	hideNewWin() {
		// hide modal
		this.setState({
			showingNewWin: false 
		});
	}

	addWin() {
		const imageurl = document.getElementById("new-win-img-url").value;
		const title = document.getElementById("new-win-title").value;
		const desc = document.getElementById("new-win-desc").value;
		var newWin = {
			imageurl,
			title,
			desc
		}

		console.log(`Adding ${title} - ${desc} (${imageurl})`, newWin); 
		this.props.dispatch(addWin(this.props.userData.accessToken, newWin));

		// hide the dialogue after
		this.hideNewWin();
	}

	render() {
		console.log("loggedIn", this.props.loggedIn);
		return(
			<header role="banner" className="navbar fixed-top">
				<div className="row">
					<div className="col-md-2">
						<Link className="nav-link" to={this.props.loggedIn ? "/profile" : "/home"}>
							#winterest
						</Link>
					</div>
					{
						this.props.loggedIn ? (
							<div id="win-adder-wrapper" className="col-md-2">
								<Button className="btn btn-success" 
									action={this.showNewWin.bind(this)}
								>
									+
								</Button>
								<NewWinDialogue show={this.state.showingNewWin} 
									addWin={this.addWin.bind(this)} 
									hideNewWin={this.hideNewWin.bind(this)}
								/>
							</div>
						) : ""
					}
					<Nav loggedIn={this.props.loggedIn}/>
				</div>
			</header>
		);
	}
}