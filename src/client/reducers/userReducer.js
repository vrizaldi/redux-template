const initialStates = {
	status: "idle",
	loggedIn: false,
	userData: {
		_id: null,
		accessToken: "",
	}
};

export default function reduce(state=initialStates, action) {
	console.log("reducing", state);
	switch(action.type) {
	
	case "FETCH_USER_PENDING":
		return {
			...state,
			status: "fetching"
		};

	case "FETCH_USER_FULFILLED":
		var { _id, accessToken } = action.payload.data;

		// save accesstoken to localstorage
		localStorage.setItem("accessToken", accessToken);

		return {
			...state,
			status: "succeed",
			loggedIn: true,
			userData: {
				...state.userData,
				_id,
				accessToken
			}
		};

	case "FETCH_USER_REJECTED":
		alert(action.payload.response.data ? action.payload.response.data : action.payload);
		return {
			...state,
			status: "failed"
		};

	case "LOGOUT":
		// clear access token from local storage
		localStorage.removeItem("accessToken");

		// reset state
		return initialStates;
	
	default:
		return state;
	}
}