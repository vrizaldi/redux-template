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

var _Nav = require("./Nav");

var _Nav2 = _interopRequireDefault(_Nav);

var _Button = require("./Button");

var _Button2 = _interopRequireDefault(_Button);

var _NewWinDialogue = require("./NewWinDialogue");

var _NewWinDialogue2 = _interopRequireDefault(_NewWinDialogue);

var _UserActions = require("../actions/UserActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = (_dec = (0, _reactRedux.connect)(function (store) {
	return {
		loggedIn: store.user.loggedIn,
		userData: store.user.userData
	};
}), _dec(_class = function (_React$Component) {
	_inherits(Header, _React$Component);

	function Header() {
		_classCallCheck(this, Header);

		var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this));

		_this.state = {
			showingNewWin: false // for modal
		};
		return _this;
	}

	_createClass(Header, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			// initialise web
			this.props.dispatch((0, _UserActions.initUser)());
		}
	}, {
		key: "showNewWin",
		value: function showNewWin() {
			// show modal
			this.setState({
				showingNewWin: true
			});
		}
	}, {
		key: "hideNewWin",
		value: function hideNewWin() {
			// hide modal
			this.setState({
				showingNewWin: false
			});
		}
	}, {
		key: "addWin",
		value: function addWin() {
			var imageurl = document.getElementById("new-win-img-url").value;
			var title = document.getElementById("new-win-title").value;
			var desc = document.getElementById("new-win-desc").value;
			var newWin = {
				imageurl: imageurl,
				title: title,
				desc: desc
			};

			console.log("Adding " + title + " - " + desc + " (" + imageurl + ")", newWin);
			this.props.dispatch((0, _UserActions.addWin)(this.props.userData.accessToken, newWin));

			// hide the dialogue after
			this.hideNewWin();
		}
	}, {
		key: "logout",
		value: function logout() {
			this.props.dispatch((0, _UserActions.logout)());
		}
	}, {
		key: "render",
		value: function render() {
			console.log("loggedIn", this.props.loggedIn);
			return _react2.default.createElement(
				"header",
				{ role: "banner", className: "navbar fixed-top" },
				_react2.default.createElement(
					"div",
					{ className: "row" },
					_react2.default.createElement(
						"div",
						{ className: "col-md-2" },
						_react2.default.createElement(
							_reactRouterDom.Link,
							{ className: "nav-link", to: "/" },
							"#winterest"
						)
					),
					_react2.default.createElement(_Nav2.default, { loggedIn: this.props.loggedIn, id: this.props.userData._id }),
					this.props.loggedIn ? _react2.default.createElement(
						"div",
						{ id: "win-adder-wrapper", className: "col-md-1" },
						_react2.default.createElement(
							_Button2.default,
							{ className: "btn btn-success",
								action: this.showNewWin.bind(this)
							},
							"+"
						),
						_react2.default.createElement(_NewWinDialogue2.default, { show: this.state.showingNewWin,
							addWin: this.addWin.bind(this),
							hideNewWin: this.hideNewWin.bind(this)
						})
					) : "",
					this.props.loggedIn ? _react2.default.createElement(
						"div",
						{ className: "col-md-1" },
						_react2.default.createElement(
							_reactRouterDom.Link,
							{ id: "logout-btn",
								className: "nav-link",
								to: "/",
								onClick: this.logout.bind(this)
							},
							_react2.default.createElement("i", { className: "fa fa-power-off" })
						)
					) : ""
				)
			);
		}
	}]);

	return Header;
}(_react2.default.Component)) || _class);
exports.default = Header;