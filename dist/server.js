"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _servePage = require("./server/servePage");

var _servePage2 = _interopRequireDefault(_servePage);

var _scanLocation = require("./server/scanLocation");

var _scanLocation2 = _interopRequireDefault(_scanLocation);

var _YelpTokenManager = require("./server/YelpTokenManager");

var _YelpTokenManager2 = _interopRequireDefault(_YelpTokenManager);

var _TwitterTokenManager = require("./server/TwitterTokenManager");

var _TwitterTokenManager2 = _interopRequireDefault(_TwitterTokenManager);

var _TwitterLogin = require("./server/TwitterLogin");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_YelpTokenManager2.default.init();
_TwitterTokenManager2.default.init();

var server = (0, _express2.default)();

server.use(_express2.default.static(__dirname + "/public"));
var jsonencoded = _bodyParser2.default.json();
var urlencoded = _bodyParser2.default.urlencoded();

// scan location
server.get("/scanlocation", _scanLocation2.default);

// twitter login
server.get("/login_twitter", _TwitterLogin.handleTwitterLogin);
server.get("/get_user", _TwitterLogin.getUser);

// landing page
server.get("*", _servePage2.default);

var port = process.env.PORT ? process.env.PORT : 21701;
server.listen(port, function (err) {
	if (err) throw err;

	console.log("Server is listening on port " + port);
});