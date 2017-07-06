"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.scan = scan;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function scan(location) {
	return {
		type: "SCAN",
		payload: _axios2.default.get("/scanlocation?location=" + location + "&term=food")
	};
}