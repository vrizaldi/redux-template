import axios from "axios";
import mongo from "mongodb";

import yelpTokenManager from "./YelpTokenManager";

export default function scanLocation(req, res) {
	var { term, location } = req.query;
	console.log("query", req.query);
	console.log(`Scanning ${location} for ${term}`);

	axios({
		method: "get",
		url: `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}`,
		headers: {
			Authorization: `Bearer ${yelpTokenManager.getToken()}`
		}
	}).then(function(result) {
		var { businesses } = result.data;
		console.log("Scanned successfully");

		if(req.query.id) {
			// authorised by a user.
			
			mongo.connect("mongodb://admin:a$ianDad@ds151222.mlab.com:51222/nightnight",
				(err, db) => {
					if(err) return console.log(err);

					db.collection("users").find({
						id: parseInt(req.query.id)
					}).toArray((err, docs) => {
						if(err) return console.log(err);

						if(docs.length == 1) {
							// see if user has previously planned to go
							// to any of the venues listed
							console.log(`user ${req.query.id} found`);
							var user = docs[0];
							for(var i = 0; i < user.goingTo.length; i++) {
								for(var j = 0; j < businesses.length; j++) {
									if(user.goingTo[i] == businesses[j].phone) {
										// user is going here
										businesses[j].going = true;
										console.log(`${user.id} is going to ${businesses[j].name}`); 
									}
								}
							}
							res.json(businesses);

						} else {
							console.log(`user ${req.query.id} not found`);
							res.json(businesses);
							db.close();
						}
					});
				});
		} else {
			res.json(businesses);
		}
		
	}).catch(function(err) {
		console.log("err", err);
		console.log("Failed while scanning");
	});
}

