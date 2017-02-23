'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SimpleMap = function (_Component) {
	_inherits(SimpleMap, _Component);

	function SimpleMap(props) {
		_classCallCheck(this, SimpleMap);

		var _this = _possibleConstructorReturn(this, (SimpleMap.__proto__ || Object.getPrototypeOf(SimpleMap)).call(this, props));

		_this.axios = require('axios');
		_this.markers = [];
		_this.addMarker = _this.addMarker.bind(_this);
		_this.putMarker = _this.putMarker.bind(_this);
		_this.handleAddMarker = _this.handleAddMarker.bind(_this);
		_this.calculateNewRoute = _this.calculateNewRoute.bind(_this);
		return _this;
	}

	_createClass(SimpleMap, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			this.map = new google.maps.Map(this.refs.map, {
				center: {
					lat: -6.2108,
					lng: 106.8434
				},
				zoom: 11
			});

			/*this.props.data.places.map((position) => {
   	var marker = new google.maps.Marker({
   		position: position,
   		map: this.map
   	});
   	this.markers.push(marker);
   });*/

			google.maps.event.addListener(this.map, 'click', this.putMarker);

			this.directionService = new google.maps.DirectionsService();
			this.directionDisplay = new google.maps.DirectionsRenderer();
			this.directionDisplay.setMap(this.map);

			this.axios.get('/view', {}).then(function (res) {
				if (res.status === 200) {
					res.data.map(function (position) {
						var e = { latLng: new google.maps.LatLng(position.lat, position.lng) };
						_this2.addMarker(e);
					});
				}
			});
		}
	}, {
		key: 'putMarker',
		value: function putMarker(event) {
			var _this3 = this;

			this.axios.post('/add', {
				lat: event.latLng.lat(),
				lng: event.latLng.lng()
			}).then(function (res) {
				if (res.status === 200) {
					_this3.addMarker(event);
				}
			});
		}
	}, {
		key: 'addMarker',
		value: function addMarker(event) {
			var marker = new google.maps.Marker({
				position: event.latLng,
				map: this.map
			});

			/*google.maps.event.addListener(marker, 'click', function() {
   	console.log('marker clicked!');
   });*/

			this.markers.push(marker);
			this.handleAddMarker(event.latLng);
		}
	}, {
		key: 'handleAddMarker',
		value: function handleAddMarker(position) {
			var additionEvent = {
				type: 'add',
				position: { lat: position.lat(), lng: position.lng() }
			};
			this.props.onChange(additionEvent);
		}
	}, {
		key: 'calculateNewRoute',
		value: function calculateNewRoute() {
			var _this4 = this;

			var request = {
				origin: this.props.data.origin,
				destination: this.props.data.destination,
				travelMode: 'DRIVING'
			};

			this.directionService.route(request, function (response, status) {
				if (status == 'OK') {
					_this4.directionDisplay.setDirections(response);
				}
			});

			var doneEvent = {
				type: 'route-done',
				position: null
			};
			this.props.onChange(doneEvent);
		}
	}, {
		key: 'render',
		value: function render() {
			var mapStyle = {
				//flex: 1,
				padding: 1,
				height: 450,
				backgroundColor: 'gray',
				clear: 'left'
			};

			var positions = this.props.data.places;
			for (var i = 0; i < this.markers.length; i++) {
				var marker = this.markers[i];
				var mpos = marker.getPosition().lat() + ',' + marker.getPosition().lng();
				var index = positions.map(function (p) {
					return p.lat + ',' + p.lng;
				}).indexOf(mpos);
				if (index === -1) {
					marker.setMap(null);
					this.markers.splice(i, 1);
					break;
				}
			}

			if (this.props.data.newRoute) {
				this.calculateNewRoute();
			}

			return _react2.default.createElement('div', { ref: 'map', style: mapStyle });
		}
	}]);

	return SimpleMap;
}(_react.Component);

exports.default = SimpleMap;