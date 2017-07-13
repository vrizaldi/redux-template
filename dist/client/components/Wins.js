"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactMasonryComponent = require("react-masonry-component");

var _reactMasonryComponent2 = _interopRequireDefault(_reactMasonryComponent);

var _Win = require("./Win");

var _Win2 = _interopRequireDefault(_Win);

var _sortWins = require("../utils/sortWins");

var _sortWins2 = _interopRequireDefault(_sortWins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Wins = function (_React$Component) {
	_inherits(Wins, _React$Component);

	function Wins() {
		_classCallCheck(this, Wins);

		return _possibleConstructorReturn(this, (Wins.__proto__ || Object.getPrototypeOf(Wins)).apply(this, arguments));
	}

	_createClass(Wins, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			(0, _sortWins2.default)(this.props.wins); // sort the wins in dates

			return _react2.default.createElement(
				_reactMasonryComponent2.default,
				{ id: "wins-list",
					className: "grid",
					updateOnEachImageLoad: true,
					options: {
						columnWidth: "#grid-sizer",
						itemSelector: ".grid-item"
					}
				},
				_react2.default.createElement("div", { id: "grid-sizer" }),
				this.props.wins.map(function (gridItem) {
					var liked = gridItem.likers.findIndex(function (liker) {
						// check if user is one of the likers
						return liker._id == _this2.props.user_id;
					}) > -1; // -1 means they're not one of them
					return _react2.default.createElement(_Win2.default, { key: gridItem._id,
						gridItem: gridItem,
						"delete": _this2.props.delete,
						like: _this2.props.like,
						liked: liked
					});
				})
			);
		}
	}]);

	return Wins;
}(_react2.default.Component);

exports.default = Wins;