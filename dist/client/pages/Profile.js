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

var _Wins = require("../components/Wins");

var _Wins2 = _interopRequireDefault(_Wins);

var _ProfileActions = require("../actions/ProfileActions");

var _UserActions = require("../actions/UserActions");

var _sortWins = require("../utils/sortWins");

var _sortWins2 = _interopRequireDefault(_sortWins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Profile = (_dec = (0, _reactRedux.connect)(function (store) {
	return {
		loggedIn: store.user.loggedIn,
		status: store.profile.status,
		personal: store.profile.personal,
		profileData: store.profile.profileData,
		userData: store.user.userData
	};
}), _dec(_class = function (_React$Component) {
	_inherits(Profile, _React$Component);

	function Profile() {
		_classCallCheck(this, Profile);

		var _this = _possibleConstructorReturn(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).call(this));

		_this.state = {
			redirectHome: false
		};
		return _this;
	}

	_createClass(Profile, [{
		key: "componentWillMount",
		value: function componentWillMount() {
			this.setState({
				redirectHome: false
			});
			this.props.dispatch((0, _ProfileActions.reset)());
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			// load the profile data
			var query = _queryString2.default.parse(this.props.location.search);
			console.log("query", query);

			if (query.id) {
				// id found, load profile
				this.props.dispatch((0, _ProfileActions.loadProfile)(query.id));

				// tis personal, allow user to modify wins
				if (query.id == this.props.userData._id) this.props.dispatch((0, _ProfileActions.personalize)());
			} else {
				// no id specified, redirect home
				this.setState({
					redirectHome: true
				});
			}
		}
	}, {
		key: "delete",
		value: function _delete(winID) {
			console.log("winID", winID);
			this.props.dispatch((0, _UserActions.unWin)(this.props.userData.accessToken, winID));
		}
	}, {
		key: "like",
		value: function like(winID, liking) {
			console.log("winID", winID);
			this.props.dispatch((0, _UserActions.like)(this.props.userData.accessToken, this.props.userData._id, winID, liking));
		}
	}, {
		key: "render",
		value: function render() {
			if (this.state.redirectHome) {
				// redirect to home if needed
				// (e.g. when profile id not specified)
				return _react2.default.createElement(_reactRouterDom.Redirect, { to: "/" });
			}

			var _props$profileData = this.props.profileData,
			    username = _props$profileData.username,
			    imageurl = _props$profileData.imageurl,
			    wins = _props$profileData.wins;

			(0, _sortWins2.default)(wins); // sort the wins in dates
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"h1",
					{ id: "title" },
					username,
					"\xA0",
					this.props.status == "fetching" ? _react2.default.createElement("i", { className: "fa fa-spinner fa-pulse" }) : ""
				),
				_react2.default.createElement("img", { src: imageurl, alt: username + "'s profile image" }),
				_react2.default.createElement(_Wins2.default, { wins: wins,
					user_id: this.props.userData._id,
					"delete": this.props.personal ? this.delete.bind(this) : false,
					like: this.props.loggedIn ? this.like.bind(this) : false
				})
			);
		}
	}]);

	return Profile;
}(_react2.default.Component)) || _class);
exports.default = Profile;