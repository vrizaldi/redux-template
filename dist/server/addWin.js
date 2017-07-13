"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = addWin;

var _monk = require("monk");

var _monk2 = _interopRequireDefault(_monk);

var _client = require("./client.__secret");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addWin(req, res) {
	console.log("req.body", req.body);
	var _req$body = req.body,
	    accessToken = _req$body.accessToken,
	    newWin = _req$body.newWin;

	console.log(accessToken + " is adding " + newWin + "...");

	// connect to db
	var db = (0, _monk2.default)("mongodb://" + _client.mongodb.dbuser + ":" + _client.mongodb.dbpassword + "@ds055855.mlab.com:55855/winterest");
	var users = db.get("users", { castIds: false });
	var wins = db.get("wins");

	// check if user actually exist
	users.findOne({
		accessToken: accessToken

	}).then(function (user) {
		if (user) {
			// user found
			// insert the new win, with some new properties(timestamped, etc.)
			newWin.timestamp = new Date();
			newWin.by_id = user._id;
			newWin.likers = [];

			console.log("newWin", newWin);
			wins.insert(newWin).then(function (newWin) {
				// update the user's wins
				users.findOneAndUpdate({
					_id: user._id
				}, {
					$push: {
						wins: {
							_id: _monk2.default.id(newWin._id)
						}
					}
				}, { returnOriginal: false }).then(function (userChange) {
					console.log("newWin._id", newWin._id);

					// everything went perfectly
					console.log("userChange", userChange);

					// return the new win
					res.json({ todo: "add", newWin: [newWin] });
					db.close();
				}).catch(function (err) {
					console.log("err", err);
					res.status(500).send();
					db.close();
				});
			});
		} else {
			// user doesn't exist
			res.status(401).send("User is unauthorized");
			db.close();
		}
	}).catch(function (err) {
		console.log("err", err);
		db.close();
	});
}