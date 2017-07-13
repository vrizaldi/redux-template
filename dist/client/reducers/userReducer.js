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
		_id: null,
		accessToken: ""
	}
};

function reduce() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialStates;
	var action = arguments[1];

	console.log("reducing", state);
	switch (action.type) {

		case "FETCH_USER_PENDING":
			return _extends({}, state, {
				status: "fetching"
			});

		case "FETCH_USER_FULFILLED":
			var _action$payload$data = action.payload.data,
			    _id = _action$payload$data._id,
			    accessToken = _action$payload$data.accessToken;

			// save accesstoken to localstorage

			localStorage.setItem("accessToken", accessToken);

			return _extends({}, state, {
				status: "succeed",
				loggedIn: true,
				userData: _extends({}, state.userData, {
					_id: _id,
					accessToken: accessToken
				})
			});

		case "FETCH_USER_REJECTED":
			alert(action.payload.response.data ? action.payload.response.data : action.payload);
			return _extends({}, state, {
				status: "failed"
			});

		case "LOGOUT":
			// clear access token from local storage
			localStorage.removeItem("accessToken");

			// reset state
			return initialStates;

		default:
			return state;
	}
}