"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = searchAPI;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function searchAPI(accessToken, location, term) {
	console.log("Searching " + location + " for " + term + ", bearing " + accessToken);

	return (0, _axios2.default)({
		method: "get",
		url: "https://api.yelp.com/v3/businesses/search?term=" + term + "&location=" + location,
		headers: {
			Authorization: "Bearer " + accessToken
		}
	});
}