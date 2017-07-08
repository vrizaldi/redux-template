var debug = process.env.NODE_ENV != "production";
var webpack = require("webpack");

module.exports = {
	context: __dirname + "/dist",
	entry: "./js/client.js",
	output: {
		path: __dirname + "/dist/public",
		filename: "client.min.js"
	},
	devtool: "source-map",
	plugins: debug ? [] : [
		new webpack.optimize.UglifyJsPlugin({
			comments: false,
			compress: {
				warnings: false,
				drop_console: true
			}
		})
	]
};
