import passport from "passport";
import FacebookStrategy from "passport-facebook";
import monk from "monk";
import fs from "file-system";
import jsonwebtoken from "jsonwebtoken";

import { facebook, mongodb } from "./client.__secret";
import cert from "./cert.__secret";

class FacebookTokenManager {
	constructor() {
		this.__initiated = false;
	}

	init() {
		const { client_id, client_secret } = facebook;
		const { dbuser, dbpassword } = mongodb;

		console.log("facebook client_id", client_id);
		console.log("facebook client_secret", client_secret);
		passport.use(new FacebookStrategy({
			clientID: client_id,
			clientSecret: client_secret,
			callbackURL: "http://localhost:21701/logging_in/facebook",
			profileFields: ["id", "displayName", "photos"]

		}, (accessToken, refreshToken, profile, cb) => {
			const db = monk(`mongodb://${mongodb.dbuser}:${mongodb.dbpassword}@ds055855.mlab.com:55855/winterest`);
			const users = db.get("users");
			
			console.log("profile", profile);
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
				console.log("accessToken", userData.accessToken);
				cb({
					username: profile.displayName,
					imageurl: profile.photos[0].value,
					wins: userData.wins,
					accessToken: userData.accessToken
				});
				db.close();
			});

		}));
	}

	getRequestToken(req, res) {
		console.log("authenticating through facebook...");
		passport.authenticate("facebook")(req, res);
	}

	verifyOauth(req, res) {
//		console.log("req", req);
		passport.authenticate("facebook", { failureRedirect: "/login"},
			(userData) => {
				// successful authentication
				console.log("userData", userData);
				res.json(userData);
			})(req, res);
	}
}

export default new FacebookTokenManager;