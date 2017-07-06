var debug = process.env.NODE_ENV != "production";
var webpack = require("webpack");

module.exports = {
	context: __dirname + "/dist",
	devtool: debug ? "inline-sourcemap" : null,
	entry: "./js/client.js",
	output: {
		path: __dirname + "/dist/public",
		filename: "client.min.js"
	}
}
