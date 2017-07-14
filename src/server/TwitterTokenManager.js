import passport from "passport";
import TwitterStrategy from "passport-twitter";
import monk from "monk";
import jsonwebtoken from "jsonwebtoken";

import { twitter, mongodb } from "./client.__secret";
import cert from "./cert.__secret";

class TwitterTokenManager {
	constructor() {
		this.__initiated = false;
	}

	init() {
		// only called once
		if(this.__initiated) return;
		this.__initiated = true;

		const { client_id, client_secret } = twitter;
		const { dbuser, dbpassword } = mongodb;

		passport.use(new TwitterStrategy({
			consumerKey: client_id,
			consumerSecret: client_secret,
			callback: "https://voyage-baguette-78534.herokuapp.com/logging_in/twitter"
		}, (token, tokenSecret, profile, cb) => {
//			console.log("profile", profile);
			// find and update the user
			// insert new user if not registered
			const db = monk(`mongodb://${mongodb.dbuser}:${mongodb.dbpassword}@ds055855.mlab.com:55855/winterest`);
			const users = db.get("users", {castIds: false});
			users.findOneAndUpdate({
				_id: profile.id + "twitter"
			}, {
				// update the username and profile photo
				$set: {
					username: "@" + profile.username,
					imageurl: profile.photos[0].value
				},
				$setOnInsert: {
					wins: [],
					accessToken: jsonwebtoken.sign({_id: profile.id + "twitter"}, cert)
				}
			}, {upsert: true}).then((userData) => {
				// everything went perfectly
				db.close();
				return cb(null, {
					_id: userData._id,
					accessToken: userData.accessToken
				});
			}).catch((err) => {
				console.log("Caught some error");
			});
		}));
	}

	verifyOauth(req, res) {
		res.json({
			_id: req.user._id,
			accessToken: req.user.accessToken
		});
	}
} 

export default new TwitterTokenManager;