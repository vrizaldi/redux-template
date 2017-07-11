import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";

import reducers from "./reducers";
import log from "./middlewares/log";
import error from "./middlewares/error";

const middlewares = applyMiddleware(promise(), log, error);
export default createStore(reducers, middlewares);