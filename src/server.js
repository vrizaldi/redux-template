import express from "express";

import servePage from "./server/servePage.js";

var server = express();

server.use(express.static(__dirname + "/public"));

server.get("*", servePage);

var port = process.env.PORT ? process.env.PORT : 21701;
server.listen(port, 
	function(err) {
		if(err) throw err;

		console.log("Server is listening on port " + port);
	});
