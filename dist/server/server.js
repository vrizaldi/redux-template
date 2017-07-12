"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _TwitterTokenManager = require("./TwitterTokenManager");

var _TwitterTokenManager2 = _interopRequireDefault(_TwitterTokenManager);

var _FacebookTokenManager = require("./FacebookTokenManager");

var _FacebookTokenManager2 = _interopRequireDefault(_FacebookTokenManager);

var _GoogleTokenManager = require("./GoogleTokenManager");

var _GoogleTokenManager2 = _interopRequireDefault(_GoogleTokenManager);

var _servePage = require("./servePage");

var _servePage2 = _interopRequireDefault(_servePage);

var _addWin = require("./addWin");

var _addWin2 = _interopRequireDefault(_addWin);

var _parseWins = require("./parseWins");

var _parseWins2 = _interopRequireDefault(_parseWins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// initialise token managers
_TwitterTokenManager2.default.init();
_FacebookTokenManager2.default.init();
_GoogleTokenManager2.default.init();

// initialise server
var server = (0, _express2.default)();

// initialise middlewares
server.use(_express2.default.static(__dirname + "/../public"));
var jsonencoded = _bodyParser2.default.json();

// initialise server routes
server.get("/login_twitter", _TwitterTokenManager2.default.getRequestToken.bind(_TwitterTokenManager2.default));
server.post("/verify_oauth_twitter", jsonencoded, _TwitterTokenManager2.default.verifyOauth.bind(_TwitterTokenManager2.default));

server.get("/login_facebook", _FacebookTokenManager2.default.getRequestToken.bind(_FacebookTokenManager2.default));
server.get("/verify_oauth_facebook", _FacebookTokenManager2.default.verifyOauth.bind(_FacebookTokenManager2.default));

server.get("/login_google", _GoogleTokenManager2.default.getRequestToken.bind(_GoogleTokenManager2.default));
server.get("/verify_oauth_google", _GoogleTokenManager2.default.verifyOauth.bind(_GoogleTokenManager2.default));

server.get("*", _servePage2.default);

server.post("/add_win", jsonencoded, _addWin2.default);
server.post("/parse_wins", jsonencoded, _parseWins2.default);

// start server
var port = process.env.PORT ? process.env.PORT : 21701;
server.listen(port, function (err) {
	if (err) throw err;

	console.log("Server is listening on port " + port);
});