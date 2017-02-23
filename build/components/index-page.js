'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _simpleMap = require('./simple-map');

var _simpleMap2 = _interopRequireDefault(_simpleMap);

var _positionTable = require('./position-table');

var _positionTable2 = _interopRequireDefault(_positionTable);

var _routeForm = require('./route-form');

var _routeForm2 = _interopRequireDefault(_routeForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndexPage = function (_Component) {
	_inherits(IndexPage, _Component);

	function IndexPage(props) {
		_classCallCheck(this, IndexPage);

		var _this = _possibleConstructorReturn(this, (IndexPage.__proto__ || Object.getPrototypeOf(IndexPage)).call(this, props));

		_this.state = {
			places: [],
			origin: null,
			destination: null,
			newRoute: false
		};

		_this.axios = require('axios');
		_this.handleMapEvent = _this.handleMapEvent.bind(_this);
		_this.handleRouteEvent = _this.handleRouteEvent.bind(_this);
		return _this;
	}

	_createClass(IndexPage, [{
		key: 'handleMapEvent',
		value: function handleMapEvent(e) {
			var _this2 = this;

			if (e.type === 'add') {
				this.setState(function (prevState, props) {
					return {
						places: prevState.places.concat([e.position])
					};
				});
			} else if (e.type === 'route-done') {
				this.setState({ newRoute: false });
			} else {
				var places = this.state.places.slice();
				var index = places.indexOf(e.position);
				if (index > -1) {
					if (e.type === 'delete') {
						this.axios.post('/delete', e.position).then(function (res) {
							if (res.status === 200) {
								var origin = _this2.state.origin === e.position ? null : _this2.state.origin;
								var dest = _this2.state.destination === e.position ? null : _this2.state.destination;
								places.splice(index, 1);
								_this2.setState(function (prevState, props) {
									return {
										places: places,
										origin: origin,
										destination: dest
									};
								});
							}
						});
					} else if (e.type === 'origin') {
						this.setState(function (prevState, props) {
							return {
								origin: places[index]
							};
						});
					} else if (e.type === 'destination') {
						this.setState(function (prevState, props) {
							return {
								destination: places[index]
							};
						});
					}
				}
			}
		}
	}, {
		key: 'handleRouteEvent',
		value: function handleRouteEvent() {
			this.setState({ newRoute: true });
		}
	}, {
		key: 'render',
		value: function render() {
			var state = this.state;
			var places = this.state.places;
			var newRoute = this.state.newRoute;
			var edge = {
				origin: this.state.origin,
				destination: this.state.destination
			};

			var articleStyle = {
				height: 200,
				margin: '0px 0px 0px 200px',
				padding: '1px',
				borderLeft: '1px solid gray',
				backgroundColor: '#EEEEEE',
				overflowY: 'scroll'
			};

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(_simpleMap2.default, { data: state, onChange: this.handleMapEvent }),
				_react2.default.createElement(_routeForm2.default, { data: edge, onClick: this.handleRouteEvent }),
				_react2.default.createElement(
					'div',
					{ style: articleStyle },
					_react2.default.createElement(_positionTable2.default, { positions: places, onChange: this.handleMapEvent })
				)
			);
		}
	}]);

	return IndexPage;
}(_react.Component);

exports.default = IndexPage;