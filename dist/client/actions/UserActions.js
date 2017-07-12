"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.fetchUserTwitter = fetchUserTwitter;
exports.fetchUserFacebook = fetchUserFacebook;
exports.fetchUserGoogle = fetchUserGoogle;
exports.addWin = addWin;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchUserTwitter(requestToken, requestVerifier) {
	return function (dispatch) {
		dispatch({
			type: "FETCH_USER_PENDING"
		});

		(0, _axios2.default)({
			method: "post",
			url: "/verify_oauth_twitter",
			data: {
				requestToken: requestToken,
				requestVerifier: requestVerifier
			},
			headers: {
				"content-type": "application/json"
			}
		}).then(function (res) {
			dispatch({
				type: "FETCH_USER_FULFILLED",
				payload: res
			});

			// parse the wins
			parseWins(dispatch, res.data.wins);
		}).catch(function (err) {
			dispatch({
				type: "FETCH_USER_REJECTED",
				payload: err
			});
		});
	};
}

function fetchUserFacebook(query) {
	return function (dispatch) {
		dispatch({
			type: "FETCH_USER_PENDING"
		});

		_axios2.default.get("/verify_oauth_facebook" + query).then(function (res) {
			dispatch({
				type: "FETCH_USER_FULFILLED",
				payload: res
			});
			// parse the wins
			parseWins(dispatch, res.data.wins);
		}).catch(function (err) {
			dispatch({
				type: "FETCH_USER_REJECTED",
				payload: err
			});
		});
	};
}

function fetchUserGoogle(query) {
	return function (dispatch) {
		dispatch({
			type: "FETCH_USER_PENDING"
		});

		_axios2.default.get("/verify_oauth_google" + query).then(function (res) {
			dispatch({
				type: "FETCH_USER_FULFILLED",
				payload: res
			});
			// parse the wins
			parseWins(dispatch, res.data.wins);
		}).catch(function (err) {
			dispatch({
				type: "FETCH_USER_REJECTED",
				payload: err
			});
		});
	};
}

function parseWins(dispatch, wins) {
	(0, _axios2.default)({
		method: "post",
		url: "/parse_wins",
		data: wins,
		headers: {
			"content-type": "application/json"
		}
	}).then(function (res) {
		dispatch({
			type: "FETCH_WINS_FULFILLED",
			payload: res
		});
	}).catch(function (err) {
		dispatch({
			type: "FETCH_WINS_REJECTED",
			payload: err
		});
	});
}

function addWin(accessToken, newWin) {
	return function (dispatch) {
		dispatch({
			type: "FETCH_WINS_PENDING"
		});

		(0, _axios2.default)({
			method: "post",
			url: "/add_win",
			data: {
				accessToken: accessToken,
				newWin: newWin
			},
			headers: {
				"content-type": "application/json"
			}
		}).then(function (res) {
			// parse the wins
			parseWins(dispatch, res.data);
		});
	};
}