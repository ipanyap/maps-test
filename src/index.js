import React from 'react';
import ReactDOM from 'react-dom';
import IndexPage from './components/index-page.js'

window.onload = () => {
	ReactDOM.render(
		<IndexPage />,
		document.getElementById('root')
	);
};