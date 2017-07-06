import express from "express";
import bodyParser from "body-parser";

import servePage from "./server/servePage";
import scanLocation from "./server/scanLocation";
import yelpTokenManager from "./server/YelpTokenManager";
import twitterTokenManager from "./server/TwitterTokenManager";
import { handleTwitterLogin, getUser} from "./server/TwitterLogin";

yelpTokenManager.init();
twitterTokenManager.init();

var server = express();

server.use(express.static(__dirname + "/public"));
const jsonencoded = bodyParser.json();
const urlencoded = bodyParser.urlencoded();

// scan location
server.get("/scanlocation", scanLocation);

// twitter login
server.get("/login_twitter", handleTwitterLogin);
server.get("/get_user", getUser);

// landing page
server.get("*", servePage);

var port = process.env.PORT ? process.env.PORT : 21701;
server.listen(port, 
	function(err) {
		if(err) throw err;

		console.log("Server is listening on port " + port);
	});
