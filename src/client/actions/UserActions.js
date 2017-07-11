import axios from "axios";

export function fetchUserTwitter(requestToken, requestVerifier) {
	return {
		type: "FETCH_USER",
		payload: axios({
			method: "post",
			url: "/verify_oauth_twitter",
			data: {
				requestToken,
				requestVerifier
			},
			headers: {
				"content-type": "application/json"
			}
		})
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