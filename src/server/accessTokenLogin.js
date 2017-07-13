import monk from "monk";

import { mongodb } from "./client.__secret";

export default function accessTokenLogin(req, res) {
	const { accessToken } = req.body;
	console.log("accessToken", accessToken);

	const db = monk(`mongodb://${mongodb.dbuser}:${mongodb.dbpassword}@ds055855.mlab.com:55855/winterest`);
	const users = db.get("users", {castIds: false});

	users.findOne({
		accessToken
	}).then((user) => {
		if(user) {
			// user found
			// everything went perfectly
			res.json({
				_id: user._id,
				accessToken: accessToken
			});

		} else {
			// user not found
			res.status(401).send("Unauthorized access. Invalid access token detected");
		}
	});
}