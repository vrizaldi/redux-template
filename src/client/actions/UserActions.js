import axios from "axios";

export function fetchUserTwitter(requestToken, requestVerifier) {
	return (dispatch) => {
		dispatch({
			type: "FETCH_USER_PENDING"
		});

		axios({
			method: "post",
			url: "/verify_oauth_twitter",
			data: {
				requestToken,
				requestVerifier
			},
			headers: {
				"content-type": "application/json"
			}
		}).then((res) => {
			dispatch({
				type: "FETCH_USER_FULFILLED",
				payload: res
			});

			// parse the wins
			parseWins(dispatch, res.data.wins);
	
		}).catch((err) => {
			dispatch({
				type: "FETCH_USER_REJECTED",
				payload: err
			});
		});
	};
}

export function fetchUserFacebook(query) {
	return (dispatch) => {
		dispatch({
			type: "FETCH_USER_PENDING"
		});

		axios.get("/verify_oauth_facebook" + query).then((res) => {
			dispatch({
				type: "FETCH_USER_FULFILLED",
				payload: res
			});
			// parse the wins
			parseWins(dispatch, res.data.wins);

		}).catch((err) => {
			dispatch({
				type: "FETCH_USER_REJECTED",
				payload: err
			});
		});
	};
}

export function fetchUserGoogle(query) {
	return (dispatch) => {
		dispatch({
			type: "FETCH_USER_PENDING"
		});

		axios.get("/verify_oauth_google" + query).then((res) => {
			dispatch({
				type: "FETCH_USER_FULFILLED",
				payload: res
			});
			// parse the wins
			parseWins(dispatch, res.data.wins);

		}).catch((err) => {
			dispatch({
				type: "FETCH_USER_REJECTED",
				payload: err
			});
		});
	};
}

function parseWins(dispatch, wins) {
	axios({
		method: "post",
		url: "/parse_wins",
		data: wins,
		headers: {
			"content-type": "application/json"
		}
	}).then((res) => {
		dispatch({
			type: "FETCH_WINS_FULFILLED",
			payload: res
		});
	}).catch((err) => {
		dispatch({
			type: "FETCH_WINS_REJECTED",
			payload: err
		});
	});
}

export function addWin(accessToken, newWin) {
	return (dispatch) => {
		dispatch({
			type: "FETCH_WINS_PENDING"
		});

		axios({
			method: "post",
			url: "/add_win",
			data: {
				accessToken,
				newWin
			},
			headers: {
				"content-type": "application/json"
			}
		}).then((res) => {
			// parse the wins
			parseWins(dispatch, res.data);
		});
	};
}