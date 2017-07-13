import monk from "monk";

import { mongodb } from "./client.__secret";

export default function getRecentFunction(req, res) {
	const db = monk(`mongodb://${mongodb.dbuser}:${mongodb.dbpassword}@ds055855.mlab.com:55855/winterest`);
	const wins = db.get("wins");
	wins.find({}, {
		// sort recent to oldest
		sort: {
			_id: -1
		},
		// get the first 20
		limit: 20
	}).then((docs) => {
		console.log("docs", docs);
		res.json(docs);
	}).catch((err) => {
		res.status(500).send();
	});
}