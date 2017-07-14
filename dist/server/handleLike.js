"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = handleLike;

var _monk = require("monk");

var _monk2 = _interopRequireDefault(_monk);

var _client = require("./client.__secret");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleLike(req, res) {
	var _req$body = req.body,
	    accessToken = _req$body.accessToken,
	    winID = _req$body.winID,
	    liking = _req$body.liking;

	console.log(accessToken + " is " + (liking ? "liking" : "unliking") + " " + winID + "...");

	var db = (0, _monk2.default)("mongodb://" + _client.mongodb.dbuser + ":" + _client.mongodb.dbpassword + "@ds055855.mlab.com:55855/winterest");
	var users = db.get("users", { castIds: false });
	var wins = db.get("wins", { castIds: false });

	// find the user
	users.findOne({
		accessToken: accessToken

	}).then(function (user) {
		return liking ? like(wins, winID, user) : unlike(wins, winID, user);
	}).then(function (doc) {
		// everything went perfectly
		console.log("succeed");
		res.status(200).send();
	}).catch(function (err) {
		console.log("failed", err);
		res.status(500).send();
	});
}

function like(wins, winID, user) {
	return wins.findOneAndUpdate({
		_id: _monk2.default.id(winID)
	}, {
		$addToSet: { // make sure that there's no duplicate
			likers: {
				_id: user._id
			}
		}

	});
}

function unlike(wins, winID, user) {
	return wins.findOneAndUpdate({
		_id: _monk2.default.id(winID)
	}, {
		$pull: {
			likers: {
				_id: user._id
			}
		}

	});
}