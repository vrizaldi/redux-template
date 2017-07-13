import React from "react";
import { Link } from "react-router-dom";

export default class Nav extends React.Component {
	render() {
		return(
			<div id="nav" className="col-md-8">
				{
					this.props.loggedIn ? (
						<nav className="nav justify-content-center">

							<Link className="nav-link" 
								to={"/profile?id=" + this.props.id}
							>
								<span className="fa fa-user-circle-o"/> Profile
							</Link>

							<Link className="nav-link"
								to="/"
							>
								<span className="fa fa-home"/> Home
							</Link>

						</nav>
					) : (
						<Link className="nav-link" to="/login">
							<span className="fa fa-hand-o-right"/> Login
						</Link>
					)
				}
			</div>
		);
	}
}