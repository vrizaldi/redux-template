"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reduce;
var initialStates = {
	status: "idle",
	wins: []
};

function reduce() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialStates;
	var action = arguments[1];

	switch (action.type) {
		case "FETCH_RECENT_PENDING":
			return _extends({}, state, {
				status: "fetching"
			});

		case "FETCH_RECENT_FULFILLED":
			return _extends({}, state, {
				status: "succeed",
				wins: action.data
			});

		case "FETCH_RECENT_REJECTED":
			alert(action.payload.response.data ? action.payload.response.data : action.payload);
			return _extends({}, state, {
				status: "failed"
			});

		default:
			return state;
	}
}