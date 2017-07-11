"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _Login = require("../pages/Login");

var _Login2 = _interopRequireDefault(_Login);

var _Profile = require("../pages/Profile");

var _Profile2 = _interopRequireDefault(_Profile);

var _Home = require("../pages/Home");

var _Home2 = _interopRequireDefault(_Home);

var _LoggingIn = require("../pages/LoggingIn");

var _LoggingIn2 = _interopRequireDefault(_LoggingIn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Main = function (_React$Component) {
	_inherits(Main, _React$Component);

	function Main() {
		_classCallCheck(this, Main);

		return _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).apply(this, arguments));
	}

	_createClass(Main, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"h1",
					null,
					"#Main"
				),
				_react2.default.createElement(
					_reactRouterDom.Switch,
					null,
					_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: "/", component: _Home2.default }),
					_react2.default.createElement(_reactRouterDom.Route, { path: "/profile", component: _Profile2.default }),
					_react2.default.createElement(_reactRouterDom.Route, { path: "/login", component: _Login2.default }),
					_react2.default.createElement(_reactRouterDom.Route, { path: "/logging_in", component: _LoggingIn2.default })
				)
			);
		}
	}]);

	return Main;
}(_react2.default.Component);

exports.default = Main;