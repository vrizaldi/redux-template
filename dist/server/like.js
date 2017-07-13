"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = like;
function like(req, res) {
	var _req$body = req.body,
	    accessToken = _req$body.accessToken,
	    winID = _req$body.winID,
	    liking = _req$body.liking;

	console.log(accessToken + " is " + (liking ? "liking" : "unliking") + " " + winID + "...");
}