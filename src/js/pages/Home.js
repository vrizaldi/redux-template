import React from "react";
import { connect } from "react-redux";

import Input from "../components/Input";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
import { scan } from "../actions/ListActions";
import { goingTo, cancelTo } from "../actions/UserActions";
import VenueList from "../components/VenueList";

@connect((store) => {
	return {
		loggedIn: store.user.loggedIn,
		id: store.user.userData.id,
		status: store.list.status,
		businesses: store.list.businesses
	}
}) export default class Home extends React.Component {
	
	scan() {
		var location = document.getElementById("location").value;
		if(this.props.loggedIn) 
			this.props.dispatch(scan(location, this.props.id));
		else this.props.dispatch(scan(location));
	}

	goingTo(locationID) {
		console.log(locationID);
		var going = document.getElementById(locationID).checked;
			// whether it changes from checked to unchecked or vice versa
		if(going)
			this.props.dispatch(goingTo(this.props.id, locationID));
		else this.props.dispatch(cancelTo(this.props.id, locationID));
	} 

	render() {
		return(
			<div>
				<div id="search-form">
					<Input id="location" className="form-control"
						label="Enter your location here:" />
					<Button id="scan-button"
						className="btn btn-success"
						label="Scan it!"
						onClick={this.scan.bind(this)}/>
				</div>

				{	
					// if loading
					this.props.status == "fetching" ? 
						(<p>Scanning area...</p>) : ""
				}

				{
					this.props.businesses.length == 0 ?
						"" : <VenueList 
									goingTo={this.goingTo.bind(this)}
									businesses={this.props.businesses} />
				}
			</div>
		);
	}
}