'use strict';

import React, { Component } from 'react';

export default class SimpleMap extends Component {
	constructor(props){
        super(props);
		
		this.markers = [];
		this.addMarker = this.addMarker.bind(this);
		this.handleAddMarker = this.handleAddMarker.bind(this);
		this.calculateNewRoute = this.calculateNewRoute.bind(this);
    };
	
	componentDidMount() {
		this.map = new google.maps.Map(this.refs.map, {
			center: {
				lat: -6.2108,
				lng: 106.8434
			},
			zoom: 11
		});
		
		this.props.data.places.map((position) => {
			var marker = new google.maps.Marker({
				position: position,
				map: this.map
			});
			this.markers.push(marker);
		});
		
		google.maps.event.addListener(this.map, 'click', this.addMarker);
		
		this.directionService = new google.maps.DirectionsService();
		this.directionDisplay = new google.maps.DirectionsRenderer();
		this.directionDisplay.setMap(this.map);
	};
	
	addMarker(event) {
		var marker = new google.maps.Marker({
			position: event.latLng,
			map: this.map
        });
		
		/*google.maps.event.addListener(marker, 'click', function() {
			console.log('marker clicked!');
		});*/
		
		this.markers.push(marker);
		this.handleAddMarker(event.latLng);
	};
	
	handleAddMarker(position) {
		var additionEvent = {
			type: 'add',
			position: { lat: position.lat(), lng: position.lng() }
		}
		this.props.onChange(additionEvent);
	};
	
	calculateNewRoute() {
		var request = {
			origin: this.props.data.origin,
			destination: this.props.data.destination,
			travelMode: 'DRIVING'
		}
		
		this.directionService.route(request, (response, status) => {
			if (status == 'OK') {
				this.directionDisplay.setDirections(response);
			}
		});
		
		var doneEvent = {
			type: 'route-done',
			position: null
		}
		this.props.onChange(doneEvent);
	};
  
	render() {
		const mapStyle = {
			flex: 1,
			height: 400,
			border: '1px solid black'
		};
		
		const positions = this.props.data.places;
		for(var i = 0; i < this.markers.length; i++) {
			var marker = this.markers[i];
			var mpos = marker.getPosition().lat() + ',' + marker.getPosition().lng();
			var index = positions.map((p) => p.lat + ',' + p.lng).indexOf(mpos);
			if(index === -1) {
				marker.setMap(null);
				this.markers.splice(i, 1);
				break;
			}
		}
		
		if(this.props.data.newRoute) {
			this.calculateNewRoute();
		}
		
		return (
			<div ref="map" style={mapStyle}></div>
		);
	};
}
