"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = parseWins;

var _monk = require("monk");

var _monk2 = _interopRequireDefault(_monk);

var _client = require("./client.__secret");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseWins(req, res) {
	console.log("req body", req.body);
	var wins = req.body;

	// parse win into query for the database
	var winQuery = wins.map(function (win) {
		return { _id: _monk2.default.id(win._id) };
	});
	winQuery = winQuery.length == 0 ? [{ null: "null" }] : winQuery;
	console.log("winQuery", winQuery);

	// search for the wins
	var db = (0, _monk2.default)("mongodb://" + _client.mongodb.dbuser + ":" + _client.mongodb.dbpassword + "@ds055855.mlab.com:55855/winterest");
	var winsCollection = db.get("wins");
	var users = db.get("users", { castIds: false });
	winsCollection.find({ $or: winQuery }).then(function (docs) {
		console.log("docs", docs);

		// get the username from the id
		var userQuery = docs.map(function (win) {
			return win.by_id;
		});
		console.log("userQuery", userQuery);
		users.find({
			_id: {
				$in: userQuery
			}
		}).then(function (users) {
			console.log("users", users);

			// append the usernames to the list
			var result = docs.map(function (doc) {
				// get the index of the user 
				// (because one user may have multiple posts)
				var i = users.findIndex(function (user) {
					return user._id == doc.by_id;
				});
				doc.by = users[i].username;
				return doc;
			});
			console.log("result", result);
			res.json(result);
		});
	}).catch(function (err) {
		console.log("err", err);
	});
}