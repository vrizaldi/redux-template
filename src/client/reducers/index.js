import { combineReducers } from "redux";

import user from "./userReducer";
import profile from "./profileReducer";
import recent from "./recentReducer";

export default combineReducers({
	user, profile, recent
});
