'use strict';

import React, { Component } from 'react';

export default class SimpleMap extends Component {
	constructor(props){
        super(props);
    };
	
	componentDidMount() {
		this.map = new google.maps.Map(this.refs.map, {
			center: {
			  lat: 48.873947,
			  lng: 2.295038
			},
			zoom: 11
		});
	};
  
	render() {
		const mapStyle = {
		  flex: 1,
		  height: 400,
		  border: '1px solid black'
		};
		
		return (
			<div ref="map" style={mapStyle} ref="map"></div>
		);
	};
}
