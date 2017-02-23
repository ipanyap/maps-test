'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _indexPage = require('./components/index-page.js');

var _indexPage2 = _interopRequireDefault(_indexPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = function () {
	_reactDom2.default.render(_react2.default.createElement(_indexPage2.default, null), document.getElementById('root'));
};