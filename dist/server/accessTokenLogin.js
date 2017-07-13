"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = accessTokenLogin;

var _monk = require("monk");

var _monk2 = _interopRequireDefault(_monk);

var _client = require("./client.__secret");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function accessTokenLogin(req, res) {
	var accessToken = req.body.accessToken;

	console.log("accessToken", accessToken);

	var db = (0, _monk2.default)("mongodb://" + _client.mongodb.dbuser + ":" + _client.mongodb.dbpassword + "@ds055855.mlab.com:55855/winterest");
	var users = db.get("users", { castIds: false });

	users.findOne({
		accessToken: accessToken
	}).then(function (user) {
		if (user) {
			// user found
			// everything went perfectly
			res.json({
				_id: user._id,
				accessToken: accessToken
			});
		} else {
			// user not found
			res.status(401).send("Unauthorized access. Invalid access token detected");
		}
	});
}