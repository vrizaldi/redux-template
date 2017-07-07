import React from "react";

export default class VenueList extends React.Component {
	
	render() {
		return(
			<div id="venue-list">
				{
					this.props.businesses.map((business) => {
						return(
							<div className="venue">
								<div className="row">
									<div className="col-md-3">
										<img class="venue-img"
											src={business.image_url} alt={business.name} />
									</div>

									<div className="about-venue col-md-9">
										<h1 className="venue-name">
											<a href={business.url}>{business.name}</a>
											({business.isClosed ? "Closed" : "Open!"})
										</h1>
										<p className="venue-ratings">{business.rating} stars</p>
										{
											this.props.loggedIn ? (
												<Checkbox id={business.phone}
													divClass="indicator"
													onChange={this.props.goingTo} 
													value={business.phone} 
													key={business.phone}
													label="Coming here"
													defaultChecked={business.going ? true : false}
												/>
											) : ""
										}
										<ul className="venue-info">
											<li>Address: {business.location.address1}, {business.location.city} ({business.location.zip_code})</li>
											<li>Phone: {business.display_phone}</li>
										</ul>
									</div>
								</div>
							</div>
						);
					})
				}
			</div>
		);
	}
}