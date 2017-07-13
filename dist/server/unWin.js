"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = unWin;

var _monk = require("monk");

var _monk2 = _interopRequireDefault(_monk);

var _client = require("./client.__secret");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function unWin(req, res) {
	var _req$body = req.body,
	    accessToken = _req$body.accessToken,
	    winID = _req$body.winID;

	console.log("accessToken", accessToken);
	console.log("winID", winID);

	var db = (0, _monk2.default)("mongodb://" + _client.mongodb.dbuser + ":" + _client.mongodb.dbpassword + "@ds055855.mlab.com:55855/winterest");
	var users = db.get("users", { castIds: false });
	var wins = db.get("wins");

	users.findOneAndUpdate({
		accessToken: accessToken
	}, {
		$pull: {
			wins: {
				_id: _monk2.default.id(winID)
			}
		}
	}).then(function (user) {
		console.log("user before", user);
		if (user) {
			// user found and updated
			// remove the win
			return wins.remove({
				_id: _monk2.default.id(winID)
			});
		}
	}).then(function () {
		return users.findOne({
			accessToken: accessToken
		});
	}).then(function (user) {
		if (user) {
			// everything went perfectly
			console.log("user after", user);
			res.json({ todo: "remove", winID: winID }); // return the removed win's ID
		}
		db.close();
	}).catch(function (err) {
		res.status(500).send();
		db.close();
	});
}