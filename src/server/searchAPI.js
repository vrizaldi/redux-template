import axios from "axios";

export default function searchAPI(accessToken, location, term) {
	console.log(`Searching ${location} for ${term}, bearing ${accessToken}`);

	return axios({
		method: "get",
		url: `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}`,
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
}