"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.fetchUserTwitter = fetchUserTwitter;
exports.fetchUserFacebook = fetchUserFacebook;
exports.fetchUserGoogle = fetchUserGoogle;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchUserTwitter(requestToken, requestVerifier) {
	return {
		type: "FETCH_USER",
		payload: (0, _axios2.default)({
			method: "post",
			url: "/verify_oauth_twitter",
			data: {
				requestToken: requestToken,
				requestVerifier: requestVerifier
			},
			headers: {
				"content-type": "application/json"
			}
		})
	};
}

function fetchUserFacebook(query) {
	return {
		type: "FETCH_USER",
		payload: _axios2.default.get("/verify_oauth_facebook" + query)
	};
}

function fetchUserGoogle(query) {
	return {
		type: "FETCH_USER",
		payload: _axios2.default.get("/verify_oauth_google" + query)
	};
}