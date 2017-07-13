"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = getProfile;

var _monk = require("monk");

var _monk2 = _interopRequireDefault(_monk);

var _client = require("./client.__secret");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getProfile(req, res) {
	var _id = req.query._id;


	console.log("req.query", req.query);
	console.log("Getting profile for " + _id + "...");

	var db = (0, _monk2.default)("mongodb://" + _client.mongodb.dbuser + ":" + _client.mongodb.dbpassword + "@ds055855.mlab.com:55855/winterest");
	var users = db.get("users", { castIds: false });
	users.findOne({
		_id: _id
	}).then(function (user) {
		console.log("user", user);
		if (user) {
			// user found
			res.json({
				username: user.username,
				imageurl: user.imageurl,
				wins: user.wins
			});
		}
	}).catch(function (err) {
		res.status(500).send();
	});
}