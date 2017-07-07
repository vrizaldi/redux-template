"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = cancelPlace;

var _mongodb = require("mongodb");

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cancelPlace(req, res) {
	var _req$body = req.body,
	    id = _req$body.id,
	    locationID = _req$body.locationID;

	console.log("User " + id + " cancelled his arrangement to " + locationID);

	_mongodb2.default.connect("mongodb://admin:a$ianDad@ds151222.mlab.com:51222/nightnight", function (err, db) {
		if (err) {
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