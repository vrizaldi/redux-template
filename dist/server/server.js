"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _expressSession = require("express-session");

var _expressSession2 = _interopRequireDefault(_expressSession);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _passport = require("passport");

var _passport2 = _interopRequireDefault(_passport);

var _randomstring = require("randomstring");

var _randomstring2 = _interopRequireDefault(_randomstring);

var _accessTokenLogin = require("./accessTokenLogin");

var _accessTokenLogin2 = _interopRequireDefault(_accessTokenLogin);

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

var _unWin = require("./unWin");

var _unWin2 = _interopRequireDefault(_unWin);

var _parseWins = require("./parseWins");

var _parseWins2 = _interopRequireDefault(_parseWins);

var _getProfile = require("./getProfile");

var _getProfile2 = _interopRequireDefault(_getProfile);

var _getRecentWins = require("./getRecentWins");

var _getRecentWins2 = _interopRequireDefault(_getRecentWins);

var _handleLike = require("./handleLike");

var _handleLike2 = _interopRequireDefault(_handleLike);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// initialise token managers
_TwitterTokenManager2.default.init();
_FacebookTokenManager2.default.init();
_GoogleTokenManager2.default.init();

// initialise server
var server = (0, _express2.default)();

// initialise middlewares
server.use(_express2.default.static(__dirname + "/../public"));

// sessions
_passport2.default.serializeUser(function (user, done) {
	console.log("serialize user", user);
	done(null, user._id);
});
_passport2.default.deserializeUser(function (obj, done) {
	console.log("deserialize", obj);
	done(null, obj);
});
server.use((0, _expressSession2.default)({
	secret: _randomstring2.default.generate(),
	resave: false,
	saveUninitialized: true
}));
server.use(_passport2.default.initialize());
server.use(_passport2.default.session());

var jsonencoded = _bodyParser2.default.json();

// initialise server routes
server.get("/login_twitter", _passport2.default.authenticate("twitter"));
server.get("/verify_oauth_twitter", _passport2.default.authenticate("twitter", { failureRedirect: "/" }), _TwitterTokenManager2.default.verifyOauth.bind(_TwitterTokenManager2.default));

server.get("/login_facebook", _passport2.default.authenticate("facebook"));
server.get("/verify_oauth_facebook", _passport2.default.authenticate("facebook", { failureRedirect: "/" }), _FacebookTokenManager2.default.verifyOauth.bind(_FacebookTokenManager2.default));

server.get("/login_google", _passport2.default.authenticate("google", { scope: ["profile"] }));
server.get("/verify_oauth_google", _passport2.default.authenticate("google", { failureRedirect: "/login" }), _GoogleTokenManager2.default.verifyOauth.bind(_GoogleTokenManager2.default));

server.post("/access_token_login", jsonencoded, _accessTokenLogin2.default);
server.get("/get_profile", _getProfile2.default);
server.post("/add_win", jsonencoded, _addWin2.default);
server.post("/un_win", jsonencoded, _unWin2.default);
server.post("/parse_wins", jsonencoded, _parseWins2.default);
server.get("/get_recent", _getRecentWins2.default);
server.post("/like", jsonencoded, _handleLike2.default);
server.get("*", _servePage2.default);

// start server
var port = process.env.PORT ? process.env.PORT : 21701;
server.listen(port, function (err) {
	if (err) throw err;

	console.log("Server is listening on port " + port);
});