const initialStates = {
	loggedIn: false,
	status: "idle",
	userData: {
		id: 0,
		username: "",
		imageurl: ""
	}
};

export default function reducer(state=initialStates, action) {
	switch(action.type) {
	case "FETCH_USER_PENDING":
		return {
			...state,
			status: "fetching"
		};

	case "FETCH_USER_FULFILLED":
		console.log("payload", action.payload);
		return {
			...state,
			status: "succeed",
			loggedIn: true,
			userData: {
				...state.userData,
				id: action.payload.data.id,
				username: action.payload.data.username,
				imageurl: action.payload.data.imageurl
			}
		};

	case "FETCH_USER_REJECTED":
		console.log("error", action.payload);
		return {
			...state,
			status: "failed"
		};

	default:
		return state;
	}
}