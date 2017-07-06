import axios from "axios";
import fs from "file-system";

import yelpTokenManager from "./YelpTokenManager";

export default function scanLocation(req, res) {
	var { term, location } = req.query;
	console.log(`Scanning ${location} for ${term}`);

	axios({
		method: "get",
		url: `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}`,
		headers: {
			Authorization: `Bearer ${yelpTokenManager.getToken()}`
		}
	}).then(function(result) {
		res.json(result.data.businesses);
		console.log("Scanned successfully");
	}).catch(function(err) {
		console.log("err", err);
		console.log("Failed while scanning");
	});
}

