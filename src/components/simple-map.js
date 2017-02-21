'use strict';

import React, { Component } from 'react';

export default class SimpleMap extends Component {
	constructor(props){
        super(props);
		
		this.marker = [];
		this.addMarker = this.addMarker.bind(this);
    };
	
	componentDidMount() {
		this.map = new google.maps.Map(this.refs.map, {
			center: {
			  lat: 48.873947,
			  lng: 2.295038
			},
			zoom: 11
		});
		
		google.maps.event.addListener(this.map, 'click', this.addMarker);
	};
	
	addMarker(event) {
		this.marker[this.marker.length] = new google.maps.Marker({
			position: event.latLng,
			map: this.map
        });
	};
  
	render() {
		const mapStyle = {
		  flex: 1,
		  height: 400,
		  border: '1px solid black'
		};
		
		return (
			<div ref="map" style={mapStyle}></div>
		);
	};
}
