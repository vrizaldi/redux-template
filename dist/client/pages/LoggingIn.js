"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _queryString = require("query-string");

var _queryString2 = _interopRequireDefault(_queryString);

var _OverAll = require("../components/OverAll");

var _OverAll2 = _interopRequireDefault(_OverAll);

var _UserActions = require("../actions/UserActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoggingIn = (_dec = (0, _reactRedux.connect)(function (store) {
	return {
		status: store.user.status,
		loggedIn: store.user.loggedIn,
		id: store.user.userData._id
	};
}), _dec(_class = function (_React$Component) {
	_inherits(LoggingIn, _React$Component);

	function LoggingIn() {
		_classCallCheck(this, LoggingIn);

		return _possibleConstructorReturn(this, (LoggingIn.__proto__ || Object.getPrototypeOf(LoggingIn)).apply(this, arguments));
	}

	_createClass(LoggingIn, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			var query = _queryString2.default.parse(this.props.location.search);

			// parse pathname, determine which site the auth is for
			var path = this.props.location.pathname.split("/");
			var site = path[2]; // second dir (/logging_in/[site])
			console.log("site", site);
			console.log("location", this.props.location);
			switch (site) {
				case "facebook":
					// redirect the query (and hashes) to server
					this.props.dispatch((0, _UserActions.fetchUserFacebook)(this.props.location.search + this.props.location.hash));
					break;

				case "google":
					// redirect the query (and hashes) to server
					this.props.dispatch((0, _UserActions.fetchUserGoogle)(this.props.location.search + this.props.location.hash));
					break;

				case "twitter":
					// redirect the query (and hashes) to server
					this.props.dispatch((0, _UserActions.fetchUserTwitter)(this.props.location.search + this.props.location.hash));
					break;
			}
		}
	}, {
		key: "render",
		value: function render() {
			if (this.props.loggedIn) {
				// redirect to profile if logged in
				console.log("loggedIn", this.props.loggedIn);
				return _react2.default.createElement(_reactRouterDom.Redirect, { to: "/profile?id=" + this.props.id });
			}

			// fetching user data
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"h1",
					{ id: "title" },
					"Please Wait."
				),
				_react2.default.createElement(
					"p",
					null,
					"Logging in..."
				)
			);
		}
	}]);

	return LoggingIn;
}(_react2.default.Component)) || _class);
exports.default = LoggingIn;