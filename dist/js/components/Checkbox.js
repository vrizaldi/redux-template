"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Checkbox = function (_React$Component) {
	_inherits(Checkbox, _React$Component);

	function Checkbox() {
		_classCallCheck(this, Checkbox);

		return _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).apply(this, arguments));
	}

	_createClass(Checkbox, [{
		key: "onChange",
		value: function onChange() {
			this.props.onChange(this.props.value);
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ className: this.props.divClass },
				_react2.default.createElement(
					"label",
					{ htmlFor: this.props.id },
					this.props.label
				),
				_react2.default.createElement("input", { id: this.props.id,
					className: this.props.className,
					onChange: this.onChange.bind(this),
					type: "checkbox",
					defaultChecked: this.props.defaultChecked
				})
			);
		}
	}]);

	return Checkbox;
}(_react2.default.Component);

exports.default = Checkbox;