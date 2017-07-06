import axios from "axios";

export function fetchUserData(oauth_token, oauth_verifier) {
	return {
		type: "FETCH_USER",
		payload: axios.get(`/get_user?oauth_token=${oauth_token}&oauth_verifier=${oauth_verifier}`)
	};
}