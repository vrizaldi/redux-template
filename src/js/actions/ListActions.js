import axios from "axios";

export function scan(location) {
	return {
		type: "SCAN",
		payload: axios.get(`/scanlocation?location=${location}&term=food`)
	};
}