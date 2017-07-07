"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.fetchUserData = fetchUserData;
exports.goingTo = goingTo;
exports.cancelTo = cancelTo;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchUserData(oauth_token, oauth_verifier) {
	return {
		type: "FETCH_USER",
		payload: _axios2.default.get("/get_user?oauth_token=" + oauth_token + "&oauth_verifier=" + oauth_verifier)
	};
}

function goingTo(id, locationID) {
	return {
		type: "GOING",
		payload: (0, _axios2.default)({
			method: "post",
			url: "/go_to",
			data: {
				id: id,
				locationID: locationID
			},
			headers: {
				"content-type": "application/json"
			}
		})
	};
}

function cancelTo(id, locationID) {
	return {
		type: "CANCEL",
		payload: (0, _axios2.default)({
			method: "post",
			url: "/cancel_to",
			data: {
				id: id,
				locationID: locationID
			},
			headers: {
				"content-type": "application/json"
			}
		})
	};
}