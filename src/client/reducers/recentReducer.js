const initialStates = {
	status: "idle",
	wins: []
};

export default function reduce(state=initialStates, action) {
	switch(action.type) {
	case "FETCH_RECENT_PENDING":
		return {
			...state,
			status: "fetching"
		};

	case "FETCH_RECENT_FULFILLED":
		return {
			...state,
			status: "succeed",
			wins: action.payload.data
		};

	case "FETCH_RECENT_REJECTED":
		alert(action.payload.response.data ? action.payload.response.data : action.payload);
		return {
			...state,
			status: "failed"
		};

	case "UPDATE_WINS_PENDING":
		return {
			...state,
			status: "fetching"
		};

	case "UPDATE_WINS_FULFILLED":
		console.log("action.payload", action.payload);
		
		var wins = state.wins.splice(0);	// clone it
		if(action.payload.data.todo == "add") {
			// add the new win
			console.log("action.payload.data", action.payload.data);
			wins.push(action.payload.data[0]);	
			console.log("wins", wins);
			return {
				...state,
				status: "succeed",
				wins
			};

		} else { // remove it
			console.log("wins before before", wins);
			var index = wins.findIndex((win) => {
				// find the index of the win
				return win._id == action.payload.data.winID;
			});
			console.log("index", index);
			console.log("wins before", wins);
			wins.splice(index, 1);
			console.log("wins after", wins);
			return {
				...state,
				status: "succeed",
				wins
			};
		}

	case "UPDATE_WINS_REJECTED":
		if(state.personal) alert("Error occurred while trying to reload the wins.");
		return state;

	default:
		return state;
	}
}