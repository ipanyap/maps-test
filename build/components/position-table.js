'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _positionRow = require('./position-row');

var _positionRow2 = _interopRequireDefault(_positionRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PositionTable = function (_Component) {
	_inherits(PositionTable, _Component);

	function PositionTable(props) {
		_classCallCheck(this, PositionTable);

		return _possibleConstructorReturn(this, (PositionTable.__proto__ || Object.getPrototypeOf(PositionTable)).call(this, props));
	}

	_createClass(PositionTable, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			/*const listStyle = {
   	flex: 2,
   	height: 200,
   	margin: '0px 250px 0px 0px',
   	overflowY: 'scroll',
   	//display: 'inline-block',
   	backgroundColor: '#EEEEEE',
   	border: '1px solid black'
   };*/

			var positions = this.props.positions;
			var list = positions.map(function (position) {
				return _react2.default.createElement(_positionRow2.default, { position: position, onChange: _this2.props.onChange });
			});

			return _react2.default.createElement(
				'ul',
				null,
				list
			);
		}
	}]);

	return PositionTable;
}(_react.Component);

exports.default = PositionTable;