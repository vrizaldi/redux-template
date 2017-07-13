"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Nav = function (_React$Component) {
	_inherits(Nav, _React$Component);

	function Nav() {
		_classCallCheck(this, Nav);

		return _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).apply(this, arguments));
	}

	_createClass(Nav, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ id: "nav", className: "col-md-8" },
				this.props.loggedIn ? _react2.default.createElement(
					"nav",
					{ className: "nav justify-content-center" },
					_react2.default.createElement(
						_reactRouterDom.Link,
						{ className: "nav-link",
							to: "/profile?id=" + this.props.id
						},
						_react2.default.createElement("span", { className: "fa fa-user-circle-o" }),
						" Profile"
					),
					_react2.default.createElement(
						_reactRouterDom.Link,
						{ className: "nav-link",
							to: "/"
						},
						_react2.default.createElement("span", { className: "fa fa-home" }),
						" Home"
					)
				) : _react2.default.createElement(
					_reactRouterDom.Link,
					{ className: "nav-link", to: "/login" },
					_react2.default.createElement("span", { className: "fa fa-hand-o-right" }),
					" Login"
				)
			);
		}
	}]);

	return Nav;
}(_react2.default.Component);

exports.default = Nav;