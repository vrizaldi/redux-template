"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

var _Button = require("./Button");

var _Button2 = _interopRequireDefault(_Button);

var _Image = require("./Image");

var _Image2 = _interopRequireDefault(_Image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Win = function (_React$Component) {
	_inherits(Win, _React$Component);

	function Win() {
		_classCallCheck(this, Win);

		var _this = _possibleConstructorReturn(this, (Win.__proto__ || Object.getPrototypeOf(Win)).call(this));

		_this.state = {
			liked: false
		};
		return _this;
	}

	_createClass(Win, [{
		key: "componentWillMount",
		value: function componentWillMount() {
			// default value
			this.setState({
				liked: this.props.liked
			});
		}
	}, {
		key: "toggleLike",
		value: function toggleLike() {
			// notify the app about the change
			var change = !this.state.liked;
			this.props.like(this.props.gridItem._id, change);

			// switch the liked state
			this.setState({
				liked: change
			});
		}
	}, {
		key: "render",
		value: function render() {
			var gridItem = this.props.gridItem;

			return _react2.default.createElement(
				"div",
				{ className: "grid-item" },
				_react2.default.createElement(_Image2.default, { src: gridItem.imageurl }),
				_react2.default.createElement(
					"p",
					null,
					gridItem.desc
				),
				_react2.default.createElement(
					_reactRouterDom.Link,
					{ to: "/profile?id=" + gridItem.by_id },
					gridItem.by
				),
				this.props.like ? _react2.default.createElement(
					"div",
					null,
					_react2.default.createElement("input", { id: "like-btn-" + gridItem._id,
						className: "like-btn",
						type: "checkbox",
						onInput: this.toggleLike.bind(this),
						checked: this.state.liked
					}),
					_react2.default.createElement("label", { htmlFor: "like-btn-" + gridItem._id,
						className: "fa fa-thumbs-up"
					})
				) : "",
				this.props.delete ? _react2.default.createElement(
					_Button2.default,
					{ className: "btn btn-danger",
						value: gridItem._id,
						action: this.props.delete
					},
					"Delete"
				) : ""
			);
		}
	}]);

	return Win;
}(_react2.default.Component);

exports.default = Win;