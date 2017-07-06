"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _fileSystem = require("file-system");

var _fileSystem2 = _interopRequireDefault(_fileSystem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TokenManager = function () {
	function TokenManager() {
		_classCallCheck(this, TokenManager);

		this.__initialised = false;
		this.__accessToken = "";
	}

	_createClass(TokenManager, [{
		key: "init",
		value: function init() {
			if (this.__initialised) return;

			// to be called once by server
			this.__accessToken = "";
			this.renewToken();
			setInterval(this.renewToken.bind(this), 604800000);
			// renew token every week

			this.__initialised = true;
		}
	}, {
		key: "getToken",
		value: function getToken() {
			return this.__accessToken;
		}
	}, {
		key: "renewToken",
		value: function renewToken() {
			var _this = this;

			this.getNewToken().then(function (res) {
				_this.__accessToken = res.data.access_token;
				console.log("access_token:", _this.__accessToken);
			}).catch(function (err) {
				console.log("Failed to obtain access token:", err);
				_this.renewToken();
				// try renew token again
			});
		}
	}, {
		key: "getNewToken",
		value: function getNewToken() {

			// get the client_id and client_secret from (secret) files
			var client_id = _fileSystem2.default.readFileSync(__dirname + "/client_id.txt").toString();
			var client_secret = _fileSystem2.default.readFileSync(__dirname + "/client_secret.txt").toString();
			console.log("client id:", client_id);
			console.log("client secret", client_secret);
			console.log("Getting access token...");

			// get the access token
			return _axios2.default.post("https://api.yelp.com/oauth2/token", "grant_type=client_credentials&client_id=" + client_id + "&client_secret=" + client_secret);
		}
	}]);

	return TokenManager;
}();

exports.default = new TokenManager();