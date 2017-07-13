import React from "react";

import Button from "../components/Button";

export default class Login extends React.Component {
	render() {
		return(
			<div>
				<h1 id="title">#Login</h1>
				<a href="/login_twitter" className="btn btn-block btn-social btn-twitter">
					<span className="fa fa-twitter"/>Login with twitter
				</a>

				<a href="/login_facebook" className="btn btn-block btn-social btn-facebook">
					<span className="fa fa-facebook"/>Login with Facebook
				</a> 

				<a href="/login_google" className="btn btn-block btn-social btn-google">
					<span className="fa fa-google"/>Login with Google+
				</a> 
			</div>
		);
	}
}