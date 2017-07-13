import monk from "monk";

import { mongodb } from "./client.__secret";

export default function parseWins(req, res) {
	console.log("req body", req.body);
	const wins = req.body;

	// parse win into query for the database
	var winQuery = wins.map((win) => {
		return {_id: monk.id(win._id)};
	});
	winQuery = winQuery.length == 0 ? [{null:"null"}] : winQuery;
	console.log("winQuery", winQuery);

	// search for the wins
	const db = monk(`mongodb://${mongodb.dbuser}:${mongodb.dbpassword}@ds055855.mlab.com:55855/winterest`);
	const winsCollection = db.get("wins");
	const users = db.get("users", {castIds: false});
	winsCollection.find({$or: winQuery}).then((docs) => {
		console.log("docs", docs);

		// get the username from the id
		const userQuery = docs.map((win) => {
			return win.by_id;
		});
		console.log("userQuery", userQuery);
		users.find({
			_id: {
				$in: userQuery
			}
		}).then((users) => {
			console.log("users", users);

			// append the usernames to the list
			var result = docs.map((doc) => {
				// get the index of the user 
				// (because one user may have multiple posts)
				var i = users.findIndex((user) => user._id == doc.by_id);
				doc.by = users[i].username;
				return doc;
			});
			console.log("result", result);
			res.json(result);
		});
	}).catch((err) => {
		console.log("err", err);
	});
}