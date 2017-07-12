const initialStates = {
	status: "idle",
	loggedIn: false,
	userData: {
		username: "",
		imageurl: "",
		accessToken: "",
		wins: []
	}
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
		var { username, imageurl, accessToken } = action.payload.data;
		return {
			...state,
			status: "succeed",
			loggedIn: true,
			userData: {
				...state.userData,
				username,
				imageurl,
				accessToken
			}
		};

	case "FETCH_USER_REJECTED":
		alert(action.payload.response.data ? action.payload.response.data : action.payload);
		return {
			...state,
			status: "failed"
		};

	case "FETCH_WINS_PENDING":
		return {
			...state,
			status: "fetching"
		};

	case "FETCH_WINS_FULFILLED":
		console.log("wins", action.payload.data);
		return {
			...state,
			status: "succeed",
			userData: {
				...state.userData,
				wins: action.payload.data
			}
		};

	case "FETCH_WINS_REJECTED":
		alert(action.payload.response.data ? action.payload.response.data : action.payload);
		return {
			...state,
			status: "failed"
		};
	
	default:
		return state;
	}
}