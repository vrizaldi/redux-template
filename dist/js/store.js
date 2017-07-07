"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require("redux");

var _reducers = require("./reducers");

var _reducers2 = _interopRequireDefault(_reducers);

var _log = require("./middlewares/log");

var _log2 = _interopRequireDefault(_log);

var _error = require("./middlewares/error");

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middlewares = (0, _redux.applyMiddleware)(_log2.default, _error2.default);
exports.default = (0, _redux.createStore)(_reducers2.default, middlewares);