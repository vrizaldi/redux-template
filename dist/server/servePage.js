"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = servePage;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _server = require("react-dom/server");

var _server2 = _interopRequireDefault(_server);

var _reactRouter = require("react-router");

var _reactRedux = require("react-redux");

var _store = require("../js/store");

var _store2 = _interopRequireDefault(_store);

var _App = require("../js/App");

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function servePage(req, res) {
	console.log("Serving page...");
	var context = {};

	// render the requested page as html
	var html = _server2.default.renderToString(_react2.default.createElement(
		_reactRedux.Provider,
		{ store: _store2.default },
		_react2.default.createElement(
			_reactRouter.StaticRouter,
			{
				location: req.url,
				context: context },
			_react2.default.createElement(_App2.default, null)
		)
	));

	res.writeHead(200, {
		"content-type": "text/html"
	});
	// send completed html to client
	res.write("\n\t<!doctype html>\n\t\t<html>\n\t\t<head>\n\t\t\t<meta charset=\"utf-8\">\n\n\t\t\t<title></title>\n\t\t\t<meta name=\"author\" content=\"vrizaldi\">\n\n\t\t\t<link href=\"/bootstrap.min.css\" rel=\"stylesheet\">\n\t\t\t<link href=\"/freelancer.min.css\" rel=\"stylesheet\">\n\t\t\t<link href=\"/index.min.css\" rel=\"stylesheet\">\n\t\t</head>\n\n\t\t<body>\n\t\t\t<div id=\"app\">" + html + "</div>\n\t\t\t<script src=\"/client.min.js\"></script>\n\t\t\t<p id=\"credit\">Verdy Noorghifari 2017 \xA9 All right reversed.</p>\n\t\t</body>\n\t\t</html>\n\t");
	res.end();
	console.log("File sent");
}