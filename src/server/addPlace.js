import mongo from "mongodb";

export default function addPlace(req, res) {
	var { id, locationID } = req.body;
		// use phone number as location id
	console.log(`User ${id} is going to the venue ${locationID}`);
	mongo.connect("mongodb://admin:a$ianDad@ds151222.mlab.com:51222/nightnight", (err, db) => {
		if(err) {
			return console.log(err);
		}

		// search the user
		db.collection("users").findOneAndUpdate({
			id: id
		}, {
			// add the location to the list
			$push: {
				goingTo: locationID
			}
		});
	});
}