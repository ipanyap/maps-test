'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _indexPage = require('./components/index-page');

var _indexPage2 = _interopRequireDefault(_indexPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require('path');
var db = require('./data/db');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

var key = process.env.GOOGLE_MAPS_API_KEY;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
	var markup = (0, _server.renderToString)(_react2.default.createElement(_indexPage2.default, null));
	res.render('index.ejs', { markup: markup, key: key });
});

app.get('/view', function (req, res) {
	db.getRecords().then(function (records) {
		var results = records.map(function (record) {
			return { lat: record.lat, lng: record.lng };
		});
		res.json(results);
	});
});

app.post('/add', function (req, res) {
	db.addRecord(req.body).then(function (row) {
		res.json({ message: 'SUCCESS' });
	});
});

app.post('/delete', function (req, res) {
	db.deleteRecord(req.body).then(function (row) {
		res.json({ message: 'SUCCESS' });
	});
});

app.listen(process.env.PORT || 8080, function () {
	console.log('listening on 8080');
});