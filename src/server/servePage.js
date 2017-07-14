import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router";
import { Provider } from "react-redux";

import store from "../client/store";
import App from "../client/App";

export default function servePage(req, res) {
	console.log("Serving page...");
	const context = {};

	// render the requested page as html
	const html = ReactDOMServer.renderToString(
		<Provider store={store}>
			<StaticRouter
				location={req.url}
				context={context}>
				<App/>
			</StaticRouter>
		</Provider>
	);

	res.writeHead(200, {
		"content-type": "text/html"
	});
	// send completed html to client
	res.write(`
	<!doctype html>
		<html>
		<head>
			<meta charset="utf-8">

			<title>#winterest</title>
			<meta name="author" content="vrizaldi">
			<link id="favicon" rel="icon" href="/favicon.png">

			<link href="/bootstrap.min.css" rel="stylesheet">
			<link href="/bootstrap-social.css" rel="stylesheet">
			<link href="/font-awesome.min.css" rel="stylesheet">
			<link href="/index.min.css" rel="stylesheet">
		</head>

		<body>
			<div id="app">${html}</div>
			<script src="/client.min.js"></script>
			<p id="credit">Verdy Noorghifari 2017 © All right reversed.</p>
		</body>
		</html>
	`);
	res.end();
	console.log("File sent");
}
