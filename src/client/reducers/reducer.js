const initialStates = {
	text: "try clicking it."
};
export default function reducer(state=initialStates, action) {
	switch(action.type) {
	case "CHANGE_TEXT":
		return {...state, text:action.payload.newText};
	}
	return state;
}