"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.loadProfile = loadProfile;
exports.reset = reset;
exports.personalize = personalize;
exports.fetchRecent = fetchRecent;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadProfile(_id) {
	return function (dispatch) {
		dispatch({
			type: "FETCH_PROFILE_PENDING"
		});

		_axios2.default.get("/get_profile?_id=" + _id).then(function (profileRes) {
			console.log("res", profileRes);
			parseWins(dispatch, profileRes.data.wins).then(function (winsRes) {
				dispatch({
					type: "FETCH_PROFILE_FULFILLED",
					payload: _extends({}, profileRes, {
						data: _extends({}, profileRes.data, {
							wins: winsRes.data
						})
					})
				});
			}).catch(function (err) {
				dispatch({
					type: "FETCH_PROFILE_REJECTED",
					payload: err
				});
			});
		}).catch(function (err) {
			dispatch({
				type: "FETCH_PROFILE_REJECTED",
				payload: err
			});
		});
	};
}

function parseWins(dispatch, wins) {
	return (0, _axios2.default)({
		method: "post",
		url: "/parse_wins",
		data: wins,
		headers: {
			"content-type": "application/json"
		}
	});
}

function reset() {
	return {
		type: "RESET"
	};
}

function personalize() {
	return {
		type: "PERSONALIZE"
	};
}

function fetchRecent() {
	return function (dispatch) {
		dispatch({
			type: "FETCH_RECENT_PENDING"
		});

		_axios2.default.get("/get_recent").then(function (res) {
			parseWins(dispatch, res.data).then(function (parsedWins) {
				dispatch({
					type: "FETCH_RECENT_FULFILLED",
					payload: parsedWins
				});
			}).catch(function (err) {
				dispatch({
					type: "FETCH_RECENT_REJECTED",
					payload: err
				});
			});
		});
	};
}