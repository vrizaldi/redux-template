import monk from "monk";

import { mongodb } from "./client.__secret";

export default function addWin(req, res) {
	console.log("req.body", req.body);
	const { accessToken, newWin } = req.body;
	console.log(`${accessToken} is adding ${newWin}...`);

	// connect to db
	const db = monk(`mongodb://${mongodb.dbuser}:${mongodb.dbpassword}@ds055855.mlab.com:55855/winterest`);
	const users = db.get("users", {castIds: false});
	const wins = db.get("wins");

	// check if user actually exist
	users.findOne({
		accessToken

	}).then((user) => {
		if(user) {
			// user found
			// insert the new win, with some new properties(timestamped, etc.)
			newWin.timestamp = new Date;
			newWin.by_id = user._id;
			newWin.likers = [];
			
			console.log("newWin", newWin);
			wins.insert(newWin).then((newWin) => {
				// update the user's wins
				users.findOneAndUpdate({
					_id: user._id
				}, {
					$push: {
						wins: {
							_id: monk.id(newWin._id)
						}
					}
				}, {returnOriginal: false}
				).then((userChange) => {
					console.log("newWin._id", newWin._id);

					// everything went perfectly
					console.log("userChange", userChange);
					
					// return the new win
					res.json({todo: "add", newWin: [newWin]});
					db.close();

				}).catch((err) => {
					console.log("err", err);
					res.status(500).send();
					db.close();
				});
			});		

		} else {
			// user doesn't exist
			res.status(401).send("User is unauthorized");
			db.close();
		}

	}).catch((err) => {
		console.log("err", err);
		db.close();
	});
}