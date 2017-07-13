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

var _ProfileActions = require("../actions/ProfileActions");

var _UserActions = require("../actions/UserActions");

var _Wins = require("../components/Wins");

var _Wins2 = _interopRequireDefault(_Wins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Recent = (_dec = (0, _reactRedux.connect)(function (store) {
	return {
		status: store.recent.status,
		loggedIn: store.user.loggedIn,
		userData: store.user.userData,
		wins: store.recent.wins
	};
}), _dec(_class = function (_React$Component) {
	_inherits(Recent, _React$Component);

	function Recent() {
		_classCallCheck(this, Recent);

		return _possibleConstructorReturn(this, (Recent.__proto__ || Object.getPrototypeOf(Recent)).apply(this, arguments));
	}

	_createClass(Recent, [{
		key: "componentDidMount",
		value: function componentDidMount() {
			this.props.dispatch((0, _ProfileActions.fetchRecent)());
		}
	}, {
		key: "like",
		value: function like(winID, liking) {
			console.log("winID", winID);
			this.props.dispatch((0, _UserActions.like)(this.props.userData.accessToken, winID, liking));
		}
	}, {
		key: "render",
		value: function render() {
			console.log("wins", this.props.wins);
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"h1",
					{ id: "title" },
					" #Recent\xA0",
					this.props.status == "fetching" ? _react2.default.createElement(
						"p",
						{ id: "loading" },
						_react2.default.createElement("i", { className: "fa fa-spinner fa-pulse fa-4x" })
					) : ""
				),
				_react2.default.createElement(_Wins2.default, { wins: this.props.wins,
					user_id: this.props.userData._id,
					"delete": false,
					like: this.props.loggedIn ? this.like.bind(this) : false
				})
			);
		}
	}]);

	return Recent;
}(_react2.default.Component)) || _class);
exports.default = Recent;