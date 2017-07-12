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
	winsCollection.find({ $or: winQuery }).then(function (docs) {
		console.log("docs", docs);
		res.json(docs);
	}).catch(function (err) {
		console.log("err", err);
	});
}