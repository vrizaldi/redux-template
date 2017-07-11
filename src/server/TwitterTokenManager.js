import twitterAPI from "node-twitter-api";
import monk from "monk";

import { twitter, mongodb } from "./client.__secret";

class TwitterTokenManager {
	constructor() {
		this.__initiated = false;
		this.__twitterOauth = null;
		this.__requestStore = null;
	}

	init() {
		// only called once
		if(this.__initiated) return;
		this.__initiated = true;

		console.log("Initialising twitter...");
		console.log("client_id:", twitter.client_id);
		console.log("client_secret", twitter.client_secret);
		this.__twitterOauth = twitterAPI({
			consumerKey: twitter.client_id,
			consumerSecret: twitter.client_secret,
			callback: "http://127.0.0.1:21701/logging_in/twitter"
		}); 
		this.__requestStore = {};
	}

	getRequestToken(req, res) {
		console.log("User is logging in through twitter...");
		this.__twitterOauth.getRequestToken((err, requestToken, requestSecret) => {
			if(err) {
				res.status(500).send();

			} else {
				// store request token and secret
				this.__requestStore[requestToken] = requestSecret;

				// redirect user to twitter login screen
				res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
			}
		});
	}

	verifyOauth(req, res) {
		const { requestToken, requestVerifier } = req.body;
		console.log("requestToken", requestToken);
		console.log("requestVerifier", requestVerifier);

		// see if request token is valid
		if(this.__requestStore.hasOwnProperty(requestToken)) {
			// request token valid
			// use the requests token, verifier and secret to get access token
			const requestSecret = this.__requestStore[requestToken];
			this.__twitterOauth.getAccessToken(
				requestToken,
				requestSecret,
				requestVerifier, (err, accessToken, accessSecret) => {
					if(err) {
						res.status(err.statusCode).send();
					}

					console.log("accessToken", accessToken);
					console.log("accessSecret", accessSecret);
					// get user data
					this.__twitterOauth.verifyCredentials(
						accessToken, 
						accessSecret, (err, userTwitter) => {
							if(err) {
								res.status(500).send();

							} else {
								// user data retrieved
								console.log("userID", userTwitter.id);

								// find the user in the database
								const db = monk(`mongodb://${mongodb.dbuser}:${mongodb.dbpassword}@ds055855.mlab.com:55855/winterest`);

								const users = db.get("users");
								users.findOne({
									_id: monk.id(userTwitter.id)
								}).then((userData) => {
									if(userData) {
										// user found
										// return the user data
										this.__returnUserData(res, userData, userTwitter);

									} else {
										// new user, register them
										users.insert({
											_id: monk.id(userTwitter.id),
											wins: []
										}).then((userData) => {
											// new user created
											this.__returnUserData(res, userData, userTwitter);
										}).catch((err) => {
											res.status(500).send();
										});
									}

								}).catch((err) => {
									console.log("err", err);
								});
							}
						});
				});

		} else {
			console.log("Invalid request token detected");
			res.status(401).send("Invalid request token detected");
		}	
	}

	__returnUserData(res, userData, userTwitter) {
		console.log("User data retrieved successfully");
		res.json({
			username: "@" + userTwitter.screen_name,
			imageurl: userTwitter.profile_image_url_https,
			wins: userData.wins
		});
	} 

} 

export default new TwitterTokenManager;