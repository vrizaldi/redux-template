"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = reduce;
var initialStates = {
	status: "idle",
	personal: false,
	profileData: {
		username: "",
		imageurl: "",
		wins: []
	}
};

function reduce() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialStates;
	var action = arguments[1];

	switch (action.type) {

		case "FETCH_PROFILE_PENDING":
			return _extends({}, state, {
				status: "fetching"
			});

		case "FETCH_PROFILE_FULFILLED":
			console.log("wins", action.payload.data);
			return _extends({}, state, {
				status: "succeed",
				profileData: _extends({}, state.userData, {
					username: action.payload.data.username,
					wins: action.payload.data.wins,
					imageurl: action.payload.data.imageurl
				})
			});

		case "FETCH_PROFILE_REJECTED":
			alert(action.payload.response.data ? action.payload.response.data : action.payload);
			return _extends({}, state, {
				status: "failed"
			});

		case "RESET":
			return initialStates;

		case "PERSONALIZE":
			return _extends({}, state, {
				personal: true
			});

		case "UPDATE_WINS_PENDING":
			if (state.personal) {
				return _extends({}, state, {
					status: "fetching"
				});
			} else {
				return state;
			}

		case "UPDATE_WINS_FULFILLED":
			// update the profile only if the currently viewed profile
			// is the user's (personal)
			console.log("action.payload", action.payload);

			if (state.personal) {
				var wins = state.profileData.wins.splice(0); // clone it
				if (action.payload.data.todo == "add") {
					// add the new win
					console.log("action.payload.data", action.payload.data);
					wins.push(action.payload.data[0]);
					console.log("wins", wins);
					return _extends({}, state, {
						status: "succeed",
						profileData: _extends({}, state.profileData, {
							wins: wins
						})
					});
				} else {
					// remove it
					console.log("wins before before", wins);
					var index = wins.findIndex(function (win) {
						// find the index of the win
						return win._id == action.payload.data.winID;
					});
					console.log("index", index);
					console.log("wins before", wins);
					wins.splice(index, 1);
					console.log("wins after", wins);
					return _extends({}, state, {
						status: "succeed",
						profileData: _extends({}, state.profileData, {
							wins: wins
						})
					});
				}
			} else {
				return state;
			}

		case "UPDATE_WINS_REJECTED":
			if (state.personal) alert("Error occurred while trying to reload the wins.");
			return state;

		default:
			return state;
	}
}