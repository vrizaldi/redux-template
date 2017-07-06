import { combineReducers } from "redux";

import list from "./listReducer";
import user from "./userReducer";

export default combineReducers({
	list,
	user
});
