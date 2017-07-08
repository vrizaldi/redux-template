"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var log = function log(store) {
	return function (next) {
		return function (action) {
			console.log("Action fired:", action);
			next(action);
		};
	};
};

exports.default = log;