"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _nodeTwitterApi = require("node-twitter-api");

var _nodeTwitterApi2 = _interopRequireDefault(_nodeTwitterApi);

var _mongodb = require("mongodb");

var _mongodb2 = _interopRequireDefault(_mongodb);

var _TwitterAuth = require("./TwitterAuth");

var _TwitterAuth2 = _interopRequireDefault(_TwitterAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TwitterTokenManager = function () {
	function TwitterTokenManager() {
		_classCallCheck(this, TwitterTokenManager);

		this.initialised = false;

		this.__twitter = null;
		this.__requestSecrets = {};
		// store the request secrets with request token as key
	}

	_createClass(TwitterTokenManager, [{
		key: "init",
		value: function init() {
			if (this.initialised) return;
			this.initialised = true;

			console.log("twitter client_id:", _TwitterAuth2.default.client_id);
			console.log("twitter client_secret:", _TwitterAuth2.default.client_secret);

			this.__twitter = new _nodeTwitterApi2.default({
				consumerKey: _TwitterAuth2.default.client_id,
				consumerSecret: _TwitterAuth2.default.client_secret,
				callback: "http://127.0.0.1:21701/login"
			});
		}
	}, {
		key: "getRequestToken",
		value: function getRequestToken(req, res) {
			var _this = this;

			this.__twitter.getRequestToken(function (err, requestToken, requestSecret) {
				if (err) {
					console.log("Failed", err);
					res.status(500).send(err);
				} else {
					_this.__requestSecrets[requestToken] = requestSecret;
					console.log("request_token:", requestToken);
					console.log("request_secret:", requestSecret);
					res.redirect("https://api.twitter.com/oauth/authorize?oauth_token=" + requestToken);
				}
			});
		}
	}, {
		key: "getAccessToken",
		value: function getAccessToken(req, res) {
			var _this2 = this;

			var _req$query = req.query,
			    oauth_token = _req$query.oauth_token,
			    oauth_verifier = _req$query.oauth_verifier;

			console.log("request token:", oauth_token);
			console.log("request verifier:", oauth_verifier);
			if (!this.__requestSecrets.hasOwnProperty(oauth_token)) {
				// request token is invalid
				res.status(401).send("Invalid oauth_token");
			}

			// retrieve the access token and secret
			var oauth_secret = this.__requestSecrets[oauth_token];
			this.__twitter.getAccessToken(oauth_token, oauth_secret, oauth_verifier, function (err, accessToken, accessSecret) {
				if (err) {
					console.log("err", err);
					res.status(err.statusCode).send(err);
				} else {
					console.log("accessToken:", accessToken);
					console.log("accessSecret:", accessSecret);

					// verify the user and return the user creds
					_this2.__twitter.verifyCredentials(accessToken, accessSecret, function (err, user) {
						if (err) {
							throw err;
						} else {
							console.log(user);

							// register user if not registered in database
							_mongodb2.default.connect("mongodb://admin:a$ianDad@ds151222.mlab.com:51222/nightnight", function (err, db) {
								_this2.registerUser(err, db, user);
							});

							res.json({
								id: user.id,
								username: user.screen_name,
								imageurl: user.profile_image_url_https
							});
						}
					});
				}
			});
		}
	}, {
		key: "registerUser",
		value: function registerUser(err, db, user) {
			// check if user exists
			db.collection("users").find({
				id: user.id
			}).toArray(function (err, docs) {
				if (err) {
					throw err;
				} else {
					if (docs.length == 0) {
						// user not found
						// register the new user
						console.log("Registering new user " + user.id);
						db.collection("users").save({
							id: user.id,
							goingTo: []
						});
					}
				}
			});
		}
	}]);

	return TwitterTokenManager;
}();

exports.default = new TwitterTokenManager();