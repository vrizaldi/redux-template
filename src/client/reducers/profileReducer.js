const initialStates = {
	status: "idle",
	personal: false,
	profileData: {
		username: "",
		imageurl: "",
		wins: []
	}
};

export default function reduce(state=initialStates, action) {
	console.log("reducing", state);
	switch(action.type) {

	case "FETCH_PROFILE_PENDING":
		return {
			...state,
			status: "fetching"
		};

	case "FETCH_PROFILE_FULFILLED":
		console.log("wins", action.payload.data);
		return {
			...state,
			status: "succeed",
			profileData: {
				...state.userData,
				username: action.payload.data.username,
				wins: action.payload.data.wins,
				imageurl: action.payload.data.imageurl
			}
		};

	case "FETCH_PROFILE_REJECTED":
		alert(action.payload.response.data ? action.payload.response.data : action.payload);
		return {
			...state,
			status: "failed"
		};

	case "RESET":
		return initialStates;

	case "PERSONALIZE":
		return {
			...state,
			personal: true
		};

	case "UPDATE_WINS_PENDING":
		if(state.personal) {
			return {
				...state,
				status: "fetching"
			};
		} else {
			return state;
		}

	case "UPDATE_WINS_FULFILLED":
		// update the profile only if the currently viewed profile
		// is the user's (personal)
		console.log("action.payload", action.payload);
		
		if(state.personal) {
			var wins = state.profileData.wins.splice(0);	// clone it
			if(action.payload.data.todo == "add") {
				// add the new win
				console.log("action.payload.data", action.payload.data);
				wins.push(action.payload.data[0]);	
				console.log("wins", wins);
				return {
					...state,
					status: "succeed",
					profileData: {
						...state.profileData,
						wins
					}
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
					profileData: {
						...state.profileData,
						wins
					}
				};
			}
			
		} else {
			return state;
		}

	case "UPDATE_WINS_REJECTED":
		if(state.personal) alert("Error occurred while trying to reload the wins.");
		return state;

	case "TOGGLE_LIKE":
		var wins = state.profileData.wins.splice(0);
		var index = wins.findIndex((win) => {
			return win._id == action.payload.winID;
		});

		if(index > -1) {
			// win found
			var win = wins[index];
			if(action.payload.todo == "inc") {
				win.likers.push({}); 		// add likers for UI purpose
			} else {
				win.likers.pop();
			}

			return {
				...state,
				profileData: {
					...state.profileData,
					wins
				}
			};
		} else {
			// win not found
			return state;
		}

	default:
		return state;
	}
}