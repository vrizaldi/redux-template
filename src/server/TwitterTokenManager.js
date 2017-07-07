import axios from "axios";
import Twitter from "node-twitter-api";
import mongo from "mongodb";

import twitterAuth from "./TwitterAuth";

class TwitterTokenManager {
	constructor() {
		this.initialised = false;

		this.__twitter = null;
		this.__requestSecrets = {};
			// store the request secrets with request token as key
	}

	init() {
		if(this.initialised) return;
		this.initialised = true;

		console.log("twitter client_id:", twitterAuth.client_id);
		console.log("twitter client_secret:", twitterAuth.client_secret);

		this.__twitter = new Twitter({
			consumerKey: twitterAuth.client_id,
			consumerSecret: twitterAuth.client_secret,
			callback: "https://murmuring-escarpment-21704.herokuapp.com/login"
		});
	}

	getRequestToken(req, res) {
		this.__twitter.getRequestToken(
			(err, requestToken, requestSecret) => {
				if(err) {
					console.log("Failed", err);
					res.status(500).send(err);

				} else {
					this.__requestSecrets[requestToken] = requestSecret;
					console.log("request_token:", requestToken);
					console.log("request_secret:", requestSecret);
					res.redirect(`https://api.twitter.com/oauth/authorize?oauth_token=${requestToken}`);
				}
			});
	}

	getAccessToken(req, res) {
		var { oauth_token, oauth_verifier } = req.query;
		console.log("request token:", oauth_token);
		console.log("request verifier:", oauth_verifier);
		if(!this.__requestSecrets.hasOwnProperty(oauth_token)) {
			// request token is invalid
			res.status(401).send("Invalid oauth_token");
		} 

		// retrieve the access token and secret
		var oauth_secret = this.__requestSecrets[oauth_token];
		this.__twitter.getAccessToken(
			oauth_token, 
			oauth_secret, 
			oauth_verifier, (err, accessToken, accessSecret) => {
				if(err) {
					console.log("err", err);
					res.status(err.statusCode).send(err);
				} else {
					console.log("accessToken:", accessToken);
					console.log("accessSecret:", accessSecret);

					// verify the user and return the user creds
					this.__twitter.verifyCredentials(
						accessToken,
						accessSecret, (err, user) => {
							if(err) {
								throw err;

							} else {
								console.log(user);

								// register user if not registered in database
								mongo.connect("mongodb://admin:a$ianDad@ds151222.mlab.com:51222/nightnight", (err, db) => {
									this.registerUser(err, db, user);
								});

								res.json({
									id: user.id,
									username: user.screen_name,
									imageurl: user.profile_image_url_https
								});
							}
						});
				}
			});
	}

	registerUser(err, db, user) {
		// check if user exists
		db.collection("users").find({
			id: user.id
		}).toArray((err, docs) => {
			if(err) {
				throw err;

			} else {
				if(docs.length == 0) {
					// user not found
					// register the new user
					console.log(`Registering new user ${user.id}`);
					db.collection("users").save({
						id: user.id,
						goingTo: []
					});
				}
			}
		});
	}
}

export default new TwitterTokenManager;