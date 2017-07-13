import axios from "axios";

export function fetchUserTwitter(query) {
	return {
		type: "FETCH_USER",
		payload: axios.get("/verify_oauth_twitter" + query)
	};
}

export function fetchUserFacebook(query) {
	return {
		type: "FETCH_USER",
		payload: axios.get("/verify_oauth_facebook" + query)
	};
}

export function fetchUserGoogle(query) {
	return {
		type: "FETCH_USER",
		payload: axios.get("/verify_oauth_google" + query)
	};
}

export function initUser() {
	const accessToken = localStorage.getItem("accessToken");
	if(accessToken) {
		// access token found
		return {
			type: "FETCH_USER",
			payload: axios({
				method: "post",
				url: "/access_token_login",
				data: {
					accessToken
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

export function addWin(accessToken, newWin) {
	return (dispatch) => {
		dispatch({
			type: "UPDATE_WINS_PENDING"
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
			parseWins(dispatch, res.data.newWin).then((parsedRes) => {
				parsedRes.data.todo = res.data.todo;
				dispatch({
					type: "UPDATE_WINS_FULFILLED",
					payload: parsedRes
				});

			}).catch((err) => {
				dispatch({
					type: "UPDATE_WINS_REJECTED",
					payload: err
				});
			});
		
		}).catch((err) => {
			dispatch({
				type: "UPDATE_WINS_REJECTED",
				payload: err
			});
		});
	};
}

export function unWin(accessToken, winID) {
	return {
		type: "UPDATE_WINS",
		payload: axios({
			method: "post",
			url: "/un_win",
			data: {
				accessToken,
				winID
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

export function like(accessToken, winID, liking) {
	return {
		type: "LIKE_WIN",
		payload: axios({
			method: "post",
			url: "/like",
			data: {
				accessToken,
				winID,
				liking
			},
			headers: {
				"content-type": "application/json"
			}
		})
	};
}

function parseWins(dispatch, wins) {
	return axios({
		method: "post",
		url: "/parse_wins",
		data: wins,
		headers: {
			"content-type": "application/json"
		}
	});
}

export function logout() {
	return {
		type: "LOGOUT"
	};
}