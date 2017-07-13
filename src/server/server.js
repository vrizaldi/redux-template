import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import passport from "passport";
import randomstring from "randomstring";

import accessTokenLogin from "./accessTokenLogin";
import twitterManager from "./TwitterTokenManager";
import facebookManager from "./FacebookTokenManager";
import googleManager from "./GoogleTokenManager";

import servePage from "./servePage";
import addWin from "./addWin";
import unWin from "./unWin";
import parseWins from "./parseWins";
import getProfile from "./getProfile";
import getRecentWins from "./getRecentWins";
import handleLike from "./handleLike";

// initialise token managers
twitterManager.init();
facebookManager.init();
googleManager.init();

// initialise server
var server = express();

// initialise middlewares
server.use(express.static(__dirname + "/../public"));

// sessions
passport.serializeUser((user, done) => {
	console.log("serialize user", user);
	done(null, user._id);
});
passport.deserializeUser((obj, done) => {
	console.log("deserialize", obj);
	done(null, obj);
});
server.use(session({
	secret: randomstring.generate(),
	resave: false,
	saveUninitialized: true
}));
server.use(passport.initialize());
server.use(passport.session());

const jsonencoded = bodyParser.json();

// initialise server routes
server.get("/login_twitter", passport.authenticate("twitter"));
server.get("/verify_oauth_twitter", 
	passport.authenticate("twitter", {failureRedirect: "/"}),
	twitterManager.verifyOauth.bind(twitterManager));

server.get("/login_facebook", passport.authenticate("facebook"));
server.get("/verify_oauth_facebook", 
	passport.authenticate("facebook", {failureRedirect: "/"}),
	facebookManager.verifyOauth.bind(facebookManager));

server.get("/login_google", passport.authenticate("google", {scope: ["profile"]}));
server.get("/verify_oauth_google", 
	passport.authenticate("google", {failureRedirect: "/login"}),
	googleManager.verifyOauth.bind(googleManager));

server.post("/access_token_login", jsonencoded, accessTokenLogin);
server.get("/get_profile", getProfile);
server.post("/add_win", jsonencoded, addWin);
server.post("/un_win", jsonencoded, unWin);
server.post("/parse_wins", jsonencoded, parseWins);
server.get("/get_recent", getRecentWins);
server.post("/like", jsonencoded, handleLike);
server.get("*", servePage);

// start server
var port = process.env.PORT ? process.env.PORT : 21701;
server.listen(port, 
	function(err) {
		if(err) throw err;

		console.log("Server is listening on port " + port);
	});
