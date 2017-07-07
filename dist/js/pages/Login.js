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

var _reactRouter = require("react-router");

var _queryString = require("query-string");

var _queryString2 = _interopRequireDefault(_queryString);

var _UserActions = require("../actions/UserActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = (_dec = (0, _reactRedux.connect)(function (store) {
	return {
		loggedIn: store.user.loggedIn,
		status: store.user.status
	};
}), _dec(_class = function (_React$Component) {
	_inherits(Login, _React$Component);

	function Login() {
		_classCallCheck(this, Login);

		return _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).apply(this, arguments));
	}

	_createClass(Login, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			// load user data
			console.log("location", this.props.location);
			var query = _queryString2.default.parse(this.props.location.search);
			console.log("Query:", query);
			var oauth_token = query.oauth_token,
			    oauth_verifier = query.oauth_verifier;

			this.props.dispatch((0, _UserActions.fetchUserData)(oauth_token, oauth_verifier));
		}
	}, {
		key: "render",
		value: function render() {
			if (this.props.status == "fetching") {
				// show loading screen
				return _react2.default.createElement(
					"p",
					null,
					"Fetching user data..."
				);
			} else {
				// if not loading or already finished
				// redirect to home screen
				return _react2.default.createElement(_reactRouter.Redirect, { to: "/home" });
			}
		}
	}]);

	return Login;
}(_react2.default.Component)) || _class);
exports.default = Login;