"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require("redux");

var _listReducer = require("./listReducer");

var _listReducer2 = _interopRequireDefault(_listReducer);

var _userReducer = require("./userReducer");

var _userReducer2 = _interopRequireDefault(_userReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
	list: _listReducer2.default,
	user: _userReducer2.default
});