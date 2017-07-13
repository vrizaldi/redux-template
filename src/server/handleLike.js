import monk from "monk";

import { mongodb } from "./client.__secret";

export default function handleLike(req, res) {
	const { accessToken, winID, liking } = req.body;
	console.log(`${accessToken} is ${liking ? "liking" : "unliking"} ${winID}...`);

	const db = monk(`mongodb://${mongodb.dbuser}:${mongodb.dbpassword}@ds055855.mlab.com:55855/winterest`);
	const users = db.get("users", {castIds: false});
	const wins = db.get("wins", {castIds: false});

	// find the user
	users.findOne({
		accessToken: accessToken

	}).then((user) => liking ? 
		like(wins, winID, user) : unlike(wins, winID, user)

	).then((doc) => {
		// everything went perfectly
		console.log("succeed");
		res.status(200).send();

	}).catch((err) => {
		console.log("failed", err);
		res.status(500).send();
	});
}

function like(wins, winID, user) {
	return wins.findOneAndUpdate({
		_id: monk.id(winID)
	}, {
		$$addToSet: {		// make sure that there's no duplicate
			likers: {
				_id: user._id
			}
		}

	});
}

function unlike(wins, winID, user) {
	return wins.findOneAndUpdate({
		_id: monk.id(winID)
	}, {
		$pull: {
			likers: {
				_id: user._id
			}
		}

	});
}