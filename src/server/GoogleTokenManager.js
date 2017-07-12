import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import monk from "monk";
import fs from "file-system";
import jsonwebtoken from "jsonwebtoken";

import { google, mongodb } from "./client.__secret";
import cert from "./cert.__secret";

class GoogleTokenManager {
	constructor() {
		this.__initiated = false;
	}

	init() {
		// only called once
		if(this.__initiated) return;
		this.__initiated = true;

		const { client_id, client_secret } = google;
		const { dbuser, dbpassword } = mongodb;

		console.log("google client_id", client_id);
		console.log("google client_secret", client_secret);
		passport.use(new GoogleStrategy.Strategy({
			clientID: client_id,
			clientSecret: client_secret,
			callbackURL: "http://localhost:21701/logging_in/google"
		}, (accessToken, refreshToken, profile, cb) => {
			console.log("profile", profile);
			const db = monk(`mongodb://${mongodb.dbuser}:${mongodb.dbpassword}@ds055855.mlab.com:55855/winterest`);
			const users = db.get("users");

//			console.log("profile", profile);
			// see if user registered
			// if they aren't, register them
			users.findOneAndUpdate({
				_id: monk.id(parseInt(profile.id))
			}, {
				$setOnInsert: {
					// default values on creation
					wins: [],
					accessToken: jsonwebtoken.sign({_id: profile.id}, cert)
				}
			}, {upsert: true}).then((userData) => {
				// pass it on to callback
				cb({
					username: "+" + profile.displayName,
					imageurl: profile.photos[0].value,
					wins: userData.wins
				});
				db.close();
			});
		}));
	}

	getRequestToken(req, res) {
		console.log("Authenticating through Google+...");
		passport.authenticate("google", {scope: ["profile"]})(req, res);
	}

	verifyOauth(req, res) {
		console.log("verifying google");
		passport.authenticate("google", {failureRedirect: "/login"},
			(userData) => {
				// successful auth
				console.log("userdata", userData);
				res.json(userData);
			})(req, res);
	}
}

export default new GoogleTokenManager;