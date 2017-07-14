"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _passportTwitter = require("passport-twitter");

var _passportTwitter2 = _interopRequireDefault(_passportTwitter);

var _monk = require("monk");

var _monk2 = _interopRequireDefault(_monk);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _client = require("./client.__secret");

var _cert = require("./cert.__secret");

var _cert2 = _interopRequireDefault(_cert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TwitterTokenManager = function () {
	function TwitterTokenManager() {
		_classCallCheck(this, TwitterTokenManager);

		this.__initiated = false;
	}

	_createClass(TwitterTokenManager, [{
		key: "init",
		value: function init() {
			// only called once
			if (this.__initiated) return;
			this.__initiated = true;

			var client_id = _client.twitter.client_id,
			    client_secret = _client.twitter.client_secret;
			var dbuser = _client.mongodb.dbuser,
			    dbpassword = _client.mongodb.dbpassword;


			_passport2.default.use(new _passportTwitter2.default({
				consumerKey: client_id,
				consumerSecret: client_secret,
				callback: "https://voyage-baguette-78534.herokuapp.com/logging_in/twitter"
			}, function (token, tokenSecret, profile, cb) {
				//			console.log("profile", profile);
				// find and update the user
				// insert new user if not registered
				var db = (0, _monk2.default)("mongodb://" + _client.mongodb.dbuser + ":" + _client.mongodb.dbpassword + "@ds055855.mlab.com:55855/winterest");
				var users = db.get("users", { castIds: false });
				users.findOneAndUpdate({
					_id: profile.id + "twitter"
				}, {
					// update the username and profile photo
					$set: {
						username: "@" + profile.username,
						imageurl: profile.photos[0].value
					},
					$setOnInsert: {
						wins: [],
						accessToken: _jsonwebtoken2.default.sign({ _id: profile.id + "twitter" }, _cert2.default)
					}
				}, { upsert: true }).then(function (userData) {
					// everything went perfectly
					db.close();
					return cb(null, {
						_id: userData._id,
						accessToken: userData.accessToken
					});
				}).catch(function (err) {
					console.log("Caught some error");
				});
			}));
		}
	}, {
		key: "verifyOauth",
		value: function verifyOauth(req, res) {
			res.json({
				_id: req.user._id,
				accessToken: req.user.accessToken
			});
		}
	}]);

	return TwitterTokenManager;
}();

exports.default = new TwitterTokenManager();