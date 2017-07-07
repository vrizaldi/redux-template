"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var error = function error(store) {
	return function (next) {
		return function (action) {
			try {
				next(action);
			} catch (e) {
				console.log("Error:", e);
			}
		};
	};
};

exports.default = error;