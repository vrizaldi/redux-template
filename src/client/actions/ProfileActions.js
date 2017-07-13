import axios from "axios";

export function loadProfile(_id) {
	return (dispatch) => {
		dispatch({
			type: "FETCH_PROFILE_PENDING"
		});

		axios.get("/get_profile?_id=" + _id).then((profileRes) => {
			console.log("res", profileRes);
			parseWins(dispatch, profileRes.data.wins).then((winsRes) => {
				dispatch({
					type: "FETCH_PROFILE_FULFILLED",
					payload: {
						...profileRes,
						data: {
							...profileRes.data,
							wins: winsRes.data
						}
					}
				});

			}).catch((err) => {
				dispatch({
					type: "FETCH_PROFILE_REJECTED",
					payload: err
				});
			});
		}).catch((err) => {
			dispatch({
				type: "FETCH_PROFILE_REJECTED",
				payload: err
			});
		});
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

export function reset() {
	return {
		type: "RESET"
	};
}

export function personalize() {
	return {
		type:"PERSONALIZE"
	};
}

export function fetchRecent() {
	return (dispatch) => {
		dispatch({
			type: "FETCH_RECENT_PENDING"
		});

		axios.get("/get_recent").then((res) => {
			parseWins(dispatch, res.data).then((parsedWins) => {
				dispatch({
					type: "FETCH_RECENT_FULFILLED",
					payload: parsedWins
				});
			}).catch((err) => {
				dispatch({
					type: "FETCH_RECENT_REJECTED",
					payload: err
				});
			});
		});
	};
}