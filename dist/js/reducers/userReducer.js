"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reducer;
var initialStates = {
	loggedIn: false,
	status: "idle",
	userData: {
		id: 0,
		username: "",
		imageurl: ""
	}
};

function reducer() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialStates;
	var action = arguments[1];

	switch (action.type) {
		case "FETCH_USER_PENDING":
			return _extends({}, state, {
				status: "fetching"
			});

		case "FETCH_USER_FULFILLED":
			console.log("payload", action.payload);
			return _extends({}, state, {
				status: "succeed",
				loggedIn: true,
				userData: _extends({}, state.userData, {
					id: action.payload.data.id,
					username: action.payload.data.username,
					imageurl: action.payload.data.imageurl
				})
			});

		case "FETCH_USER_REJECTED":
			console.log("error", action.payload);
			return _extends({}, state, {
				status: "failed"
			});

		default:
			return state;
	}
}