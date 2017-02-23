'use strict';

import React, { Component } from 'react';

/** Class representing the map powered by Google Maps API. */
export default class SimpleMap extends Component {
	/**
     * Create the map.
     * @param {JSON} props - The props data.
     */
	constructor(props){
        super(props);
		
		this.axios = require('axios');
		this.markers = [];
		this.addMarker = this.addMarker.bind(this);
		this.putMarker = this.putMarker.bind(this);
		this.handleAddMarker = this.handleAddMarker.bind(this);
		this.calculateNewRoute = this.calculateNewRoute.bind(this);
    };
	
	/**
     * Do things when the component has been mounted, such as init map, add listeners, and request list of markers from database.
     */
	componentDidMount() {
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
		
		this.axios.get('/view', {}).then((res) => {
			if(res.status === 200) {
				res.data.map((position) => {
					var e = { latLng: new google.maps.LatLng(position.lat, position.lng) };
					this.addMarker(e);
				});
			}
		});
	};
	
	/**
     * Place a marker in the clicked location in the map and update database.
	 * @param {JSON} event - The click event.
     */
	putMarker(event) {
		this.axios.post('/add', {
			lat: event.latLng.lat(),
			lng: event.latLng.lng()
		}).then((res) => {
			if(res.status === 200) {
				this.addMarker(event);
			}
		});
	};
	
	/**
     * Add a marker in a location in the map, called when user create new marker as well as when the markers from database are loaded.
	 * @param {JSON} event - The map event.
     */
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
	
	/**
     * Create an event to be fired when new marker is created.
	 * @param {JSON} position - The position of new marker.
     */
	handleAddMarker(position) {
		var additionEvent = {
			type: 'add',
			position: { lat: position.lat(), lng: position.lng() }
		}
		this.props.onChange(additionEvent);
	};
	
	/**
     * Calculate route between two markers.
     */
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
	
	/**
     * Render the map.
     */
	render() {
		const mapStyle = {
			//flex: 1,
			padding: 1,
			height: 450,
			backgroundColor: 'gray',
			clear: 'left'
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
