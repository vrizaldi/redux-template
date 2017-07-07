import axios from "axios";

export function scan(location, id) {
	if(id) {
		return {
			type: "SCAN",
			payload: axios.get(`/scanlocation?location=${location}&term=bar&id=${id}`)
		};
	} else {
		return {
			type: "SCAN",
			payload: axios.get(`/scanlocation?location=${location}&term=bar`)
		};
	}
}