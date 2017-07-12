"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Modal = require("./Modal");

var _Modal2 = _interopRequireDefault(_Modal);

var _CloseButton = require("./CloseButton");

var _CloseButton2 = _interopRequireDefault(_CloseButton);

var _InputField = require("./InputField");

var _InputField2 = _interopRequireDefault(_InputField);

var _Button = require("./Button");

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewWinDialogue = function (_React$Component) {
	_inherits(NewWinDialogue, _React$Component);

	function NewWinDialogue() {
		_classCallCheck(this, NewWinDialogue);

		var _this = _possibleConstructorReturn(this, (NewWinDialogue.__proto__ || Object.getPrototypeOf(NewWinDialogue)).call(this));

		_this.state = {
			imageurl: "" // auto load image as soon as user entered url
		};
		return _this;
	}

	_createClass(NewWinDialogue, [{
		key: "loadImage",
		value: function loadImage() {
			// change the image preview
			var imageurl = document.getElementById("new-win-img-url").value;
			this.setState({
				imageurl: imageurl
			});
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				_Modal2.default,
				{ show: this.props.show },
				_react2.default.createElement(
					"div",
					{ className: "modal-header" },
					_react2.default.createElement(_InputField2.default, { id: "new-win-title",
						placeholder: "Enter title here" }),
					_react2.default.createElement(_CloseButton2.default, { close: this.props.hideNewWin })
				),
				_react2.default.createElement(
					"div",
					{ className: "modal-body" },
					_react2.default.createElement("img", { id: "img-preview", src: this.state.imageurl }),
					_react2.default.createElement(_InputField2.default, { id: "new-win-img-url",
						placeholder: "Image url",
						onInput: this.loadImage.bind(this) }),
					_react2.default.createElement("textarea", { id: "new-win-desc",
						className: "form-control",
						placeholder: "Description" }),
					_react2.default.createElement(
						_Button2.default,
						{ action: this.props.addWin, className: "btn btn-success" },
						"+"
					)
				)
			);
		}
	}]);

	return NewWinDialogue;
}(_react2.default.Component);

exports.default = NewWinDialogue;