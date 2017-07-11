const initialStates = {
	status: "idle",
	loggedIn: false,
	userData: null
};

export default function reduce(state=initialStates, action) {
	console.log("reducing", state);
	switch(action.type) {
	case "LOGIN_PENDING":
		return {
			...state,
			status: "fetching"	
		};
	
	case "LOGIN_FULFILLED":
		return {
			...state,
			status: "succeed",
			userData: action.payload.data
		};

	case "LOGIN_REJECTED":
		alert(action.payload.response.data ? action.payload.response.data : action.payload);
		return {
			...state,
			status: "failed"
		};

	case "FETCH_USER_PENDING":
		return {
			...state,
			status: "fetching"
		};

	case "FETCH_USER_FULFILLED":
		return {
			...state,
			status: "succeed",
			loggedIn: true,
			userData: action.payload.data
		};

	case "FETCH_USER_REJECTED":
		alert(action.payload.response.data ? action.payload.response.data : action.payload);
		return {
			...state,
			status: "failed"
		};
	
	default:
		return state;
	}
}