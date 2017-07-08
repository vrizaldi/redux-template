import { createStore, applyMiddleware } from "redux";

import reducers from "./reducers";
import log from "./middlewares/log";
import error from "./middlewares/error";

const middlewares = applyMiddleware(log, error);
export default createStore(reducers, middlewares);