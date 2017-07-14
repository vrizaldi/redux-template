"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.fetchUserTwitter = fetchUserTwitter;
exports.fetchUserFacebook = fetchUserFacebook;
exports.fetchUserGoogle = fetchUserGoogle;
exports.initUser = initUser;
exports.addWin = addWin;
exports.unWin = unWin;
exports.like = like;
exports.logout = logout;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchUserTwitter(query) {
	return {
		type: "FETCH_USER",
		payload: _axios2.default.get("/verify_oauth_twitter" + query)
	};
}

function fetchUserFacebook(query) {
	return {
		type: "FETCH_USER",
		payload: _axios2.default.get("/verify_oauth_facebook" + query)
	};
}

function fetchUserGoogle(query) {
	return {
		type: "FETCH_USER",
		payload: _axios2.default.get("/verify_oauth_google" + query)
	};
}

function initUser() {
	var accessToken = localStorage.getItem("accessToken");
	if (accessToken) {
		// access token found
		return {
			type: "FETCH_USER",
			payload: (0, _axios2.default)({
				method: "post",
				url: "/access_token_login",
				data: {
					accessToken: accessToken
				},
				headers: {
					"content-type": "application/json"
				}
			})
		};
	} else {
		return {
			type: "NEVERMIND"
		};
	}
}

function addWin(accessToken, newWin) {
	return function (dispatch) {
		dispatch({
			type: "UPDATE_WINS_PENDING"
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
			parseWins(dispatch, res.data.newWin).then(function (parsedRes) {
				parsedRes.data.todo = res.data.todo;
				dispatch({
					type: "UPDATE_WINS_FULFILLED",
					payload: parsedRes
				});
			}).catch(function (err) {
				dispatch({
					type: "UPDATE_WINS_REJECTED",
					payload: err
				});
			});
		}).catch(function (err) {
			dispatch({
				type: "UPDATE_WINS_REJECTED",
				payload: err
			});
		});
	};
}

function unWin(accessToken, winID) {
	return {
		type: "UPDATE_WINS",
		payload: (0, _axios2.default)({
			method: "post",
			url: "/un_win",
			data: {
				accessToken: accessToken,
				winID: winID
			},
			headers: {
				"content-type": "application/json"
			}
		})
	};
	/*
 	return (dispatch) => {
 		dispatch({
 			type: "UPDATE_WINS_PENDING"
 		});
 
 		.then((res) => {	
 			parseWins(dispatch, res);
 		
 		}).catch((err) => {
 			dispatch({
 				type: "UPDATE_WINS_REJECTED",
 				payload: err
 			});
 		});
 	};*/
}

function like(accessToken, userID, winID, liking) {

	// update database
	(0, _axios2.default)({
		method: "post",
		url: "/like",
		data: {
			accessToken: accessToken,
			winID: winID,
			liking: liking
		},
		headers: {
			"content-type": "application/json"
		}
	});

	// update UI
	return {
		type: "TOGGLE_LIKE",
		payload: {
			todo: liking ? "inc" : "dec",
			winID: winID,
			userID: userID
		}
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

function logout() {
	return {
		type: "LOGOUT"
	};
}