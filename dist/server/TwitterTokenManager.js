"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeTwitterApi = require("node-twitter-api");

var _nodeTwitterApi2 = _interopRequireDefault(_nodeTwitterApi);

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
		this.__twitterOauth = null;
		this.__requestStore = null;
	}

	_createClass(TwitterTokenManager, [{
		key: "init",
		value: function init() {
			// only called once
			if (this.__initiated) return;
			this.__initiated = true;

			console.log("Initialising twitter...");
			console.log("client_id:", _client.twitter.client_id);
			console.log("client_secret", _client.twitter.client_secret);
			this.__twitterOauth = (0, _nodeTwitterApi2.default)({
				consumerKey: _client.twitter.client_id,
				consumerSecret: _client.twitter.client_secret,
				callback: "http://127.0.0.1:21701/logging_in/twitter"
			});
			this.__requestStore = {};
		}
	}, {
		key: "getRequestToken",
		value: function getRequestToken(req, res) {
			var _this = this;

			console.log("User is logging in through twitter...");
			this.__twitterOauth.getRequestToken(function (err, requestToken, requestSecret) {
				if (err) {
					res.status(500).send();
				} else {
					// store request token and secret
					_this.__requestStore[requestToken] = requestSecret;

					// redirect user to twitter login screen
					res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
				}
			});
		}
	}, {
		key: "verifyOauth",
		value: function verifyOauth(req, res) {
			var _this2 = this;

			var _req$body = req.body,
			    requestToken = _req$body.requestToken,
			    requestVerifier = _req$body.requestVerifier;

			console.log("requestToken", requestToken);
			console.log("requestVerifier", requestVerifier);

			// see if request token is valid
			if (this.__requestStore.hasOwnProperty(requestToken)) {
				// request token valid
				// use the requests token, verifier and secret to get access token
				var requestSecret = this.__requestStore[requestToken];
				this.__twitterOauth.getAccessToken(requestToken, requestSecret, requestVerifier, function (err, accessToken, accessSecret) {
					if (err) {
						res.status(err.statusCode).send();
					}

					console.log("accessToken", accessToken);
					console.log("accessSecret", accessSecret);
					// get user data
					_this2.__twitterOauth.verifyCredentials(accessToken, accessSecret, function (err, userTwitter) {
						if (err) {
							res.status(500).send();
						} else {
							// user data retrieved
							console.log("userID", userTwitter.id);

							// find the user in the database
							var db = (0, _monk2.default)("mongodb://" + _client.mongodb.dbuser + ":" + _client.mongodb.dbpassword + "@ds055855.mlab.com:55855/winterest");

							var users = db.get("users");
							users.findOne({
								_id: _monk2.default.id(userTwitter.id)
							}).then(function (userData) {
								if (userData) {
									// user found
									// return the user data
									_this2.__returnUserData(res, userData, userTwitter);
								} else {
									// new user, register them
									users.insert({
										_id: _monk2.default.id(userTwitter.id),
										wins: [],
										accessToken: _jsonwebtoken2.default.sign({ _id: userTwitter.id }, _cert2.default)
									}).then(function (userData) {
										// new user created
										_this2.__returnUserData(res, userData, userTwitter);
									}).catch(function (err) {
										res.status(500).send();
									});
								}
							}).catch(function (err) {
								console.log("err", err);
							});
						}
					});
				});
			} else {
				console.log("Invalid request token detected");
				res.status(401).send("Invalid request token detected");
			}
		}
	}, {
		key: "__returnUserData",
		value: function __returnUserData(res, userData, userTwitter) {
			console.log("User data retrieved successfully");
			res.json({
				username: "@" + userTwitter.screen_name,
				imageurl: userTwitter.profile_image_url_https,
				wins: userData.wins,
				accessToken: userData.accessToken
			});
		}
	}]);

	return TwitterTokenManager;
}();

exports.default = new TwitterTokenManager();