export function changeText(newText) {
	return {
		type: "CHANGE_TEXT",
		payload: {
			newText
		}
	};
}