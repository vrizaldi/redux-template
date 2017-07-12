import express from "express";
import bodyParser from "body-parser";

import twitterManager from "./TwitterTokenManager";
import facebookManager from "./FacebookTokenManager";
import googleManager from "./GoogleTokenManager";

import servePage from "./servePage";
import addWin from "./addWin";
import parseWins from "./parseWins";

// initialise token managers
twitterManager.init();
facebookManager.init();
googleManager.init();

// initialise server
var server = express();

// initialise middlewares
server.use(express.static(__dirname + "/../public"));
const jsonencoded = bodyParser.json();

// initialise server routes
server.get("/login_twitter", twitterManager.getRequestToken.bind(twitterManager));
server.post("/verify_oauth_twitter", jsonencoded, twitterManager.verifyOauth.bind(twitterManager));

server.get("/login_facebook", facebookManager.getRequestToken.bind(facebookManager));
server.get("/verify_oauth_facebook", facebookManager.verifyOauth.bind(facebookManager));

server.get("/login_google", googleManager.getRequestToken.bind(googleManager));
server.get("/verify_oauth_google", googleManager.verifyOauth.bind(googleManager));

server.get("*", servePage);

server.post("/add_win", jsonencoded, addWin);
server.post("/parse_wins", jsonencoded, parseWins);

// start server
var port = process.env.PORT ? process.env.PORT : 21701;
server.listen(port, 
	function(err) {
		if(err) throw err;

		console.log("Server is listening on port " + port);
	});
