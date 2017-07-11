"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _passportFacebook = require("passport-facebook");

var _passportFacebook2 = _interopRequireDefault(_passportFacebook);

var _monk = require("monk");

var _monk2 = _interopRequireDefault(_monk);

var _client = require("./client.__secret");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FacebookTokenManager = function () {
	function FacebookTokenManager() {
		_classCallCheck(this, FacebookTokenManager);

		this.__initiated = false;
	}

	_createClass(FacebookTokenManager, [{
		key: "init",
		value: function init() {
			var client_id = _client.facebook.client_id,
			    client_secret = _client.facebook.client_secret;
			var dbuser = _client.mongodb.dbuser,
			    dbpassword = _client.mongodb.dbpassword;


			console.log("facebook client_id", client_id);
			console.log("facebook client_secret", client_secret);
			_passport2.default.use(new _passportFacebook2.default({
				clientID: client_id,
				clientSecret: client_secret,
				callbackURL: "http://localhost:21701/logging_in/facebook",
				profileFields: ["id", "displayName", "photos"]

			}, function (accessToken, refreshToken, profile, cb) {
				var db = (0, _monk2.default)("mongodb://" + _client.mongodb.dbuser + ":" + _client.mongodb.dbpassword + "@ds055855.mlab.com:55855/winterest");
				var users = db.get("users");

				console.log("profile", profile);
				// see if user registered
				// if they aren't, register them
				users.findOneAndUpdate({
					_id: _monk2.default.id(parseInt(profile.id))
				}, {
					$setOnInsert: {
						// default values on creation
						wins: []
					}
				}, { upsert: true }).then(function (userData) {
					// pass it on to callback
					cb({
						username: profile.displayName,
						imageurl: profile.photos[0].value,
						wins: userData.wins
					});
					db.close();
				});
			}));
		}
	}, {
		key: "getRequestToken",
		value: function getRequestToken(req, res) {
			console.log("authenticating through facebook...");
			_passport2.default.authenticate("facebook")(req, res);
		}
	}, {
		key: "verifyOauth",
		value: function verifyOauth(req, res) {
			//		console.log("req", req);
			_passport2.default.authenticate("facebook", { failureRedirect: "/login" }, function (userData) {
				// successful authentication
				console.log("userData", userData);
				res.json(userData);
			})(req, res);
		}
	}]);

	return FacebookTokenManager;
}();

exports.default = new FacebookTokenManager();