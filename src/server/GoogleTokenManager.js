import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import monk from "monk";
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
			callbackURL: "https://voyage-baguette-78534.herokuapp.com/logging_in/google"

		}, (accessToken, refreshToken, profile, cb) => {
			console.log("profile", profile);
			const db = monk(`mongodb://${mongodb.dbuser}:${mongodb.dbpassword}@ds055855.mlab.com:55855/winterest`);
			const users = db.get("users", {castIds: false});

//			console.log("profile", profile);
			// see if user registered
			// if they aren't, register them
			users.findOneAndUpdate({
				_id: profile.id + "google"
			}, {
				// update the username and profile photo
				$set: {
					username: "+" + profile.displayName,
					imageurl: profile.photos[0].value
				},
				// default values on creation
				$setOnInsert: {
					wins: [],
					accessToken: jsonwebtoken.sign({_id: profile.id + "google"}, cert)
				}
			}, {upsert: true}).then((userData) => {
				// pass it on to callback
				db.close();
				return cb(null, {
					_id: userData._id,
					accessToken: userData.accessToken
				});
			});
		}));
	}

	getRequestToken(req, res) {
		console.log("Authenticating through Google+...");
		(req, res);
	}

	verifyOauth(req, res) {
		res.json({
			_id: req.user._id,
			accessToken: req.user.accessToken
		});
	}
}

export default new GoogleTokenManager;