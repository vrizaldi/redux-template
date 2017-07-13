"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require("redux");

var _userReducer = require("./userReducer");

var _userReducer2 = _interopRequireDefault(_userReducer);

var _profileReducer = require("./profileReducer");

var _profileReducer2 = _interopRequireDefault(_profileReducer);

var _recentReducer = require("./recentReducer");

var _recentReducer2 = _interopRequireDefault(_recentReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.combineReducers)({
	user: _userReducer2.default, profile: _profileReducer2.default, recent: _recentReducer2.default
});