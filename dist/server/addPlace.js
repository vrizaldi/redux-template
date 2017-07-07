"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = addPlace;

var _mongodb = require("mongodb");

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addPlace(req, res) {
	var _req$body = req.body,
	    id = _req$body.id,
	    locationID = _req$body.locationID;
	// use phone number as location id

	console.log("User " + id + " is going to the venue " + locationID);
	_mongodb2.default.connect("mongodb://admin:a$ianDad@ds151222.mlab.com:51222/nightnight", function (err, db) {
		if (err) {
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