const initialStates = {
	status: "idle",
	businesses: []
};

export default function reducer(state=initialStates, action) {
	switch(action.type) {
	case "SCAN_PENDING":
		return {
			...state,
			status: "fetching"
		};

	case "SCAN_FULFILLED":
		console.log(action.payload);
		return {
			...state,
			status: "succeed",
			businesses: action.payload.data
		};

	case "SCAN_REJECTED":
		return {
			...state,
			status: "failed"
		};

	default:
		return state;
	}
}