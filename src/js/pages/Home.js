import React from "react";
import { connect } from "react-redux";

import Input from "../components/Input";
import Button from "../components/Button";
import { scan } from "../actions/ListActions";

@connect((store) => {
	return {
		status: store.list.status,
		businesses: store.list.businesses
	}
}) export default class Home extends React.Component {
	
	scan() {
		var location = document.getElementById("location").value;
		this.props.dispatch(scan(location));
	}

	render() {
		return(
			<div>
				<p>#home</p>
				<Input id="location" 
					label="Location" />
				<Button 
					label="Scan it!"
					onClick={this.scan.bind(this)}/>
				
				{	
					// if loading
					this.props.fetching ? 
						(<p>Scanning area...</p>) : ""
				}

				{this.props.businesses.length == 0 ?
					"" : (
						// if list containst some item
						// list the businesses
						this.props.businesses.map((business) => {
							return(
								<div>
									<h1>
										<a href={business.url}>{business.name}</a>
										({business.isClosed ? "Closed" : "Open!"})
									</h1>
									<p>{business.rating} stars</p>
									<ul>
										<li>Address: {business.location.address1}, {business.location.city} ({business.location.zip_code})</li>
										<li>Phone: {business.display_phone}</li>
									</ul>
								</div>
							);
						})
					)}
			</div>
		);
	}
}