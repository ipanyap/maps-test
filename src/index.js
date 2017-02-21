import React from 'react';
import ReactDOM from 'react-dom';
import SimpleMap from './components/simple-map.js';

window.onload = () => {
	ReactDOM.render(
		<div>
			<SimpleMap/>
		</div>,
		document.getElementById('root')
	);
};