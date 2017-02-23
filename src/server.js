import React from 'react';
import { renderToString } from 'react-dom/server';
import IndexPage from './components/index-page';

var path = require('path');
var express = require('express');
var app = express();

const key = process.env.GOOGLE_MAPS_API_KEY;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function(req, res) {
	let markup = renderToString(<IndexPage/>);
	res.render('index.ejs', { markup: markup, key: key });
});

app.post('/add', function(req, res) {
	
});

app.post('/delete', function(req, res) {
});

app.listen(8080, function() {
	console.log('listening on 8080');
});