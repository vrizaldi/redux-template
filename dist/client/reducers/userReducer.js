"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reduce;
var initialStates = {
	status: "idle",
	loggedIn: false,
	userData: {
		username: "",
		imageurl: "",
		accessToken: "",
		wins: []
	}
};

function reduce() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialStates;
	var action = arguments[1];

	console.log("reducing", state);
	switch (action.type) {
		case "LOGIN_PENDING":
			return _extends({}, state, {
				status: "fetching"
			});

		case "LOGIN_FULFILLED":
			return _extends({}, state, {
				status: "succeed",
				userData: action.payload.data
			});

		case "LOGIN_REJECTED":
			alert(action.payload.response.data ? action.payload.response.data : action.payload);
			return _extends({}, state, {
				status: "failed"
			});

		case "FETCH_USER_PENDING":
			return _extends({}, state, {
				status: "fetching"
			});

		case "FETCH_USER_FULFILLED":
			var _action$payload$data = action.payload.data,
			    username = _action$payload$data.username,
			    imageurl = _action$payload$data.imageurl,
			    accessToken = _action$payload$data.accessToken;

			return _extends({}, state, {
				status: "succeed",
				loggedIn: true,
				userData: _extends({}, state.userData, {
					username: username,
					imageurl: imageurl,
					accessToken: accessToken
				})
			});

		case "FETCH_USER_REJECTED":
			alert(action.payload.response.data ? action.payload.response.data : action.payload);
			return _extends({}, state, {
				status: "failed"
			});

		case "FETCH_WINS_PENDING":
			return _extends({}, state, {
				status: "fetching"
			});

		case "FETCH_WINS_FULFILLED":
			console.log("wins", action.payload.data);
			return _extends({}, state, {
				status: "succeed",
				userData: _extends({}, state.userData, {
					wins: action.payload.data
				})
			});

		case "FETCH_WINS_REJECTED":
			alert(action.payload.response.data ? action.payload.response.data : action.payload);
			return _extends({}, state, {
				status: "failed"
			});

		default:
			return state;
	}
}