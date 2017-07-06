"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;
var initialStates = {
	status: "idle",
	list: []
};

function reducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialStates;
	var action = arguments[1];

	switch (action.type) {
		case "FETCH_LIST_PENDING":
			return _extends({}, state, {
				status: "fetching"
			});

		case "FETCH_LIST_FULFILLED":
			console.log(action.payload);
			return _extends({}, state, {
				status: "succeed",
				list: action.payload.data.list
			});

		case "FETCH_LIST_REJECTED":
			return _extends({}, state, {
				status: "failed"
			});
	}
}