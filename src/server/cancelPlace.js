import mongo from "mongodb";

export default function cancelPlace(req, res) {
	var { id, locationID } = req.body;
	console.log(`User ${id} cancelled his arrangement to ${locationID}`);

	mongo.connect("mongodb://admin:a$ianDad@ds151222.mlab.com:51222/nightnight", 
		(err, db) => {
			if(err) {
				res.status(err.statusCode).send(err);

			} else {
				db.collection("users").findOneAndUpdate({
					id: id
				}, {
					$pull: {
						goingTo: locationID
					}
				});
			}
		});
}