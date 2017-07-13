"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = getRecentFunction;

var _monk = require("monk");

var _monk2 = _interopRequireDefault(_monk);

var _client = require("./client.__secret");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRecentFunction(req, res) {
	var db = (0, _monk2.default)("mongodb://" + _client.mongodb.dbuser + ":" + _client.mongodb.dbpassword + "@ds055855.mlab.com:55855/winterest");
	var wins = db.get("wins");
	wins.find({}, {
		// sort recent to oldest
		sort: {
			_id: -1
		},
		// get the first 20
		limit: 20
	}).then(function (docs) {
		console.log("docs", docs);
		res.json(docs);
	}).catch(function (err) {
		res.status(500).send();
	});
}