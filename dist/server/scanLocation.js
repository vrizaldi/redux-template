"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = scanLocation;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _mongodb = require("mongodb");

var _mongodb2 = _interopRequireDefault(_mongodb);

var _YelpTokenManager = require("./YelpTokenManager");

var _YelpTokenManager2 = _interopRequireDefault(_YelpTokenManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scanLocation(req, res) {
	var _req$query = req.query,
	    term = _req$query.term,
	    location = _req$query.location;

	console.log("query", req.query);
	console.log("Scanning " + location + " for " + term);

	(0, _axios2.default)({
		method: "get",
		url: "https://api.yelp.com/v3/businesses/search?term=" + term + "&location=" + location,
		headers: {
			Authorization: "Bearer " + _YelpTokenManager2.default.getToken()
		}
	}).then(function (result) {
		var businesses = result.data.businesses;

		console.log("Scanned successfully");

		if (req.query.id) {
			// authorised by a user.

			_mongodb2.default.connect("mongodb://admin:a$ianDad@ds151222.mlab.com:51222/nightnight", function (err, db) {
				if (err) return console.log(err);

				db.collection("users").find({
					id: parseInt(req.query.id)
				}).toArray(function (err, docs) {
					if (err) return console.log(err);

					if (docs.length == 1) {
						// see if user has previously planned to go
						// to any of the venues listed
						console.log("user " + req.query.id + " found");
						var user = docs[0];
						for (var i = 0; i < user.goingTo.length; i++) {
							for (var j = 0; j < businesses.length; j++) {
								if (user.goingTo[i] == businesses[j].phone) {
									// user is going here
									businesses[j].going = true;
									console.log(user.id + " is going to " + businesses[j].name);
								}
							}
						}
						res.json(businesses);
					} else {
						console.log("user " + req.query.id + " not found");
						res.json(businesses);
						db.close();
					}
				});
			});
		} else {
			res.json(businesses);
		}
	}).catch(function (err) {
		console.log("err", err);
		console.log("Failed while scanning");
	});
}