"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _servePage = require("./servePage.js");

var _servePage2 = _interopRequireDefault(_servePage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = (0, _express2.default)();

server.use(_express2.default.static(__dirname + "/../public"));

server.get("*", _servePage2.default);

var port = process.env.PORT ? process.env.PORT : 21701;
server.listen(port, function (err) {
	if (err) throw err;

	console.log("Server is listening on port " + port);
});