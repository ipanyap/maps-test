import React from 'react';
import { renderToString } from 'react-dom/server';
import IndexPage from './components/index-page';

var path = require('path');
var db = require('./data/db');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

const key = process.env.GOOGLE_MAPS_API_KEY;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
	let markup = renderToString(<IndexPage/>);
	res.render('index.ejs', { markup: markup, key: key });
});

app.get('/view', function(req, res) {
	db.getRecords().then(function(records) {
		var results = records.map((record) => { return { lat: record.lat, lng: record.lng }});
		res.json(results);
	});
});

app.post('/add', function(req, res) {
	db.addRecord(req.body).then(function(row) {
		res.json({ message: 'SUCCESS' });
	});
});

app.post('/delete', function(req, res) {
	db.deleteRecord(req.body).then(function(row) {
		res.json({ message: 'SUCCESS' });
	});
});

app.listen(8080, function() {
	console.log('listening on 8080');
});