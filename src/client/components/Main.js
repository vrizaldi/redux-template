import React from "react";
import { Switch, Route } from "react-router-dom";

import Login from "../pages/Login";
import Profile from "../pages/Profile";
import LoggingIn from "../pages/LoggingIn";
import Recent from "../pages/Recent";

export default class Main extends React.Component {
	render() {
		return(
			<main>
				<Switch>
					<Route exact path="/" component={Recent}/>
					<Route path="/profile" component={Profile}/>
					<Route path="/login" component={Login}/>
					<Route path="/logging_in" component={LoggingIn}/>
				</Switch>
			</main>
		);
	}
}