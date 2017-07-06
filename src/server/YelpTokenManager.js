import axios from "axios";
// import fs from "file-system";

import yelpAuth from "./YelpAuth";

class TokenManager {
	constructor() {
		this.__initialised = false;
		this.__accessToken = "";
	}

	init() {
		if(this.__initialised) return;

		// to be called once by server
		this.__accessToken = "";
		this.renewToken();
		setInterval(this.renewToken.bind(this), 604800000);
			// renew token every week

		this.__initialised = true;
	}

	getToken() {
		return this.__accessToken;
	}

	renewToken() {
		
		this.getNewToken()
			.then((res) => {
				this.__accessToken = res.data.access_token;
				console.log("yelp access_token:", this.__accessToken);		
			}).catch((err) => {
				console.log("Failed to obtain access token:", err);
				this.renewToken();
					// try renew token again
			});
	}

	getNewToken() {

		// get the client_id and client_secret from (secret) files
		console.log("yelp client id:", yelpAuth.client_id);
		console.log("yelp client secret", yelpAuth.client_secret);
		console.log("Getting access token...");

		// get the access token
		return axios.post("https://api.yelp.com/oauth2/token",
			`grant_type=client_credentials&client_id=${yelpAuth.client_id}&client_secret=${yelpAuth.client_secret}`);
	}
}

export default new TokenManager;