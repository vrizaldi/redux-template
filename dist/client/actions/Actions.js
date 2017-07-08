"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.changeText = changeText;
function changeText(newText) {
	return {
		type: "CHANGE_TEXT",
		payload: {
			newText: newText
		}
	};
}