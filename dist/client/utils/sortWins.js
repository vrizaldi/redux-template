"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = sortWins;
function sortWins(wins) {
	wins.sort(function (a, b) {
		return new Date(b.timestamp) - new Date(a.timestamp);
	});
}