import React from "react";
import { Switch, Route } from "react-router-dom";

import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import LoggingIn from "../pages/LoggingIn";

export default class Main extends React.Component {
	render() {
		return(
			<div>
				<h1>#Main</h1>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route path="/profile" component={Profile}/>
					<Route path="/login" component={Login}/>
					<Route path="/logging_in" component={LoggingIn}/>
				</Switch>
			</div>
		);
	}
}