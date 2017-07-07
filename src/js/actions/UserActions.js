import axios from "axios";

export function fetchUserData(oauth_token, oauth_verifier) {
	return {
		type: "FETCH_USER",
		payload: axios.get(`/get_user?oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}`)
	};
}

export function goingTo(id, locationID) {
	return {
		type: "GOING",
		payload: axios({
			method: "post",
			url: "/go_to",
			data: {
				id,
				locationID
			},
			headers: {
				"content-type": "application/json"
			}
		})
	};
}

export function cancelTo(id, locationID) {
	return {
		type: "CANCEL",
		payload: axios({
			method: "post",
			url: "/cancel_to",
			data: {
				id,
				locationID
			},
			headers: {
				"content-type": "application/json"
			}
		})
	};
}