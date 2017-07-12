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
	winsCollection.find({$or: winQuery}).then((docs) => {
		console.log("docs", docs);
		res.json(docs);
	}).catch((err) => {
		console.log("err", err);
	});
}