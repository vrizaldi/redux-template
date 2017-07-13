import monk from "monk";

import { mongodb } from "./client.__secret";

export default function getProfile(req, res) {
	const { _id } = req.query;
	
	console.log("req.query", req.query);
	console.log(`Getting profile for ${_id}...`);


	const db = monk(`mongodb://${mongodb.dbuser}:${mongodb.dbpassword}@ds055855.mlab.com:55855/winterest`);
	const users = db.get("users", {castIds: false});
	users.findOne({
		_id
	}).then((user) => {
		console.log("user", user);
		if(user) {
			// user found
			res.json({
				username: user.username,
				imageurl: user.imageurl,
				wins: user.wins
			});
		}
	}).catch((err) => {
		res.status(500).send();
	});
}