"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = scanLocation;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _fileSystem = require("file-system");

var _fileSystem2 = _interopRequireDefault(_fileSystem);

var _YelpTokenManager = require("./YelpTokenManager");

var _YelpTokenManager2 = _interopRequireDefault(_YelpTokenManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scanLocation(req, res) {
	var _req$query = req.query,
	    term = _req$query.term,
	    location = _req$query.location;

	console.log("Scanning " + location + " for " + term);

	(0, _axios2.default)({
		method: "get",
		url: "https://api.yelp.com/v3/businesses/search?term=" + term + "&location=" + location,
		headers: {
			Authorization: "Bearer " + _YelpTokenManager2.default.getToken()
		}
	}).then(function (result) {
		res.json(result.data.businesses);
		console.log("Scanned successfully");
	}).catch(function (err) {
		console.log("err", err);
		console.log("Failed while scanning");
	});
}