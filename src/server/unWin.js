import monk from "monk";

import { mongodb } from "./client.__secret";

export default function unWin(req, res) {
	const { accessToken, winID } = req.body;
	console.log("accessToken", accessToken);
	console.log("winID", winID);

	const db = monk(`mongodb://${mongodb.dbuser}:${mongodb.dbpassword}@ds055855.mlab.com:55855/winterest`);
	const users = db.get("users", {castIds: false});
	const wins = db.get("wins");

	users.findOneAndUpdate({
		accessToken
	}, {
		$pull: {
			wins: {
				_id: monk.id(winID)
			}
		}
	}).then((user) => {
		console.log("user before", user);
		if(user) {
			// user found and updated
			// remove the win
			return wins.remove({
				_id: monk.id(winID)
			});
		}
	}).then(() => users.findOne({
		accessToken
	})).then((user) => {
		if(user) {
			// everything went perfectly
			console.log("user after", user);
			res.json({todo: "remove", winID});		// return the removed win's ID
		}
		db.close();
	}).catch((err) => {
		res.status(500).send();
		db.close();
	});
}