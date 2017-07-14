import passport from "passport";
import FacebookStrategy from "passport-facebook";
import monk from "monk";
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
			callbackURL: "https://voyage-baguette-78534.herokuapp.com/logging_in/facebook",
			profileFields: ["id", "displayName", "photos"]

		}, (accessToken, refreshToken, profile, cb) => {
			const db = monk(`mongodb://${mongodb.dbuser}:${mongodb.dbpassword}@ds055855.mlab.com:55855/winterest`);
			const users = db.get("users", {castIds: false});
			
//			console.log("profile", profile);
			// see if user registered
			// if they aren't, register them
			users.findOneAndUpdate({
				_id: profile.id + "facebook"
			}, {
				// update the username and profile photo
				$set: {
					username: profile.displayName,
					imageurl: profile.photos[0].value
				},
				// default values on creation
				$setOnInsert: {
					wins: [],
					accessToken: jsonwebtoken.sign({_id: profile.id + "facebook"}, cert)
				}
			}, {upsert: true}).then((userData) => {
				// pass it on to callback
				console.log("accessToken", userData.accessToken);
				db.close();
				return cb(null, {
					_id: userData._id,
					accessToken: userData.accessToken
				});
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

export default new FacebookTokenManager;